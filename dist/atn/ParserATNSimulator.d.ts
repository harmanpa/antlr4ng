import { NoViableAltException } from "../NoViableAltException";
import { DFAState } from "../dfa/DFAState";
import { BitSet } from "../misc/BitSet";
import { HashSet } from "../misc/HashSet";
import { DoubleDict } from "../utils/DoubleDict";
import { ATN } from "./ATN";
import { ATNConfig } from "./ATNConfig";
import { ATNConfigSet } from "./ATNConfigSet";
import { ATNSimulator } from "./ATNSimulator";
import { PredictionContext } from "./PredictionContext";
import { RuleTransition } from "./RuleTransition";
import { SemanticContext } from "./SemanticContext";
import { Parser } from "../Parser";
import { DFA } from "../dfa/DFA";
import { PredictionContextCache } from "./PredictionContextCache";
import { TokenStream } from "../TokenStream";
import { ParserRuleContext } from "../ParserRuleContext";
import { DecisionState } from "./DecisionState";
import { ATNState } from "./ATNState";
import { Transition } from "./Transition";
import type { PrecedencePredicateTransition } from "./PrecedencePredicateTransition";
import type { PredicateTransition } from "./PredicateTransition";
import { PredPrediction } from "../dfa/PredPrediction";
/** Comprises the input values for the current prediction run. */
interface PredictionState {
    input?: TokenStream;
    startIndex: number;
    outerContext?: ParserRuleContext;
    dfa?: DFA;
}
/**
 * The embodiment of the adaptive LL(*), ALL(*), parsing strategy.
 *
 * The basic complexity of the adaptive strategy makes it harder to understand.
 * We begin with ATN simulation to build paths in a DFA. Subsequent prediction
 * requests go through the DFA first. If they reach a state without an edge for
 * the current symbol, the algorithm fails over to the ATN simulation to
 * complete the DFA path for the current input (until it finds a conflict state
 * or uniquely predicting state).
 *
 * All of that is done without using the outer context because we want to create
 * a DFA that is not dependent upon the rule invocation stack when we do a
 * prediction. One DFA works in all contexts. We avoid using context not
 * necessarily because it's slower, although it can be, but because of the DFA
 * caching problem. The closure routine only considers the rule invocation stack
 * created during prediction beginning in the decision rule. For example, if
 * prediction occurs without invoking another rule's ATN, there are no context
 * stacks in the configurations. When lack of context leads to a conflict, we
 * don't know if it's an ambiguity or a weakness in the strong LL(*) parsing
 * strategy (versus full LL(*)).
 *
 * When SLL yields a configuration set with conflict, we rewind the input and
 * retry the ATN simulation, this time using full outer context without adding
 * to the DFA. Configuration context stacks will be the full invocation stacks
 * from the start rule. If we get a conflict using full context, then we can
 * definitively say we have a true ambiguity for that input sequence. If we
 * don't get a conflict, it implies that the decision is sensitive to the outer
 * context. (It is not context-sensitive in the sense of context-sensitive
 * grammars.)
 *
 * The next time we reach this DFA state with an SLL conflict, through DFA
 * simulation, we will again retry the ATN simulation using full context mode.
 * This is slow because we can't save the results and have to "interpret" the
 * ATN each time we get that input.
 *
 * **CACHING FULL CONTEXT PREDICTIONS**
 *
 * We could cache results from full context to predicted alternative easily and
 * that saves a lot of time but doesn't work in presence of predicates. The set
 * of visible predicates from the ATN start state changes depending on the
 * context, because closure can fall off the end of a rule. I tried to cache
 * tuples (stack context, semantic context, predicted alt) but it was slower
 * than interpreting and much more complicated. Also required a huge amount of
 * memory. The goal is not to create the world's fastest parser anyway. I'd like
 * to keep this algorithm simple. By launching multiple threads, we can improve
 * the speed of parsing across a large number of files.
 *
 * There is no strict ordering between the amount of input used by SLL vs LL,
 * which makes it really hard to build a cache for full context. Let's say that
 * we have input A B C that leads to an SLL conflict with full context X. That
 * implies that using X we might only use A B but we could also use A B C D to
 * resolve conflict. Input A B C D could predict alternative 1 in one position
 * in the input and A B C E could predict alternative 2 in another position in
 * input. The conflicting SLL configurations could still be non-unique in the
 * full context prediction, which would lead us to requiring more input than the
 * original A B C.	To make a	prediction cache work, we have to track	the exact
 * input	used during the previous prediction. That amounts to a cache that maps
 * X to a specific DFA for that context.
 *
 * Something should be done for left-recursive expression predictions. They are
 * likely LL(1) + pred eval. Easier to do the whole SLL unless error and retry
 * with full LL thing Sam does.
 *
 * **AVOIDING FULL CONTEXT PREDICTION**
 *
 * We avoid doing full context retry when the outer context is empty, we did not
 * dip into the outer context by falling off the end of the decision state rule,
 * or when we force SLL mode.
 *
 * As an example of the not dip into outer context case, consider as super
 * constructor calls versus function calls. One grammar might look like
 * this:
 *
 * ```
 * ctorBody
 *   : '{' superCall? stat* '}'
 *   ;
 * ```
 *
 * Or, you might see something like
 *
 * ```
 * stat
 *   : superCall ';'
 *   | expression ';'
 *   | ...
 *   ;
 * ```
 *
 * In both cases I believe that no closure operations will dip into the outer
 * context. In the first case ctorBody in the worst case will stop at the '}'.
 * In the 2nd case it should stop at the ';'. Both cases should stay within the
 * entry rule and not dip into the outer context.
 *
 * **PREDICATES**
 *
 * Predicates are always evaluated if present in either SLL or LL both. SLL and
 * LL simulation deals with predicates differently. SLL collects predicates as
 * it performs closure operations like ANTLR v3 did. It delays predicate
 * evaluation until it reaches and accept state. This allows us to cache the SLL
 * ATN simulation whereas, if we had evaluated predicates on-the-fly during
 * closure, the DFA state configuration sets would be different and we couldn't
 * build up a suitable DFA.
 *
 * When building a DFA accept state during ATN simulation, we evaluate any
 * predicates and return the sole semantically valid alternative. If there is
 * more than 1 alternative, we report an ambiguity. If there are 0 alternatives,
 * we throw an exception. Alternatives without predicates act like they have
 * true predicates. The simple way to think about it is to strip away all
 * alternatives with false predicates and choose the minimum alternative that
 * remains.
 *
 * When we start in the DFA and reach an accept state that's predicated, we test
 * those and return the minimum semantically viable alternative. If no
 * alternatives are viable, we throw an exception.
 *
 * During full LL ATN simulation, closure always evaluates predicates and
 * on-the-fly. This is crucial to reducing the configuration set size during
 * closure. It hits a landmine when parsing with the Java grammar, for example,
 * without this on-the-fly evaluation.
 *
 * **SHARING DFA**
 *
 * All instances of the same parser share the same decision DFAs through a
 * static field. Each instance gets its own ATN simulator but they share the
 * same {@link decisionToDFA} field. They also share a
 * {@link PredictionContextCache} object that makes sure that all
 * {@link PredictionContext} objects are shared among the DFA states. This makes
 * a big size difference.
 *
 * **THREAD SAFETY**
 *
 * The {@link ParserATNSimulator} locks on the {@link decisionToDFA} field when
 * it adds a new DFA object to that array. {@link addDFAEdge}
 * locks on the DFA for the current decision when setting the
 * {@link DFAState.edges} field. {@link addDFAState} locks on
 * the DFA for the current decision when looking up a DFA state to see if it
 * already exists. We must make sure that all requests to add DFA states that
 * are equivalent result in the same shared DFA object. This is because lots of
 * threads will be trying to update the DFA at once. The
 * {@link addDFAState} method also locks inside the DFA lock
 * but this time on the shared context cache when it rebuilds the
 * configurations' {@link PredictionContext} objects using cached
 * subgraphs/nodes. No other locking occurs, even during DFA simulation. This is
 * safe as long as we can guarantee that all threads referencing
 * `s.edge[t]` get the same physical target {@link DFAState}, or
 * `null`. Once into the DFA, the DFA simulation does not reference the
 * {@link DFA.states} map. It follows the {@link DFAState.edges} field to new
 * targets. The DFA simulator will either find {@link DFAState.edges} to be
 * `null`, to be non-`null` and `dfa.edges[t]` null, or
 * `dfa.edges[t]` to be non-null. The
 * {@link addDFAEdge} method could be racing to set the field
 * but in either case the DFA simulator works; if `null`, and requests ATN
 * simulation. It could also race trying to get `dfa.edges[t]`, but either
 * way it will work because it's not doing a test and set operation.
 *
 * **Starting with SLL then failing to combined SLL/LL (Two-Stage
 * Parsing)**
 *
 * Sam pointed out that if SLL does not give a syntax error, then there is no
 * point in doing full LL, which is slower. We only have to try LL if we get a
 * syntax error. For maximum speed, Sam starts the parser set to pure SLL
 * mode with the {@link BailErrorStrategy}:
 *
 * ```
 * parser.{@link Parser.getInterpreter() getInterpreter()}.{@link setPredictionMode setPredictionMode}`(`
 * {@link PredictionMode.SLL}`)`;
 * parser.{@link Parser.setErrorHandler setErrorHandler}(new {@link BailErrorStrategy}());
 * ```
 *
 * If it does not get a syntax error, then we're done. If it does get a syntax
 * error, we need to retry with the combined SLL/LL strategy.
 *
 * The reason this works is as follows. If there are no SLL conflicts, then the
 * grammar is SLL (at least for that input set). If there is an SLL conflict,
 * the full LL analysis must yield a set of viable alternatives which is a
 * subset of the alternatives reported by SLL. If the LL set is a singleton,
 * then the grammar is LL but not SLL. If the LL set is the same size as the SLL
 * set, the decision is SLL. If the LL set has size > 1, then that decision
 * is truly ambiguous on the current input. If the LL set is smaller, then the
 * SLL conflict resolution might choose an alternative that the full LL would
 * rule out as a possibility based upon better context information. If that's
 * the case, then the SLL parse will definitely get an error because the full LL
 * analysis says it's not viable. If SLL conflict resolution chooses an
 * alternative within the LL set, them both SLL and LL would choose the same
 * alternative because they both choose the minimum of multiple conflicting
 * alternatives.
 *
 * Let's say we have a set of SLL conflicting alternatives `{1, 2, 3`} and
 * a smaller LL set called *s*. If *s* is `{2, 3`}, then SLL
 * parsing will get an error because SLL will pursue alternative 1. If
 * s* is `{1, 2`} or `{1, 3`} then both SLL and LL will
 * choose the same alternative because alternative one is the minimum of either
 * set. If *s* is `{2`} or `{3`} then SLL will get a syntax
 * error. If *s* is `{1`} then SLL will succeed.
 *
 * Of course, if the input is invalid, then we will get an error for sure in
 * both SLL and LL parsing. Erroneous input will therefore require 2 passes over
 * the input.
 */
export declare class ParserATNSimulator extends ATNSimulator {
    static traceATNSimulator: boolean;
    static debug?: boolean;
    static debugAdd: boolean;
    static debugClosure: boolean;
    static dfaDebug: boolean;
    static retryDebug: boolean;
    /** SLL, LL, or LL + exact ambig detection? */
    predictionMode: number;
    readonly decisionToDFA: DFA[];
    protected readonly parser: Parser;
    /**
     * Each prediction operation uses a cache for merge of prediction contexts.
     * Don't keep around as it wastes huge amounts of memory. DoubleKeyMap
     * isn't synchronized but we're ok since two threads shouldn't reuse same
     * parser/atn sim object because it can only handle one input at a time.
     * This maps graphs a and b to merged result c. (a,b)->c. We can avoid
     * the merge if we ever see a and b again.  Note that (b,a)->c should
     * also be examined during cache lookup.
     */
    protected mergeCache: DoubleDict<PredictionContext, PredictionContext, PredictionContext>;
    protected predictionState: PredictionState | undefined;
    constructor(recog: Parser, atn: ATN, decisionToDFA: DFA[], sharedContextCache?: PredictionContextCache);
    private static getUniqueAlt;
    reset(): void;
    clearDFA(): void;
    adaptivePredict(input: TokenStream, decision: number, outerContext: ParserRuleContext | null): number;
    /**
     * Performs ATN simulation to compute a predicted alternative based
     *  upon the remaining input, but also updates the DFA cache to avoid
     *  having to traverse the ATN again for the same input sequence.
     *
     * There are some key conditions we're looking for after computing a new
     * set of ATN configs (proposed DFA state):
     *       if the set is empty, there is no viable alternative for current symbol
     *       does the state uniquely predict an alternative?
     *       does the state have a conflict that would prevent us from
     *         putting it on the work list?
     *
     * We also have some key operations to do:
     *       add an edge from previous DFA state to potentially new DFA state, D,
     *         upon current symbol but only if adding to work list, which means in all
     *         cases except no viable alternative (and possibly non-greedy decisions?)
     *       collecting predicates and adding semantic context to DFA accept states
     *       adding rule context to context-sensitive DFA accept states
     *       consuming an input symbol
     *       reporting a conflict
     *       reporting an ambiguity
     *       reporting a context sensitivity
     *       reporting insufficient predicates
     *
     * cover these cases:
     *    dead end
     *    single alt
     *    single alt + preds
     *    conflict
     *    conflict + preds
     */
    execATN(dfa: DFA, s0: DFAState, input: TokenStream, startIndex: number, outerContext: ParserRuleContext): number;
    /**
     * Get an existing target state for an edge in the DFA. If the target state
     * for the edge has not yet been computed or is otherwise not available,
     * this method returns `null`.
     *
     * @param previousD The current DFA state
     * @param t The next input symbol
     * @returns The existing target DFA state for the given input symbol
     * `t`, or `null` if the target state for this edge is not
     * already cached
     */
    getExistingTargetState(previousD: DFAState, t: number): DFAState | undefined;
    /**
     * Compute a target state for an edge in the DFA, and attempt to add the
     * computed state and corresponding edge to the DFA.
     *
     * @param dfa The DFA
     * @param previousD The current DFA state
     * @param t The next input symbol
     *
     * @returns The computed target DFA state for the given input symbol
     * `t`. If `t` does not lead to a valid DFA state, this method
     * returns {@link ERROR
     */
    computeTargetState(dfa: DFA, previousD: DFAState, t: number): DFAState;
    getRuleName(index: number): string;
    getTokenName(t: number): string;
    getLookaheadName(input: TokenStream): string;
    /**
     * Used for debugging in adaptivePredict around execATN but I cut
     * it out for clarity now that alg. works well. We can leave this
     * "dead" code for a bit
     */
    dumpDeadEndConfigs(e: NoViableAltException): void;
    protected predicateDFAState(dfaState: DFAState, decisionState: DecisionState): void;
    protected execATNWithFullContext(dfa: DFA, D: DFAState, // how far we got before failing over
    s0: ATNConfigSet, input: TokenStream, startIndex: number, outerContext: ParserRuleContext): number;
    protected computeReachSet(closure: ATNConfigSet, t: number, fullCtx: boolean): ATNConfigSet | null;
    /**
     * Return a configuration set containing only the configurations from
     * `configs` which are in a {@link RuleStopState}. If all
     * configurations in `configs` are already in a rule stop state, this
     * method simply returns `configs`.
     *
     * When `lookToEndOfRule` is true, this method uses
     * {@link ATN.nextTokens} for each configuration in `configs` which is
     * not already in a rule stop state to see if a rule stop state is reachable
     * from the configuration via epsilon-only transitions.
     *
     * @param configs the configuration set to update
     * @param lookToEndOfRule when true, this method checks for rule stop states
     * reachable by epsilon-only transitions from each configuration in
     * `configs`.
     *
     * @returns `configs` if all configurations in `configs` are in a
     * rule stop state, otherwise return a new configuration set containing only
     * the configurations from `configs` which are in a rule stop state
     */
    protected removeAllConfigsNotInRuleStopState(configs: ATNConfigSet, lookToEndOfRule: boolean): ATNConfigSet;
    protected computeStartState(p: ATNState, ctx: ParserRuleContext, fullCtx: boolean): ATNConfigSet;
    /**
     * This method transforms the start state computed by
     * {@link computeStartState} to the special start state used by a
     * precedence DFA for a particular precedence value. The transformation
     * process applies the following changes to the start state's configuration
     * set.
     *
     * 1. Evaluate the precedence predicates for each configuration using
     * {@link SemanticContext//evalPrecedence}.
     * 2. Remove all configurations which predict an alternative greater than
     * 1, for which another configuration that predicts alternative 1 is in the
     * same ATN state with the same prediction context. This transformation is
     * valid for the following reasons:
     * 3. The closure block cannot contain any epsilon transitions which bypass
     * the body of the closure, so all states reachable via alternative 1 are
     * part of the precedence alternatives of the transformed left-recursive
     * rule.
     * 4. The "primary" portion of a left recursive rule cannot contain an
     * epsilon transition, so the only way an alternative other than 1 can exist
     * in a state that is also reachable via alternative 1 is by nesting calls
     * to the left-recursive rule, with the outer calls not being at the
     * preferred precedence level.
     *
     *
     * The prediction context must be considered by this filter to address
     * situations like the following.
     *
     * `
     * ```
     * grammar TA;
     * prog: statement* EOF;
     * statement: letterA | statement letterA 'b' ;
     * letterA: 'a';
     * ```
     * `
     *
     * If the above grammar, the ATN state immediately before the token
     * reference `'a'` in `letterA` is reachable from the left edge
     * of both the primary and closure blocks of the left-recursive rule
     * `statement`. The prediction context associated with each of these
     * configurations distinguishes between them, and prevents the alternative
     * which stepped out to `prog` (and then back in to `statement`
     * from being eliminated by the filter.
     *
     * @param configs The configuration set computed by
     * {@link computeStartState} as the start state for the DFA.
     * @returns The transformed configuration set representing the start state
     * for a precedence DFA at a particular precedence level (determined by
     * calling {@link Parser//getPrecedence})
     */
    protected applyPrecedenceFilter(configs: ATNConfigSet): ATNConfigSet;
    protected getReachableTarget(trans: Transition, ttype: number): ATNState | null;
    protected getPredsForAmbigAlts(ambigAlts: BitSet, configs: ATNConfigSet, altCount: number): Array<SemanticContext | null> | null;
    protected getPredicatePredictions(ambigAlts: BitSet, altToPred: Array<SemanticContext | null>): PredPrediction[] | null;
    /**
     * This method is used to improve the localization of error messages by
     * choosing an alternative rather than throwing a
     * {@link NoViableAltException} in particular prediction scenarios where the
     * {@link ERROR} state was reached during ATN simulation.
     *
     *
     * The default implementation of this method uses the following
     * algorithm to identify an ATN configuration which successfully parsed the
     * decision entry rule. Choosing such an alternative ensures that the
     * {@link ParserRuleContext} returned by the calling rule will be complete
     * and valid, and the syntax error will be reported later at a more
     * localized location.
     *
     * - If a syntactically valid path or paths reach the end of the decision rule and
     * they are semantically valid if predicated, return the min associated alt.
     * - Else, if a semantically invalid but syntactically valid path exist
     * or paths exist, return the minimum associated alt.
     *
     * - Otherwise, return {@link ATN//INVALID_ALT_NUMBER}.
     *
     *
     * In some scenarios, the algorithm described above could predict an
     * alternative which will result in a {@link FailedPredicateException} in
     * the parser. Specifically, this could occur if the *only* configuration
     * capable of successfully parsing to the end of the decision rule is
     * blocked by a semantic predicate. By choosing this alternative within
     * {@link adaptivePredict} instead of throwing a
     * {@link NoViableAltException}, the resulting
     * {@link FailedPredicateException} in the parser will identify the specific
     * predicate which is preventing the parser from successfully parsing the
     * decision rule, which helps developers identify and correct logic errors
     * in semantic predicates.
     *
     * @param configs The ATN configurations which were valid immediately before
     * the {@link ERROR} state was reached
     * @param outerContext The is the \gamma_0 initial parser context from the paper
     * or the parser stack at the instant before prediction commences.
     *
     * @returns The value to return from {@link adaptivePredict}, or
     * {@link ATN//INVALID_ALT_NUMBER} if a suitable alternative was not
     * identified and {@link adaptivePredict} should report an error instead
     */
    protected getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(configs: ATNConfigSet, outerContext: ParserRuleContext): number;
    protected getAltThatFinishedDecisionEntryRule(configs: ATNConfigSet): number;
    /**
     * Walk the list of configurations and split them according to
     * those that have preds evaluating to true/false.  If no pred, assume
     * true pred and include in succeeded set.  Returns Pair of sets.
     *
     * Create a new set so as not to alter the incoming parameter.
     *
     * Assumption: the input stream has been restored to the starting point
     * prediction, which is where predicates need to evaluate.
     */
    protected splitAccordingToSemanticValidity(configs: ATNConfigSet, outerContext: ParserRuleContext): [ATNConfigSet, ATNConfigSet];
    /**
     * Look through a list of predicate/alt pairs, returning alts for the
     * pairs that win. A `NONE` predicate indicates an alt containing an
     * unpredicated config which behaves as "always true." If !complete
     * then we stop at the first predicate that evaluates to true. This
     * includes pairs with null predicates.
     */
    protected evalSemanticContext(predPredictions: PredPrediction[], outerContext: ParserRuleContext, complete: boolean): BitSet;
    protected closure(config: ATNConfig, configs: ATNConfigSet, closureBusy: HashSet<ATNConfig>, collectPredicates: boolean, fullCtx: boolean, treatEofAsEpsilon: boolean): void;
    protected closureCheckingStopState(config: ATNConfig, configs: ATNConfigSet, closureBusy: HashSet<ATNConfig>, collectPredicates: boolean, fullCtx: boolean, depth: number, treatEofAsEpsilon: boolean): void;
    protected closure_(config: ATNConfig, configs: ATNConfigSet, closureBusy: HashSet<ATNConfig>, collectPredicates: boolean, fullCtx: boolean, depth: number, treatEofAsEpsilon: boolean): void;
    protected canDropLoopEntryEdgeInLeftRecursiveRule(config: ATNConfig): boolean;
    protected getEpsilonTarget(config: ATNConfig, t: Transition, collectPredicates: boolean, inContext: boolean, fullCtx: boolean, treatEofAsEpsilon: boolean): ATNConfig | null;
    protected precedenceTransition(config: ATNConfig, pt: PrecedencePredicateTransition, collectPredicates: boolean, inContext: boolean, fullCtx: boolean): ATNConfig | null;
    protected predTransition(config: ATNConfig, pt: PredicateTransition, collectPredicates: boolean, inContext: boolean, fullCtx: boolean): ATNConfig | null;
    protected ruleTransition(config: ATNConfig, t: RuleTransition): ATNConfig;
    protected getConflictingAlts(configs: ATNConfigSet): BitSet;
    /**
     * Sam pointed out a problem with the previous definition, v3, of
     * ambiguous states. If we have another state associated with conflicting
     * alternatives, we should keep going. For example, the following grammar
     *
     * s : (ID | ID ID?) ';' ;
     *
     * When the ATN simulation reaches the state before ';', it has a DFA
     * state that looks like: [12|1|[], 6|2|[], 12|2|[]]. Naturally
     * 12|1|[] and 12|2|[] conflict, but we cannot stop processing this node
     * because alternative to has another way to continue, via [6|2|[]].
     * The key is that we have a single state that has config's only associated
     * with a single alternative, 2, and crucially the state transitions
     * among the configurations are all non-epsilon transitions. That means
     * we don't consider any conflicts that include alternative 2. So, we
     * ignore the conflict between alts 1 and 2. We ignore a set of
     * conflicting alts when there is an intersection with an alternative
     * associated with a single alt state in the state -> config-list map.
     *
     * It's also the case that we might have two conflicting configurations but
     * also a 3rd nonconflicting configuration for a different alternative:
     * [1|1|[], 1|2|[], 8|3|[]]. This can come about from grammar:
     *
     * a : A | A | A B ;
     *
     * After matching input A, we reach the stop state for rule A, state 1.
     * State 8 is the state right before B. Clearly alternatives 1 and 2
     * conflict and no amount of further lookahead will separate the two.
     * However, alternative 3 will be able to continue and so we do not
     * stop working on this state. In the previous example, we're concerned
     * with states associated with the conflicting alternatives. Here alt
     * 3 is not associated with the conflicting configs, but since we can continue
     * looking for input reasonably, I don't declare the state done. We
     * ignore a set of conflicting alts when we have an alternative
     * that we still need to pursue
     */
    protected getConflictingAltsOrUniqueAlt(configs: ATNConfigSet): BitSet | null;
    protected noViableAlt(input: TokenStream, outerContext: ParserRuleContext, configs: ATNConfigSet, startIndex: number): NoViableAltException;
    /**
     * Add an edge to the DFA, if possible. This method calls
     * {@link addDFAState} to ensure the `to` state is present in the
     * DFA. If `from` is `null`, or if `t` is outside the
     * range of edges that can be represented in the DFA tables, this method
     * returns without adding the edge to the DFA.
     *
     * If `to` is `null`, this method returns `null`.
     * Otherwise, this method returns the {@link DFAState} returned by calling
     * {@link addDFAState} for the `to` state.
     *
     * @param dfa The DFA
     * @param from The source state for the edge
     * @param t The input symbol
     * @param to The target state for the edge
     *
     * @returns If `to` is `null`, this method returns `null`;
     * otherwise this method returns the result of calling {@link addDFAState}
     * on `to`
     */
    protected addDFAEdge(dfa: DFA, from: DFAState, t: number, to: DFAState): DFAState | null;
    /**
     * Add state `D` to the DFA if it is not already present, and return
     * the actual instance stored in the DFA. If a state equivalent to `D`
     * is already in the DFA, the existing state is returned. Otherwise this
     * method returns `D` after adding it to the DFA.
     *
     * If `D` is {@link ERROR}, this method returns {@link ERROR} and
     * does not change the DFA.
     *
     * @param dfa The dfa.
     * @param newState The DFA state to add.
     *
     * @returns The state stored in the DFA. This will be either the existing state if `newState` is already in
     *          the DFA, or `newState` itself if the state was not already present.
     */
    protected addDFAState(dfa: DFA, newState: DFAState): DFAState;
    protected reportAttemptingFullContext(dfa: DFA, conflictingAlts: BitSet, configs: ATNConfigSet, startIndex: number, stopIndex: number): void;
    protected reportContextSensitivity(dfa: DFA, prediction: number, configs: ATNConfigSet, startIndex: number, stopIndex: number): void;
    protected reportAmbiguity(dfa: DFA, D: DFAState, startIndex: number, stopIndex: number, exact: boolean, ambigAlts: BitSet | undefined, configs: ATNConfigSet): void;
}
export {};
