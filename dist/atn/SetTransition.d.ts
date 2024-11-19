import { IntervalSet } from "../misc/IntervalSet";
import { ATNState } from "./ATNState";
import { Transition } from "./Transition";
/** A transition containing a set of values. */
export declare class SetTransition extends Transition {
    set: IntervalSet;
    constructor(target: ATNState, set: IntervalSet);
    get transitionType(): number;
    get label(): IntervalSet;
    matches(symbol: number, _minVocabSymbol: number, _maxVocabSymbol: number): boolean;
    toString(): string;
}
