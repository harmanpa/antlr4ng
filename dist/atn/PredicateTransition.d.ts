import { SemanticContext } from "./SemanticContext";
import { AbstractPredicateTransition } from "./AbstractPredicateTransition";
import { ATNState } from "./ATNState";
export declare class PredicateTransition extends AbstractPredicateTransition {
    readonly ruleIndex: number;
    readonly predIndex: number;
    readonly isCtxDependent: boolean;
    constructor(target: ATNState, ruleIndex: number, predIndex: number, isCtxDependent: boolean);
    get isEpsilon(): boolean;
    matches(_symbol: number, _minVocabSymbol: number, _maxVocabSymbol: number): boolean;
    get transitionType(): number;
    getPredicate(): SemanticContext.Predicate;
    toString(): string;
}
