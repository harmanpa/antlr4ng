import { ATNState } from "./ATNState";
import { Transition } from "./Transition";
export declare class RuleTransition extends Transition {
    ruleIndex: number;
    precedence: number;
    followState: ATNState;
    constructor(ruleStart: ATNState, ruleIndex: number, precedence: number, followState: ATNState);
    get isEpsilon(): boolean;
    get transitionType(): number;
    matches(_symbol: number, _minVocabSymbol: number, _maxVocabSymbol: number): boolean;
}
