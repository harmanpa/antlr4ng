import { Recognizer } from "../Recognizer";
import { ATNSimulator } from "./ATNSimulator";
export declare abstract class PredictionContext {
    #private;
    /**
     * Represents `$` in an array in full context mode, when `$`
     * doesn't mean wildcard: `$ + x = [$,x]`. Here,
     * `$` = {@link EMPTY_RETURN_STATE}.
     */
    static readonly EMPTY_RETURN_STATE = 2147483647;
    static EMPTY: PredictionContext;
    static traceATNSimulator: boolean;
    constructor(cachedHashCode: number);
    protected static calculateEmptyHashCode(): number;
    protected static calculateHashCodeSingle(parent: PredictionContext, returnState: number): number;
    protected static calculateHashCodeList(parents: Array<PredictionContext | null>, returnStates: number[]): number;
    isEmpty(): boolean;
    hasEmptyPath(): boolean;
    hashCode(): number;
    toString(_recog?: Recognizer<ATNSimulator>): string;
    abstract getParent(index: number): PredictionContext | null;
    abstract getReturnState(index: number): number;
    abstract get length(): number;
    abstract equals(obj: unknown): boolean;
}
