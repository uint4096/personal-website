---
date: 2026-07-13T12:00:00.000Z
title: Building a File Watcher in Go
---
[perch](https://github.com/uint4096/perch) is a tool that lets you run commands in response to file changes. It came about because I needed a tool to sync notes from my machines to my VPS, which lets me access them from anywhere with an internet connection. I considered a few other tools ([incron](https://wiki.archlinux.org/title/Incron), [lsyncd](https://github.com/lsyncd/lsyncd), and [watchexec](https://github.com/watchexec/watchexec)), but none of them met all of my use cases:

- `incron` isn’t cross-platform. While I use Debian as my personal daily driver, I’m forced to use macOS for work, and I needed something that could run on both machines.
- `lsyncd` was tricky, and initially felt like it could meet all of my requirements. However, I noticed that the project isn’t being actively maintained. And while that wouldn't be a deal-breaker in itself, lsyncd is also just a file-sync tool at heart and uses rsync under the hood. I thought it would be nice to have control over how the transfer works and not have to [write Lua](https://lsyncd.github.io/lsyncd/manual/config/layer3/) for it.
- `watchexec` isn’t built to run as a background service, and manages one watch per invocation.

### Recursively Resolving Targets to Watch

perch uses fsnotify underneath, which abstracts several notification systems, including inotify on Linux and kqueue on macOS. To use perch, you write a TOML config, and a service running in the background sets up watches based on this configuration.

```toml
[[Watches]]
Path = "/home/abhishek/Documents/notes"
Events = ["create", "remove", "write", "rename"]
Command = "/home/abhishek/notes_sync.sh"
WorkingDir = "/home/abhishek"
Include = ["*.md"]
Debounce = 30
Timeout = 120
```

The first challenge came in the form of fsnotify [not being able to recursively resolve subdirectories](https://github.com/fsnotify/fsnotify/blob/v1.10.1/README.md#are-subdirectories-watched) to watch. I initially thought I could get away with parsing the directory tree once during startup, and setting up listeners for each of the subdirectories, but this misses the subtle (not so subtle in hindsight) case where a user could create directories after setting up perch to run in the background.

The simplest solution I could think of was to dynamically create watches on newly created subdirectories as I received `create` events for parent directories.

```go
func Listen(watcher *fsnotify.Watcher, c chan marker.MarkerWrite) {
	// other logic

	for {
		event, ok := <-watcher.Events
		if !ok {
			return
		}
		
		// other logic
		
		info, err := os.Lstat(event.Name)
		if err == nil && info.IsDir() {
			watchDir(event.Name, watcher)
			continue
		}
	}
}
```

This obviously hinges on perch being configured to listen for `create` events on the parent directory in the first place.

Another issue was making sure directory removals were surfaced as an event regardless of the `Include` and `Exclude` filters within the configuration. For non-existent paths, `os.Lstat` unhelpfully returns an error without telling us whether a directory existed on the path or a file. The only way around it was to maintain a set of directories in-memory and match against it when we get an `os.ErrNotExist` error from running `os.Lstat`. The code above becomes:

```go
func Listen(watcher *fsnotify.Watcher, c chan marker.MarkerWrite) {
	dirSet := make(map[string]struct{})

	// other logic

	for {
		event, ok := <-watcher.Events
		if !ok {
			return
		}

		// other logic

		info, err := os.Lstat(event.Name)
		if err == nil && info.IsDir() {
			watchDir(event.Name, watcher, dirSet) // also adds the dir to dirSet
			continue
		}

		_, watchedDir := dirSet[event.Name]
		if watchedDir && errors.Is(err, os.ErrNotExist) {
			pruneDir(event.Name, watcher, dirSet) // removes it from dirSet
			 // initiate command execution flow
		}
	}
}
```
### Durability

perch lets you configure a debounce on events. Commands run after events stop flowing for the number of seconds specified as the debounce period. This presents its own set of challenges, the toughest of which is making sure events don't get lost during shutdown or a crash, i.e. durability. 

There were several ways to approach this problem, and most of them required persisting some kind of state that perch could pick up from after a shutdown. I considered using a storage layer for this purpose with an embedded database (SQLite mainly), but it felt overkill. In the end I went with the simplest alternative, which was to serialise events as JSON for persistence and remove them when they'd been processed.

These serialised events are called markers. A marker is a unit of work for the perch command executor. It stores details about which file changed, which command to run, and the timestamp after which the command should be run. Structurally, markers are collected within a Go map keyed on the file path for which we receive events. Subsequent events for the same file overwrite previous ones, which means the execution time keeps increasing until there have been no events for the debounce period.

The flow of events goes something like this:

- fsnotify captures an event and notifies perch
- The **listener** receives the event, performs validations against the config, creates a marker, and forwards it to a writer. The listener also adds the execution timestamp on the marker (current time + debounce seconds).
- The **writer**'s job is to persist the state to the disk, which will later be picked up by the executor. However, it is generic in implementation. It takes a marker and an operation (create, update, or delete), and writes the marker to its file on disk.
- The **executor** runs in the background, reads markers from the disk, and creates subprocesses to run commands specified within the markers. It then forwards the marker back to the writer. On successful executions the writer is instructed to delete the marker, and on failure it updates the retry count on it. The executor ignores any marker where the current time hasn't passed the marker's execution time.

![[Pasted image 20260718192320.png]]

`listener`, `writer` and `executor` are goroutines, and communication between them happens via channels. The execution happens serially for each watch entry specified in the configuration, but is concurrent across watches. Moreover, writes to disk are atomic and durable via the [rename + fsync mechanism](https://0xkiire.com/crash-consistency-fsync-rename/), which means there's little risk of them being lost once the write finishes.

### Limitations

perch is still very new, and was written with a broad use case in mind. Building something like this means there are a lot of scenarios and edge cases to consider, some of which I've left for later.

#### Running Out of Watchers

Linux and macOS have a limit on the number of file watchers you can have open at the same time, and they both differ in implementation entirely. Most Linux distros ship with a default number of allowed file watchers (65536 usually), and these watchers are shared across all running processes for the user. You can increase the number of file watchers by setting `fs.inotify.max_user_watches` in `/etc/sysctl.conf`.

macOS, on the other hand, uses kqueue, which treats file watchers as open file descriptors, and the limit on them is per-process. It also differs in the way it consumes watchers when compared with Linux. inotify uses one watcher for an entire directory, although subdirectories are excluded from this and need their own watchers.  kqueue opens one file descriptor for every file in a directory.

perch solves all of this by doing nothing. At this point, it falls on the user to find out when they're running out of watchers by [checking logs](https://github.com/uint4096/perch#service), and raise the limit if needed.

#### Usually-once Delivery and Idempotency

fsnotify notifies perch in almost all of the cases when something changes in a watched directory, but this comes with a documented list of caveats. The ones to highlight are:
- A notification for files within a removed directory is not guaranteed - [link](https://github.com/fsnotify/fsnotify/blob/v1.10.1/fsnotify.go#L90-L92).
- Watching a file is a bad idea - [link](https://github.com/fsnotify/fsnotify/blob/v1.10.1/README.md#watching-a-file-doesnt-work-well). perch allows this, but the delivery is not guaranteed to be reliable.
- Removals might trigger a `Rename` event if files are moved to trash instead of being deleted - [link](https://github.com/fsnotify/fsnotify/blob/v1.10.1/fsnotify.go#L212-L215).

Moreover, for events that fsnotify does end up sending, perch is designed with an at-least-once delivery mechanism. This means commands and scripts you configure must be idempotent.

All of this to say that perch is not the right tool for you if you want a step-by-step log of changes within a file. It's only useful if you want to end up with an eventually consistent state for the watched files and directories.

#### No State Synchronisation

There is no recovery for events that perch does end up missing for reasons stated above. perch doesn't store any state other than the directory tree and the markers. It doesn't know the file content, and doesn't match with previously stored content. This is because perch is not a file sync tool. It's an fsnotify wrapper with convenient configuration options and a daemon. Even though I've stated this as a limitation, I don't see it changing any time soon.

### Conclusion

For the use case of syncing my notes, perch has served me well so far. I've been consistently using it over the past couple of weeks, and making improvements as I go. This was also my first time writing something serious in Go, and I've enjoyed the experience. I like that the language is very opinionated about how the code should be written, and I seem to agree with most of it.
