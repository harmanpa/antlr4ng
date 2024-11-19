import { BlockEndState } from "./BlockEndState";
import { DecisionState } from "./DecisionState";
/**
 *  The start of a regular `(...)` block
 */
export declare class BlockStartState extends DecisionState {
    endState?: BlockEndState;
}
