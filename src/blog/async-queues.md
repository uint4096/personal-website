---
date: 2026-07-29T12:00:00.000Z
title: Async Queues on a Single Thread
---
JavaScript runtimes are single-threaded for all intents and purposes, and we only have one thread, the main thread, to work with. Even though different runtimes support different models of multithreaded programming ([workers](https://bun.com/docs/runtime/workers) in Bun, [worker threads](https://nodejs.org/api/worker_threads.html) in Node.js), the cost associated with them makes them rarely worth it, especially if the work is not CPU-intensive. From the Node.js docs:

> Workers (threads) are useful for performing CPU-intensive JavaScript operations. They do not help much with I/O-intensive work. The Node.js built-in asynchronous I/O operations are more efficient than Workers can be.

All of this makes it important to keep an eye out for situations where we might be [blocking the event loop](https://nodejs.org/learn/asynchronous-work/dont-block-the-event-loop#dont-block-the-event-loop). I've recently found building an async queue to be a good exercise in understanding blocking more thoroughly.

### The Problem

We have to build an async queue. Something enqueues asynchronous functions, and our implementation of the queue must run these functions one at a time. Tasks could be enqueued at any point during the program's execution, and the delay in processing these functions should be minimal. We can discard responses from the function calls for the sake of simplicity.

### The Naive Implementation

The simplest implementation is one where we listen iteratively, dequeue entries one at a time, and await them. If we don't find anything to run, we `continue;` and move on to the next iteration.

```typescript
type Task<T> = () => Promise<T>;
const queue: Array<Task<unknown>> = [];

export const enqueue = <T>(task: Task<T>) => {
  queue.push(task);
}

const listen = async () => {
  while (true) {
    const task = queue.shift();

    if (!task) {
      continue;
    }

    await task();
  }
}
```

This does not work for many reasons, the biggest of which is that it'll block the main thread the moment we run out of things to `await`. We will use the snippet below to test different implementations of the queue.

```typescript
(async () => {
  const sleep: (n: number) => Promise<void> =
    (timeInSeconds: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Time expired. Resolving!");
          resolve();
        }, timeInSeconds * 1000);
      });
    };

  enqueue(() => sleep(3));
  enqueue(() => sleep(3));
  enqueue(() => sleep(3));
  enqueue(() => sleep(3));

  listen();

  // Runs with the iterative queue implementation. As long as there is something to await, the main thread won't be blocked
  setTimeout(() => void console.log("First timeout run"), 10000);

  // Does not run! There is nothing to await after ~12 seconds when the 4th task runs. Main thread is blocked at that point
  setTimeout(() => void console.log("Second timeout run"), 15000);
})();
```

In this case we call `listen` after enqueueing four async functions. This will output:

```
Time expired. Resolving!
Time expired. Resolving!
Time expired. Resolving!
First timeout run
Time expired. Resolving!
```

Notice that the second timeout handler never runs. We were fine as long as we had something to await. After ~12 seconds (the combined duration of the four sleeps), we ran out of things to await and our listener effectively became `while (true) { continue; }`, which ended up blocking the main thread.

Also, at this point we're calling the listener arbitrarily. We don't have a place for it yet.

### What if We Always Await?

```typescript
const listen = async () => {
  while (true) {
    const task = queue.shift();

    if (!task) {
      await new Promise<void>((resolve) => setImmediate(resolve));
      continue;
    }

    await task();
  }
};
```

This fixes it! We have decided to yield back to the event loop after every iteration, which means macrotasks (`setTimeout`, `setImmediate`, etc.) now have a place to run.

>[!info] Simply awaiting `Promise.resolve()` won't work
>
> Two things to keep in mind here:
> - The event loop drains the microtask queue before moving on to macrotasks. 
> - A resolved promise enqueues a microtask (everything after the `await` runs as the microtask).
> 
>  If we call `await Promise.resolve();` instead of `await new Promise((resolve) => setImmediate(resolve));` we're adding a microtask immediately, which the event loop prioritises over any macrotask. Doing this continuously in the while loop above means that the event loop never gets to process macrotasks such as the second `setTimeout` in our test snippet.
>  
>  Calling `setImmediate` schedules a macrotask instead, which forces the event loop to process macrotasks, including our `setTimeout` that would've been stuck otherwise. Resolving inside a `setImmediate`, as we've done, schedules another microtask after macrotasks have been processed, which then repeats the cycle.

The output now becomes:

```
Time expired. Resolving!
Time expired. Resolving!
Time expired. Resolving!
First timeout run
Time expired. Resolving!
Second timeout run
```

Kudos to us for figuring this out, but this is still a poor implementation. We're being wasteful with the number of microtasks and macrotasks we're making the event loop process, and we still don't have a proper place to call `listen` in the first place. 

### Deferring Listener Calls to the Enqueuer

The solution that works here is to call the listener as part of the `enqueue` function. We also create an `isProcessing` flag global to the module. This flag tracks the state of the listener, and prevents the `enqueue` function from triggering the listener twice.

```typescript
let isProcessing: boolean = false;
const queue: Array<Task<unknown>> = [];

export const enqueue = <T>(task: Task<T>) => {
  queue.push(task);

  if (!isProcessing) {
    isProcessing = true;
    listen();
  }
};
```

In our listener, we then flip the flag back and `break;` instead of continuing if we find ourselves out of entries to process.

```typescript
const listen = async () => {
  while (true) {
    const task = queue.shift();

    if (!task) {
      isProcessing = false;
      break;
    }

    await task();
  }
};
```

We've finally found a place where we can safely trigger our listener from, all without blocking the main thread. This implementation is safe to use. At this point we can remove the `listen` call from the snippet we've been testing with.

```typescript
(async () => {
  const sleep: (n: number) => Promise<void> =
    (timeInSeconds: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Time expired. Resolving!");
          resolve();
        }, timeInSeconds * 1000);
      });
    };

  enqueue(() => sleep(3));
  enqueue(() => sleep(3));
  enqueue(() => sleep(3));
  enqueue(() => sleep(3));

  // Runs. As long as there is something to await, the main thread won't be blocked
  setTimeout(() => void console.log("First timeout run"), 10000);

  // Also runs. Once the queue empties, listen sets the flag and breaks, freeing up the main thread
  setTimeout(() => void console.log("Second timeout run"), 15000);
})();
```

The output:

```
Time expired. Resolving!
Time expired. Resolving!
Time expired. Resolving!
First timeout run
Time expired. Resolving!
Second timeout run
```
### Conclusion

Programming in single-threaded languages can have quirks that are difficult to navigate. Blocking, especially, is a tricky concept to get right. You have to be aware not only that your code might be starving the event loop, but also that seemingly simple statements like `await Promise.resolve()` don't do what you might expect. Exercises like this can help us gain a deeper understanding of Node internals, and how to yield control back to the event loop and avoid blocking.
