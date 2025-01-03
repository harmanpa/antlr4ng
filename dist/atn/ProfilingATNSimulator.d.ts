import { ParserRuleContext } from "../ParserRuleContext";
import { TokenStream } from "../TokenStream";
import { DFAState } from "../dfa/DFAState";
import { Parser, DFA, BitSet } from "../index";
import { ATNConfigSet } from "./ATNConfigSet";
import { DecisionInfo } from "./DecisionInfo";
import { ParserATNSimulator } from "./ParserATNSimulator";
export declare class ProfilingATNSimulator extends ParserATNSimulator {
    #private;
    protected readonly decisions: DecisionInfo[];
    protected numDecisions: number;
    protected currentDecision: number;
    protected currentState?: DFAState;
    /**
     * At the point of LL failover, we record how SLL would resolve the conflict so that
     *  we can determine whether or not a decision / input pair is context-sensitive.
     *  If LL gives a different result than SLL's predicted alternative, we have a
     *  context sensitivity for sure. The converse is not necessarily true, however.
     *  It's possible that after conflict resolution chooses minimum alternatives,
     *  SLL could get the same answer as LL. Regardless of whether or not the result indicates
     *  an ambiguity, it is not treated as a context sensitivity because LL prediction
     *  was not required in order to produce a correct prediction for this decision and input sequence.
     *  It may in fact still be a context sensitivity but we don't know by looking at the
     *  minimum alternatives for the current input.
     */
    protected conflictingAltResolvedBySLL: number | undefined;
    constructor(parser: Parser);
    adaptivePredict(input: TokenStream, decision: number, outerContext: ParserRuleContext): number;
    getExistingTargetState(previousD: DFAState, t: number): DFAState | undefined;
    computeTargetState(dfa: DFA, previousD: DFAState, t: number): DFAState;
    computeReachSet(closure: ATNConfigSet, t: number, fullCtx: boolean): ATNConfigSet | null;
    reportAttemptingFullContext(dfa: DFA, conflictingAlts: BitSet | null, configs: ATNConfigSet, startIndex: number, stopIndex: number): void;
    reportContextSensitivity(dfa: DFA, prediction: number, configs: ATNConfigSet, startIndex: number, stopIndex: number): void;
    reportAmbiguity(dfa: DFA, state: DFAState, startIndex: number, stopIndex: number, exact: boolean, ambigAlts: BitSet | undefined, configs: ATNConfigSet): void;
    getDecisionInfo(): DecisionInfo[];
    getCurrentState(): DFAState | undefined;
}
