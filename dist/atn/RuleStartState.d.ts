import { ATNState } from "./ATNState";
import { RuleStopState } from "./RuleStopState";
export declare class RuleStartState extends ATNState {
    static readonly stateType = 2;
    stopState?: RuleStopState;
    isLeftRecursiveRule: boolean;
    isPrecedenceRule: boolean;
}
