import { DecisionState } from "./DecisionState";
import { StarLoopbackState } from "./StarLoopbackState";
export declare class StarLoopEntryState extends DecisionState {
    static readonly stateType = 10;
    loopBackState: StarLoopbackState;
    /**
     * Indicates whether this state can benefit from a precedence DFA during SLL
     * decision making.
     *
     * This is a computed property that is calculated during ATN deserialization
     * and stored for use in {@link ParserATNSimulator} and
     * {@link ParserInterpreter}.
     *
     * @see `DFA.isPrecedenceDfa`
     */
    precedenceRuleDecision: boolean;
}
