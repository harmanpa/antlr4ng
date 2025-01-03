import { DecisionEventInfo } from "./DecisionEventInfo";
export interface LookaheadEventInfo extends DecisionEventInfo {
    /**
     * The alternative chosen by adaptivePredict(), not necessarily
     * the outermost alt shown for a rule; left-recursive rules have
     * user-level alts that differ from the rewritten rule with a (...) block
     * and a (..)* loop.
     */
    predictedAlt: number;
}
