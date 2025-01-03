import type { SemanticContext } from "../atn/SemanticContext";
/** Map a predicate to a predicted alternative. */
export interface PredPrediction {
    pred: SemanticContext;
    alt: number;
}
export declare namespace PredPrediction {
    const toString: (prediction: PredPrediction) => string;
}
