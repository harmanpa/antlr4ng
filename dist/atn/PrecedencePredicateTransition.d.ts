import { SemanticContext } from "./SemanticContext";
import { AbstractPredicateTransition } from "./AbstractPredicateTransition";
import { ATNState } from "./ATNState";
export declare class PrecedencePredicateTransition extends AbstractPredicateTransition {
    readonly precedence: number;
    constructor(target: ATNState, precedence: number);
    get isEpsilon(): boolean;
    matches(_symbol: number, _minVocabSymbol: number, _maxVocabSymbol: number): boolean;
    getPredicate(): SemanticContext.PrecedencePredicate;
    get transitionType(): number;
    toString(): string;
}
