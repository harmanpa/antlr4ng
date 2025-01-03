import { DecisionInfo, ProfilingATNSimulator } from "./index";
/**
 * This class provides access to specific and aggregate statistics gathered
 * during profiling of a parser.
 */
export declare class ParseInfo {
    protected readonly atnSimulator: ProfilingATNSimulator;
    constructor(atnSimulator: ProfilingATNSimulator);
    /**
     * Gets an array of {@link DecisionInfo} instances containing the profiling
     * information gathered for each decision in the ATN.
     *
     * @returns An array of {@link DecisionInfo} instances, indexed by decision
     * number.
     */
    getDecisionInfo(): DecisionInfo[];
    /**
     * Gets the decision numbers for decisions that required one or more
     * full-context predictions during parsing. These are decisions for which
     * {@link DecisionInfo#llFallback} is non-zero.
     *
     * @returns A list of decision numbers which required one or more
     * full-context predictions during parsing.
     */
    getLLDecisions(): number[];
    /**
     * Gets the total time spent during prediction across all decisions made
     * during parsing. This value is the sum of
     * {@link DecisionInfo#timeInPrediction} for all decisions.
     */
    getTotalTimeInPrediction(): number;
    /**
     * Gets the total number of SLL lookahead operations across all decisions
     * made during parsing. This value is the sum of
     * {@link DecisionInfo#sllTotalLook} for all decisions.
     */
    getTotalSLLLookaheadOps(): number;
    /**
     * Gets the total number of LL lookahead operations across all decisions
     * made during parsing. This value is the sum of
     * {@link DecisionInfo#llTotalLook} for all decisions.
     */
    getTotalLLLookaheadOps(): number;
    /**
     * Gets the total number of ATN lookahead operations for SLL prediction
     * across all decisions made during parsing.
     */
    getTotalSLLATNLookaheadOps(): number;
    /**
     * Gets the total number of ATN lookahead operations for LL prediction
     * across all decisions made during parsing.
     */
    getTotalLLATNLookaheadOps(): number;
    /**
     * Gets the total number of ATN lookahead operations for SLL and LL
     * prediction across all decisions made during parsing.
     *
     *
     * This value is the sum of {@link #getTotalSLLATNLookaheadOps} and
     * {@link #getTotalLLATNLookaheadOps}.
     */
    getTotalATNLookaheadOps(): number;
    /**
     * Gets the total number of DFA states stored in the DFA cache for all
     * decisions in the ATN.
     */
    getDFASize(): number;
    /**
     * Gets the total number of DFA states stored in the DFA cache for a
     * particular decision.
     */
    getDFASize(decision: number): number;
}
