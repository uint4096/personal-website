---
date: 2026-09-25T15:33:00.000Z
title: I Wrote Myself Another Logger
---
Say you're working on a large enough codebase and you need a logger that does more than write a bunch of text to stdout. Maybe you need it to store some metadata that gets logged with every message, or maybe you need a fancy wrapper to hide the intricacies of sending logs to a remote destination. You could build a `Logger` class (or a function if you prefer) with a bunch of utility methods - something along the lines of:

```typescript
const Logger = () => {
  const metadata: Record<string, unknown> = {};

  const write = (message: typeof metadata & { message: string; type: 'info' | 'error' }) => {
	emit(message) // writes to destination
  }

  return {
    updateContext(key: string, value: unknown) {
      metadata[key] = value;
    },

    info(message: string) {
      write({ message, type: 'info', ...metadata  })
    },

    error(message: string) {
      write({ message, type: 'error', ...metadata  })
    }
  }
}
```

This is all well and good. Creating an instance is just a matter of calling `const logger = Logger()`. You could then add as much context as you like with `logger.updateContext()` calls. But your codebase is large, and that creates a few problems, mainly:

### Nesting

In the real-world people don't call one isolated function to solve a problem. It's usually many functions called one after the other, often deeply nested. When you log something, there's a good chance that you expect some metadata from the function calls upstream to be logged alongside it.  The solution people usually go for is to pass the logger instance down into the nested functions. This creates a long chain of functions, each of which have to take a logger instance as an argument - let's call it 'logger drilling'!

```typescript
const bar = async (logger: ReturnType<typeof Logger>) => {
  const user = await fetchUser();

  logger.updateContext('userId', user.id);

  // rest of the logic
}

const foo = async () => {
  const logger = Logger();

  await bar(logger);

  logger.info('finished foo');
}
```

An even less sophisticated way of getting around this problem is to pass data down into the nested functions for the explicit purpose of logging. These arguments are often unnecessary and create confusion.

### A Singleton Doesn't Work

All of this would be solved if you had just one global instance of the logger that stores all of the metadata for you.

```typescript
// logger.ts
export const logger = Logger();

// handler.ts
import { logger } from './logger';

export const handleRequest = async (req: Request) => {
	logger.updateContext('userId', userId);

	await chargeCard(userId);

	logger.info('charged card');
	
	res.sendStatus(204);
};
```

This might work if `handleRequest` was always called one at a time. You could create a method within the logger that allows you to clear the context accumulated by `handleRequest`, call it at the end of the function, and have the next request start logging with its own context. However, this goes out the window if two requests overlap. Because you have a single `logger` instance, all of the metadata is stored within that instance. Concurrent executions will tap into that shared storage and log the current set of metadata stored within it. The next thing you know, you're thinking you charged the wrong user because another request's metadata leaked into the current one. Clearing the context at the end of execution doesn't help either, because you might end up clearing it for a currently running function.

At this point it's clear that you need much tighter control over scope boundaries for your logger.

### AsyncLocalStorage

Node.js's [AsyncLocalStorage](https://nodejs.org/api/async_context.html#asynchronous-context-tracking) is built for this purpose. The `AsyncLocalStorage` class lets you define an instance of a storage context that's only accessible within a boundary that you initialise it with. This also applies across asynchronous code, which makes it incredibly useful.

You create an instance by calling the `AsyncLocalStorage` constructor. Your logger can then access the store by calling the `getStore` method defined on that instance.

```typescript
// logger.ts
import { AsyncLocalStorage } from 'node:async_hooks';

export const contextStore = new AsyncLocalStorage<Record<string, unknown>>();

const write = (message: { message: string; type: 'info' | 'error' }) => {
  const metadata = contextStore.getStore();
  emit({ ...message, ...metadata }); // writes to destination
}

export const logger = {
  updateContext(key: string, value: unknown) {
    const store = contextStore.getStore();
    if (!store) return;

    Object.assign(store, { [key]: value });
  },

  info(message: string) {
    write({ message, type: 'info' });
  }
}
```

You then use it by wrapping your top-level function in a call to `contextStore.run`, and giving it an empty object as the base to work from.

Using the handler from the previous section, a typical setup would look something like:
 
```typescript
// routes.ts

import { contextStore } from './logger.js';
import { handleRequest } from './charge.js';

app.post('/billing/charge/:userId', (req, res) => contextStore.run({}, () => handleRequest(req, res)));

// charge.ts

import { logger } from './logger.js';

const chargeCard = async (userId: string) => {
  const billingCycle = await fetchBillingCycle(userId);

  // uses the shared logger to update the context for the current request
  logger.updateContext('billingCycle', billingCycle);
	
  if (billingCycle === BillingCycle.Annual) {
    return chargeLotsOfMoney();
  }
	
  return chargeSomeMoney();
}

export const handleRequest = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  
  logger.updateContext('userId', userId);

  await chargeCard(userId);
  
  // logs { message: 'charged card', type: 'info', userId: '<userId>', billingCycle: '<Annual | Monthly>' }
  logger.info('charged card');
  
  res.sendStatus(204);
};
```

This solves both of the problems from our previous attempts. The store is initialised when you call the `run` method, and it dies when the function execution ends, along with all its async calls. Every execution gets its own storage, which prevents metadata from leaking between requests. You don't even need to drill a single logger instance between nested calls. It's defined globally within the logger module!

If you don't want to expose the entire `contextStore`, you could also create a nice little helper that abstracts away calling `run` directly on your handler. Something like this should work well with any top-level function.

```typescript
// logger.ts
import { AsyncLocalStorage } from "node:async_hooks";

const contextStore = new AsyncLocalStorage<Record<string, unknown>>();

export const initContextStore =
  <T extends unknown[], U>(fn: (...args: T) => U) =>
  (...args: T) =>
    contextStore.run({}, () => fn(...args));
```

You can then wrap your functions with `initContextStore` to get the same behaviour.

```typescript
// routes.ts

import { initContextStore } from './logger.js';
import { handleRequest } from './charge.js';

app.post('/billing/charge/:userId', initContextStore(handleRequest));
```


### Solving Scopes

You might run into situations where the context boundary does not span across functions, but stays within a single function. Loops are a good example of such a case where your log metadata is useful for a single iteration, but might not have any meaning outside of it. Since our store is initialised with the top-level function call, metadata updated with `logger.updateContext` will leak outside of the iteration's scope. This becomes more problematic with parallel iterations (something like `Bluebird.map`), where concurrent iterations might overwrite each other. We can fix that if we give every iteration its own scope by defining a `scoped` method on the logger, which takes a function as an argument, and wraps it inside a new `contextStore.run()` call.

```typescript
// logger.ts
export const logger = {
  // other logger code

  scoped<T extends Array<unknown>, U>(
    fn: (...args: T) => Promise<U> | U
  ): (...args: T) => Promise<U> | U {
    return (...args: T) => {
      const parent = contextStore.getStore();
      const childStore = {
        ...(parent ?? {})
      };

      return contextStore.run(childStore, () => fn(...args));
    }
  },

}
```

You can then use it in the following way:

```typescript
// charge.ts
import Bluebird from 'bluebird';
import { logger } from './logger.js';

const chargeUser = async (user: User) => {
  logger.updateContext('userId', user.id);

  await chargeCard(user.id);

  logger.info('charged card');
};

export const handleBatchCharge = async (req: Request, res: Response) => {
  const organisationId = req.params.organisationId;
  logger.updateContext('organisationId', organisationId);

  const users = await fetchUsers(organisationId);
  await Bluebird.map(users, logger.scoped(chargeUser), { concurrency: 2 });

  logger.info('charged organisation');
  res.sendStatus(204);
};

// logs:
// { message: 'charged card', organisationId: 'org1', userId: 'u2' }
// { message: 'charged card', organisationId: 'org1', userId: 'u3' }
// { message: 'charged card', organisationId: 'org1', userId: 'u1' }
// { message: 'charged organisation', organisationId: 'org1' }
```

In the example above, because `chargeUser` is wrapped with `scoped`, the `userId` fields do not leak outside of the `chargeUser` function. The `scoped` method works with both synchronous and asynchronous functions since `contextStore.run` shares the return type with the function you pass as an argument.

>[!info]- The `enterWith` / `withScope` Gotcha
> 
> The `AsyncLocalStorage` class defines an experimental method called `enterWith` which is meant to make it easy to switch between storage contexts without having to wrap the call with the `run` method. You can combine this with a `Disposable` object to automatically switch between parent and child context storage like so:
> 
> ```typescript
> // logger.ts
> export const logger = {
>    scope(): Disposable {
>     const parentStore = contextStore.getStore();
>     const childStore = {
>        ...(parentStore ?? {}),
>     };
> 
>     // creates a new context boundary for the scope
>     contextStore.enterWith(childStore);
> 
>     return {
>         [Symbol.dispose]() {
>         // runs at the end of every scope
>         contextStore.enterWith(parentStore);
>       }
>     }
>   }
> ```
>
>To use it, you'll need to call it with the `using` keyword inside a block (ifs, fors, functions, etc., or even a bare block would do):
>```typescript
>{
>	  using _ = logger.scope();
>	  logger.updateContext('itemId', item.id);
>	  // ...
>}
>```
> 
> `AsyncLocalStorage` also has another convenience experimental method called `withScope` that does something similar for you. 
> 
> This works fine for synchronous functions, but has a hidden gotcha when being used inside asynchronous functions before the first `await`ed call. Properly explaining why would take its own blog post, which I plan on writing as a follow up to this one. For now, I'll quote the [Node.js docs](https://nodejs.org/api/async_context.html#asynclocalstorageenterwithstore:~:text=Important,boundaries) verbatim:
> > When using `withScope()` in async functions before the first `await`, be aware that the scope change will affect the caller's context. The synchronous portion of an async function (before the first `await`) runs immediately when called, and when it reaches the first `await`, it returns the promise to the caller. At that point, the scope change becomes visible in the caller's context and will persist in subsequent synchronous code until something else changes the scope value. For async operations, prefer using `run()` which properly isolates context across async boundaries.
> 

### Problems

Like most things in the world, this logger is not perfect. Using a logger that's 'context-aware' also requires the author to be aware of what's already in the context. This could be difficult to keep track of across deeply nested function calls. LLMs can help with this but require explicit guidance that's easy to miss. Having to use something like `scoped` also creates abstractions you risk littering your code with.  And lastly, `enterWith` (and `withScope`) have been experimental for a while, and still don't seem safe enough for use with async functions or event emitters.

All of this might mean that you should evaluate this approach with a little bit of caution. I think the benefits here outweigh the problems, especially if the priority is to keep the code from having to work around how the logger is set up.