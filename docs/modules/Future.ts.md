---
title: Future.ts
nav_order: 2
parent: Modules
---

# Future overview

Added in v0.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [Future (interface)](#future-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [future (constant)](#future-constant)
- [left (constant)](#left-constant)
- [right (constant)](#right-constant)
- [swap (constant)](#swap-constant)
- [delay (function)](#delay-function)
- [fork (function)](#fork-function)
- [orElse (function)](#orelse-function)
- [alt (export)](#alt-export)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [bimap (export)](#bimap-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [flatten (export)](#flatten-export)
- [fromEither (export)](#fromeither-export)
- [fromOption (export)](#fromoption-export)
- [fromPredicate (export)](#frompredicate-export)
- [map (export)](#map-export)
- [mapLeft (export)](#mapleft-export)

---

# Future (interface)

**Signature**

```ts
export interface Future<E, A> extends F.FutureInstance<E, A> {}
```

Added in v0.6.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.5.0

# URI (constant)

**Signature**

```ts
export const URI: "Fluture/Future" = ...
```

Added in v0.5.0

# future (constant)

**Signature**

```ts
export const future: Monad2<URI> & Bifunctor2<URI> & ChainRec2<URI> & Alt2<URI> & MonadThrow2<URI> = ...
```

Added in v0.5.0

# left (constant)

**Signature**

```ts
export const left: <E = ...
```

Added in v0.6.0

# right (constant)

**Signature**

```ts
export const right: <E = ...
```

Added in v0.6.0

# swap (constant)

**Signature**

```ts
export const swap: <E, A>(ma: Future<E, A>) => Future<A, E> = ...
```

Added in v0.6.0

# delay (function)

**Signature**

```ts
export function delay(millis: number): <E, A>(ma: Future<never, A>) => Future<E, A> { ... }
```

Added in v0.6.0

# fork (function)

**Signature**

```ts
export function fork<E, A>(onLeft: (e: E) => void, onRight: (a: A) => void): (ma: Future<E, A>) => () => void { ... }
```

Added in v0.6.0

# orElse (function)

**Signature**

```ts
export function orElse<E, A, M>(onLeft: (e: E) => Future<M, A>): (ma: Future<E, A>) => Future<M, A> { ... }
```

Added in v0.6.0

# alt (export)

**Signature**

```ts
<E, A>(that: () => Future<E, A>) => (fa: Future<E, A>) => Future<E, A>
```

Added in v0.6.0

# ap (export)

**Signature**

```ts
<E, A>(fa: Future<E, A>) => <B>(fab: Future<E, (a: A) => B>) => Future<E, B>
```

Added in v0.6.0

# apFirst (export)

**Signature**

```ts
<E, B>(fb: Future<E, B>) => <A>(fa: Future<E, A>) => Future<E, A>
```

Added in v0.6.0

# apSecond (export)

**Signature**

```ts
<e, B>(fb: Future<e, B>) => <A>(fa: Future<e, A>) => Future<e, B>
```

Added in v0.6.0

# bimap (export)

**Signature**

```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Future<E, A>) => Future<G, B>
```

Added in v0.6.0

# chain (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => Future<E, B>) => (ma: Future<E, A>) => Future<E, B>
```

Added in v0.6.0

# chainFirst (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => Future<E, B>) => (ma: Future<E, A>) => Future<E, A>
```

Added in v0.6.0

# flatten (export)

**Signature**

```ts
<E, A>(mma: Future<E, Future<E, A>>) => Future<E, A>
```

Added in v0.6.0

# fromEither (export)

**Signature**

```ts
<E, A>(ma: E.Either<E, A>) => Future<E, A>
```

Added in v0.6.0

# fromOption (export)

**Signature**

```ts
<E>(onNone: () => E) => <A>(ma: Option<A>) => Future<E, A>
```

Added in v0.6.0

# fromPredicate (export)

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Future<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Future<E, A>; }
```

Added in v0.6.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: Future<E, A>) => Future<E, B>
```

Added in v0.6.0

# mapLeft (export)

**Signature**

```ts
<E, G, A>(f: (e: E) => G) => (fa: Future<E, A>) => Future<G, A>
```

Added in v0.6.0
