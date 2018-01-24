export default function range(): IterableIterator<number>;
export default function range(to: number): IterableIterator<number>;
export default function range(from: number, to: number): IterableIterator<number>;
export default function range(from: number, to: number, step: number): IterableIterator<number>;
export default function* range(from?: number, to?: number, step?: number) {
    if (from === undefined) {
        from = 0;
        to = Number.POSITIVE_INFINITY;
    } else if (to === undefined) {
        to = from;
        from = 0;
    }
    step = step === undefined ? (from < to ? 1 : -1) : step;
    if (step > 0) {
        while (from < to) {
            yield from;
            from += step;
        }
    } else if (step < 0) {
        while (from > to) {
            yield from;
            from += step;
        }
    }
}
