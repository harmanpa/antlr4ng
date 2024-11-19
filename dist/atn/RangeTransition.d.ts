import { IntervalSet } from "../misc/IntervalSet";
import { ATNState } from "./ATNState";
import { Transition } from "./Transition";
export declare class RangeTransition extends Transition {
    #private;
    readonly start: number;
    readonly stop: number;
    constructor(target: ATNState, start: number, stop: number);
    get label(): IntervalSet;
    get transitionType(): number;
    matches(symbol: number, _minVocabSymbol: number, _maxVocabSymbol: number): boolean;
    toString(): string;
}
