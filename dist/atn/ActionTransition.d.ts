import { ATNState } from "./ATNState";
import { Transition } from "./Transition";
export declare class ActionTransition extends Transition {
    ruleIndex: number;
    actionIndex: number;
    isCtxDependent: boolean;
    constructor(target: ATNState, ruleIndex: number, actionIndex?: number, isCtxDependent?: boolean);
    get isEpsilon(): boolean;
    get transitionType(): number;
    matches(_symbol: number, _minVocabSymbol: number, _maxVocabSymbol: number): boolean;
    toString(): string;
}
