import { IntervalSet } from "../misc/IntervalSet";
import { Transition } from "./Transition";
import { ATNState } from "./ATNState";
export declare class AtomTransition extends Transition {
    #private;
    /** The token type or character value; or, signifies special label. */
    labelValue: number;
    constructor(target: ATNState, label: number);
    get label(): IntervalSet;
    get transitionType(): number;
    matches(symbol: number): boolean;
    toString(): string;
}
