import { AmbiguityInfo } from "./AmbiguityInfo";
import { ContextSensitivityInfo } from "./ContextSensitivityInfo";
import type { DecisionEventInfo } from "./DecisionEventInfo";
import { LookaheadEventInfo } from "./LookaheadEventInfo";
import { PredicateEvalInfo } from "./PredicateEvalInfo";
export declare class DecisionInfo {
    /**
     * The decision number, which is an index into {@link ATN.decisionToState}.
     */
    readonly decision: number;
    /**
     * The total number of times {@link ParserATNSimulator.adaptivePredict} was
     * invoked for this decision.
     */
    invocations: number;
    /**
     * The total time spent in {@link ParserATNSimulator.adaptivePredict} for
     * this decision, in nanoseconds.
     *
     * The value of this field contains the sum of differential results obtained
     * by {@link process.hrtime()}, and is not adjusted to compensate for JIT
     * and/or garbage collection overhead. For best accuracy, use a modern Node
     * version that provides precise results from {@link process.hrtime()}, and
     * perform profiling in a separate process which is warmed up by parsing the
     * input prior to profiling.
     */
    timeInPrediction: number;
    /**
     * The sum of the lookahead required for SLL prediction for this decision.
     * Note that SLL prediction is used before LL prediction for performance
     * reasons even when {@link PredictionMode.LL} or
     * {@link PredictionMode.LL_EXACT_AMBIG_DETECTION} is used.
     */
    sllTotalLook: number;
    /**
     * Gets the minimum lookahead required for any single SLL prediction to
     * complete for this decision, by reaching a unique prediction, reaching an
     * SLL conflict state, or encountering a syntax error.
     */
    sllMinLook: number;
    /**
     * Gets the maximum lookahead required for any single SLL prediction to
     * complete for this decision, by reaching a unique prediction, reaching an
     * SLL conflict state, or encountering a syntax error.
     */
    sllMaxLook: number;
    /**
     * Gets the {@link LookaheadEventInfo} associated with the event where the
     * {@link sllMaxLook} value was set.
     */
    sllMaxLookEvent: LookaheadEventInfo;
    /**
     * The sum of the lookahead required for LL prediction for this decision.
     * Note that LL prediction is only used when SLL prediction reaches a
     * conflict state.
     */
    llTotalLook: number;
    /**
     * Gets the minimum lookahead required for any single LL prediction to
     * complete for this decision. An LL prediction completes when the algorithm
     * reaches a unique prediction, a conflict state (for
     * {@link PredictionMode.LL}, an ambiguity state (for
     * {@link PredictionMode.LL_EXACT_AMBIG_DETECTION}, or a syntax error.
     */
    llMinLook: number;
    /**
     * Gets the maximum lookahead required for any single LL prediction to
     * complete for this decision. An LL prediction completes when the algorithm
     * reaches a unique prediction, a conflict state (for
     * {@link PredictionMode.LL}, an ambiguity state (for
     * {@link PredictionMode.LL_EXACT_AMBIG_DETECTION}, or a syntax error.
     */
    llMaxLook: number;
    /**
     * Gets the {@link LookaheadEventInfo} associated with the event where the
     * {@link llMaxLook} value was set.
     */
    llMaxLookEvent: LookaheadEventInfo;
    /**
     * A collection of {@link ContextSensitivityInfo} instances describing the
     * context sensitivities encountered during LL prediction for this decision.
     */
    readonly contextSensitivities: ContextSensitivityInfo[];
    /**
     * A collection of {@link DecisionEventInfo} instances describing the parse errors
     * identified during calls to {@link ParserATNSimulator.adaptivePredict} for
     * this decision.
     */
    readonly errors: DecisionEventInfo[];
    /**
     * A collection of {@link AmbiguityInfo} instances describing the
     * ambiguities encountered during LL prediction for this decision.
     */
    readonly ambiguities: AmbiguityInfo[];
    /**
     * A collection of {@link PredicateEvalInfo} instances describing the
     * results of evaluating individual predicates during prediction for this
     * decision.
     */
    readonly predicateEvals: PredicateEvalInfo[];
    /**
     * The total number of ATN transitions required during SLL prediction for
     * this decision. An ATN transition is determined by the number of times the
     * DFA does not contain an edge that is required for prediction, resulting
     * in on-the-fly computation of that edge.
    /**
     * If DFA caching of SLL transitions is employed by the implementation, ATN
     * computation may cache the computed edge for efficient lookup during
     * future parsing of this decision. Otherwise, the SLL parsing algorithm
     * will use ATN transitions exclusively.
     *
     * @see sllDFATransitions
     * @see ParserATNSimulator.computeTargetState
     * @see LexerATNSimulator.computeTargetState
     */
    sllATNTransitions: number;
    /**
     * The total number of DFA transitions required during SLL prediction for
     * this decision.
     *
     * If the ATN simulator implementation does not use DFA caching for SLL
     * transitions, this value will be 0.
     *
     * @see ParserATNSimulator.getExistingTargetState
     * @see LexerATNSimulator.getExistingTargetState
     */
    sllDFATransitions: number;
    /**
     * Gets the total number of times SLL prediction completed in a conflict
     * state, resulting in fallback to LL prediction.
     *
     * Note that this value is not related to whether or not
     * {@link PredictionMode.SLL} may be used successfully with a particular
     * grammar. If the ambiguity resolution algorithm applied to the SLL
     * conflicts for this decision produce the same result as LL prediction for
     * this decision, {@link PredictionMode.SLL} would produce the same overall
     * parsing result as {@link PredictionMode.LL}.
     */
    llFallback: number;
    /**
     * The total number of ATN transitions required during LL prediction for
     * this decision. An ATN transition is determined by the number of times the
     * DFA does not contain an edge that is required for prediction, resulting
     * in on-the-fly computation of that edge.
     *
     * If DFA caching of LL transitions is employed by the implementation, ATN
     * computation may cache the computed edge for efficient lookup during
     * future parsing of this decision. Otherwise, the LL parsing algorithm will
     * use ATN transitions exclusively.
     *
     * @see llDFATransitions
     * @see ParserATNSimulator.computeTargetState
     * @see LexerATNSimulator.computeTargetState
     */
    llATNTransitions: number;
    /**
     * The total number of DFA transitions required during LL prediction for
     * this decision.
     *
     * If the ATN simulator implementation does not use DFA caching for LL
     * transitions, this value will be 0.
     *
     * @see ParserATNSimulator.getExistingTargetState
     * @see LexerATNSimulator.getExistingTargetState
     */
    llDFATransitions: number;
    /**
     * Constructs a new instance of the {@link DecisionInfo} class to contain
     * statistics for a particular decision.
     *
     * @param decision The decision number
     */
    constructor(decision: number);
    toString1(): string;
}
