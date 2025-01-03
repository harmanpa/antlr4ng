import { IntervalSet } from "../misc/IntervalSet";
import { ATNState } from "./ATNState";
import { ATN } from "./ATN";
import { ParserRuleContext } from "../ParserRuleContext";
export declare class LL1Analyzer {
    #private;
    /**
     * Special value added to the lookahead sets to indicate that we hit
     * a predicate during analysis if `seeThruPreds==false`.
     */
    private static readonly hitPredicate;
    /**
     * Calculates the SLL(1) expected lookahead set for each outgoing transition
     * of an {@link ATNState}. The returned array has one element for each
     * outgoing transition in `s`. If the closure from transition
     * _i_ leads to a semantic predicate before matching a symbol, the
     * element at index *i* of the result will be `null`.
     *
     * @param s the ATN state
     * @returns the expected symbols for each outgoing transition of `s`.
     */
    getDecisionLookahead(s?: ATNState): Array<IntervalSet | null> | undefined;
    /**
     * Compute set of tokens that can follow `s` in the ATN in the
     * specified `ctx`.
     *
     * If `ctx` is `null` and the end of the rule containing
     * `s` is reached, {@link Token//EPSILON} is added to the result set.
     * If `ctx` is not `null` and the end of the outermost rule is
     * reached, {@link Token//EOF} is added to the result set.
     *
     * @param atn the ATN
     * @param s the ATN state
     * @param stopState the ATN state to stop at. This can be a
     * {@link BlockEndState} to detect epsilon paths through a closure.
     * @param ctx the complete parser context, or `null` if the context
     * should be ignored
     *
     * @returns The set of tokens that can follow `s` in the ATN in the
     * specified `ctx`.
     */
    look(atn: ATN, s: ATNState, stopState?: ATNState, ctx?: ParserRuleContext): IntervalSet;
    /**
     * Compute set of tokens that can follow `s` in the ATN in the
     * specified `ctx`.
     *
     * If `ctx` is `null` and `stopState` or the end of the
     * rule containing `s` is reached, {@link Token//EPSILON} is added to
     * the result set. If `ctx` is not `null` and `addEOF` is
     * `true` and `stopState` or the end of the outermost rule is
     * reached, {@link Token//EOF} is added to the result set.
     *
     * @param s the ATN state.
     * @param stopState the ATN state to stop at. This can be a
     * {@link BlockEndState} to detect epsilon paths through a closure.
     * @param ctx The outer context, or `null` if the outer context should
     * not be used.
     * @param look The result lookahead set.
     * @param lookBusy A set used for preventing epsilon closures in the ATN
     * from causing a stack overflow. Outside code should pass
     * `new CustomizedSet<ATNConfig>` for this argument.
     * @param calledRuleStack A set used for preventing left recursion in the
     * ATN from causing a stack overflow. Outside code should pass
     * `new BitSet()` for this argument.
     * @param seeThruPreds `true` to true semantic predicates as
     * implicitly `true` and "see through them", otherwise `false`
     * to treat semantic predicates as opaque and add {@link hitPredicate} to the
     * result if one is encountered.
     * @param addEOF Add {@link Token//EOF} to the result if the end of the
     * outermost context is reached. This parameter has no effect if `ctx`
     * is `null`.
     */
    private doLook;
}
