import { PredictionContext } from "./PredictionContext";
import { SingletonPredictionContext } from "./SingletonPredictionContext";
export declare class EmptyPredictionContext extends SingletonPredictionContext {
    /**
     * Represents `$` in local context prediction, which means wildcard.
     * `*+x = *`.
     */
    static readonly instance: EmptyPredictionContext;
    constructor();
    isEmpty(): boolean;
    getParent(): PredictionContext | null;
    getReturnState(): number;
    equals(other: unknown): boolean;
    toString(): string;
}
