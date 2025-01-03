import { SemanticContext } from "./SemanticContext";
import { ATNState } from "./ATNState";
import { PredictionContext } from "./PredictionContext";
import { Recognizer } from "../Recognizer";
import { ATNSimulator } from "./ATNSimulator";
export declare class ATNConfig {
    #private;
    /** The ATN state associated with this configuration */
    readonly state: ATNState;
    /** What alt (or lexer rule) is predicted by this configuration */
    readonly alt: number;
    /**
     * We cannot execute predicates dependent upon local context unless
     * we know for sure we are in the correct context. Because there is
     * no way to do this efficiently, we simply cannot evaluate
     * dependent predicates unless we are in the rule that initially
     * invokes the ATN simulator.
     *
     * closure() tracks the depth of how far we dip into the outer context:
     * depth > 0.
     */
    reachesIntoOuterContext: boolean;
    precedenceFilterSuppressed: boolean;
    get semanticContext(): SemanticContext;
    protected cachedHashCode: number | undefined;
    /** Never create config classes directly. Use the factory methods below. */
    protected constructor(c: Partial<ATNConfig>, state: ATNState, context: PredictionContext | null, semanticContext?: SemanticContext | null);
    static duplicate(old: ATNConfig, semanticContext?: SemanticContext): ATNConfig;
    static createWithContext(state: ATNState, alt: number, context: PredictionContext | null, semanticContext?: SemanticContext): ATNConfig;
    static createWithConfig(state: ATNState, config: ATNConfig, context?: PredictionContext): ATNConfig;
    static createWithSemanticContext(state: ATNState, c: ATNConfig, semanticContext?: SemanticContext | null): ATNConfig;
    hashCode(): number;
    /**
     * The stack of invoking states leading to the rule/states associated
     * with this config.  We track only those contexts pushed during
     * execution of the ATN simulator.
     */
    get context(): PredictionContext | null;
    set context(context: PredictionContext | null);
    /**
     * An ATN configuration is equal to another if both have
     * the same state, they predict the same alternative, and
     * syntactic/semantic contexts are the same.
     */
    equals(other: ATNConfig): boolean;
    toString(_recog?: Recognizer<ATNSimulator> | null, showAlt?: boolean): string;
}
