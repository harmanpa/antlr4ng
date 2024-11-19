import { ATNState } from "./ATNState";
/**
 * Mark the end of a * or + loop
 */
export declare class LoopEndState extends ATNState {
    static readonly stateType = 12;
    loopBackState?: ATNState;
}
