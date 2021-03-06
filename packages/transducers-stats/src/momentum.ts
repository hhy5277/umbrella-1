import { DCons } from "@thi.ng/dcons";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { Reducer, Transducer } from "@thi.ng/transducers/api";
import { compR } from "@thi.ng/transducers/func/compr";
import { iterator1 } from "@thi.ng/transducers/iterator";

/**
 * https://en.wikipedia.org/wiki/Momentum_(technical_analysis)
 *
 * Note: the number of results will be `period` less than the number
 * of processed inputs.
 *
 * @param period
 */
export function momentum(period: number): Transducer<number, number>;
export function momentum(period: number, src: Iterable<number>): IterableIterator<number>;
export function momentum(period: number, src?: Iterable<number>): any {
    if (src) {
        return iterator1(momentum(period), src);
    }
    period |= 0;
    period < 1 && illegalArgs("period must be >= 1");
    return (rfn: Reducer<any, number>) => {
        const reduce = rfn[2];
        const window = new DCons<number>();
        return compR(
            rfn,
            (acc, x: number) => {
                window.push(x);
                if (window.length <= period) {
                    return acc;
                }
                const prev = window.drop();
                return reduce(acc, x - prev);
            }
        );
    }
};
