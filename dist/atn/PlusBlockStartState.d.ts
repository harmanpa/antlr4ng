import { BlockStartState } from "./BlockStartState";
import { PlusLoopbackState } from "./PlusLoopbackState";
/**
 * Start of `(A|B|...)+` loop. Technically a decision state, but
 * we don't use for code generation; somebody might need it, so I'm defining
 * it for completeness. In reality, the {@link PlusLoopbackState} node is the
 * real decision-making note for `A+`
 */
export declare class PlusBlockStartState extends BlockStartState {
    static readonly stateType = 4;
    loopBackState: PlusLoopbackState;
}
