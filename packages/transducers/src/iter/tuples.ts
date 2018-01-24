export function tuples<A>(a: Iterable<A>): IterableIterator<[A]>;
export function tuples<A, B>(a: Iterable<A>, b: Iterable<B>): IterableIterator<[A, B]>;
export function tuples<A, B, C>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>): IterableIterator<[A, B, C]>;
export function tuples<A, B, C, D>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, d: Iterable<D>): IterableIterator<[A, B, C, D]>;
export function tuples<A, B, C, D, E>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, d: Iterable<D>, e: Iterable<E>): IterableIterator<[A, B, C, D, E]>;
export function tuples<A, B, C, D, E, F>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, d: Iterable<D>, e: Iterable<E>, f: Iterable<F>): IterableIterator<[A, B, C, D, E, F]>;
export function tuples<A, B, C, D, E, F, G>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, d: Iterable<D>, e: Iterable<E>, f: Iterable<F>, g: Iterable<G>): IterableIterator<[A, B, C, D, E, F, G]>;
export function tuples<A, B, C, D, E, F, G, H>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, d: Iterable<D>, e: Iterable<E>, f: Iterable<F>, g: Iterable<G>, h: Iterable<H>): IterableIterator<[A, B, C, D, E, F, G, H]>;
export function* tuples(...src: Iterable<any>[]): IterableIterator<any[]> {
    const iters = src.map((s) => s[Symbol.iterator]());
    while (true) {
        const tuple = [];
        for (let i of iters) {
            let v = i.next();
            if (v.done) {
                return;
            }
            tuple.push(v.value);
        }
        yield tuple;
    }
}
