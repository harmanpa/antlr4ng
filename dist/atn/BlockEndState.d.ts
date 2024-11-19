import { ATNState } from "./ATNState";
import { BlockStartState } from "./BlockStartState";
/**
 * Terminal node of a simple `(a|b|c)` block.
 */
export declare class BlockEndState extends ATNState {
    static readonly stateType = 8;
    startState?: BlockStartState;
}
