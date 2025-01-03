import { DecisionState } from "./DecisionState";
/**
 * Decision state for `A+` and `(A|B)+`.  It has two transitions:
 * one to the loop back to start of the block and one to exit.
 */
export declare class PlusLoopbackState extends DecisionState {
    static readonly stateType = 11;
}
