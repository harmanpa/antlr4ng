import { PredictionContext } from "./PredictionContext";
export declare class ArrayPredictionContext extends PredictionContext {
    readonly parents: Array<PredictionContext | null>;
    readonly returnStates: number[];
    constructor(parents: Array<PredictionContext | null>, returnStates: number[]);
    isEmpty(): boolean;
    get length(): number;
    getParent(index: number): PredictionContext | null;
    getReturnState(index: number): number;
    equals(other: unknown): boolean;
    toString(): string;
}
