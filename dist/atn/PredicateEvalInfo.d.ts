import { DecisionEventInfo } from "./DecisionEventInfo";
import { SemanticContext } from "./SemanticContext";
/**
 * This interface represents profiling event information for semantic predicate
 * evaluations which occur during prediction.
 */
export interface PredicateEvalInfo extends DecisionEventInfo {
    /** The semantic context which was evaluated. */
    semctx: SemanticContext;
    /**
     * The alternative number for the decision which is guarded by the semantic
     * context {@link #semctx}. Note that other ATN
     * configurations may predict the same alternative which are guarded by
     * other semantic contexts and/or {@link SemanticContext#NONE}.
     */
    predictedAlt: number;
    /** The result of evaluating the semantic context {@link #semctx}. */
    evalResult: boolean;
}
