import { PredictionContext } from "./PredictionContext";
export declare class SingletonPredictionContext extends PredictionContext {
    readonly parent: PredictionContext | null;
    readonly returnState: number;
    constructor(parent: PredictionContext | undefined, returnState: number);
    static create(parent: PredictionContext | undefined, returnState: number): SingletonPredictionContext;
    getParent(_index: number): PredictionContext | null;
    getReturnState(_index: number): number;
    equals(other: unknown): boolean;
    toString(): string;
    get length(): number;
}
