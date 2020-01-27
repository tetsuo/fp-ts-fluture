/**
 * @since 0.5.0
 */
import * as F from 'fluture'
import * as E from 'fp-ts/lib/Either'
import { Alt2 } from 'fp-ts/lib/Alt'
import { Bifunctor2 } from 'fp-ts/lib/Bifunctor'
import { ChainRec2 } from 'fp-ts/lib/ChainRec'
import { Monad2 } from 'fp-ts/lib/Monad'
import { pipeable, pipe } from 'fp-ts/lib/pipeable'
import { MonadThrow2 } from 'fp-ts/lib/MonadThrow'

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    'Fluture/Future': Future<E, A>
  }
}

/**
 * @since 0.5.0
 */
export const URI = 'Fluture/Future'

/**
 * @since 0.6.0
 */
export interface Future<E, A> extends F.FutureInstance<E, A> {}

/**
 * @since 0.6.0
 */
export const left: <E = never, A = never>(e: E) => Future<E, A> = F.reject

/**
 * @since 0.6.0
 */
export const right: <E = never, A = never>(a: A) => Future<E, A> = F.resolve

/**
 * @since 0.6.0
 */
export function orElse<E, A, M>(onLeft: (e: E) => Future<M, A>): (ma: Future<E, A>) => Future<M, A> {
  return ma => F.chainRej(onLeft)(ma)
}

/**
 * @since 0.6.0
 */
export function fork<E, A>(onLeft: (e: E) => void, onRight: (a: A) => void): (ma: Future<E, A>) => () => void {
  return ma => F.fork(onLeft)(onRight)(ma)
}

/**
 * @since 0.6.0
 */
export const swap: <E, A>(ma: Future<E, A>) => Future<A, E> = F.swap

/**
 * @since 0.5.0
 */
export type URI = typeof URI

/**
 * @since 0.5.0
 */
export const future: Monad2<URI> & Bifunctor2<URI> & ChainRec2<URI> & Alt2<URI> & MonadThrow2<URI> = {
  URI,
  map: (fa, f) => F.map(f)(fa),
  of: F.resolve,
  ap: (fab, fa) => F.ap(fa)(fab),
  chain: (fa, f) => F.chain(f)(fa),
  bimap: (fea, f, g) => F.bimap(f)(g)(fea),
  mapLeft: (fea, f) => F.mapRej(f)(fea),
  alt: (fx, f) => F.alt(f())(fx),
  chainRec: <E, A, B>(a: A, f: (a: A) => Future<E, E.Either<A, B>>): Future<E, B> =>
    (function recur(a: A): Future<E, B> {
      return future.chain(f(a), E.fold(recur, F.resolve))
    })(a),
  throwError: left
}

/**
 * @since 0.6.0
 */
export function delay(millis: number): <E, A>(ma: Future<never, A>) => Future<E, A> {
  return ma => pipe(ma, chain(F.after(millis)))
}

const {
  alt,
  ap,
  apFirst,
  apSecond,
  bimap,
  chain,
  chainFirst,
  flatten,
  map,
  mapLeft,
  fromEither,
  fromOption,
  fromPredicate
} = pipeable(future)

export {
  /**
   * @since 0.6.0
   */
  alt,
  /**
   * @since 0.6.0
   */
  ap,
  /**
   * @since 0.6.0
   */
  apFirst,
  /**
   * @since 0.6.0
   */
  apSecond,
  /**
   * @since 0.6.0
   */
  bimap,
  /**
   * @since 0.6.0
   */
  chain,
  /**
   * @since 0.6.0
   */
  chainFirst,
  /**
   * @since 0.6.0
   */
  flatten,
  /**
   * @since 0.6.0
   */
  map,
  /**
   * @since 0.6.0
   */
  mapLeft,
  /**
   * @since 0.6.0
   */
  fromEither,
  /**
   * @since 0.6.0
   */
  fromOption,
  /**
   * @since 0.6.0
   */
  fromPredicate
}
