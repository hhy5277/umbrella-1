import { Transducer } from "@thi.ng/transducers/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { iterator1 } from "@thi.ng/transducers/iterator";
import { drop } from "@thi.ng/transducers/xform/drop";
import { map } from "@thi.ng/transducers/xform/map";
import { multiplex } from "@thi.ng/transducers/xform/multiplex";

import { wma } from "./wma";

/**
 * https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/hull-moving-average
 *
 * Note: the number of results will be `period + floor(sqrt(period)) - 2`
 * less than the number of processed inputs.
 *
 * @param weights period or array of weights
 */
export function hma(period: number): Transducer<number, any>;
export function hma(period: number, src: Iterable<number>): IterableIterator<number>;
export function hma(period: number, src?: Iterable<number>): any {
    return src ?
        iterator1(hma(period), src) :
        comp(
            multiplex(wma(period / 2 | 0), wma(period)),
            drop(period - 1),
            map((w) => 2 * w[0] - w[1]),
            wma(Math.sqrt(period))
        );
};
