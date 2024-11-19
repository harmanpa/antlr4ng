import { type Parser } from "./Parser";
import { type RecognitionException } from "./RecognitionException";
import { type Recognizer } from "./Recognizer";
import { type ATNConfigSet } from "./atn/ATNConfigSet";
import { type DFA } from "./dfa/DFA";
import { type ATNSimulator } from "./atn/ATNSimulator";
import { type Token } from "./Token";
import { type BitSet } from "./misc/BitSet";
/** How to emit recognition errors. */
export interface ANTLRErrorListener {
    /**
     * Upon syntax error, notify any interested parties. This is not how to
     * recover from errors or compute error messages. {@link ANTLRErrorStrategy}
     * specifies how to recover from syntax errors and how to compute error
     * messages. This listener's job is simply to emit a computed message,
     * though it has enough information to create its own message in many cases.
     *
     * The {@link RecognitionException} is non-null for all syntax errors except
     * when we discover mismatched token errors that we can recover from
     * in-line, without returning from the surrounding rule (via the single
     * token insertion and deletion mechanism).
     *
     * @param recognizer
     *        What parser got the error. From this
     * 		  object, you can access the context as well
     * 		  as the input stream.
     * @param offendingSymbol
     *        The offending token in the input token
     * 		  stream, unless recognizer is a lexer (then it's null). If
     * 		  no viable alternative error, `e` has token at which we
     * 		  started production for the decision.
     * @param line
     * 		  The line number in the input where the error occurred.
     * @param charPositionInLine
     * 		  The character position within that line where the error occurred.
     * @param msg
     * 		  The message to emit.
     * @param e
     *        The exception generated by the parser that led to
     *        the reporting of an error. It is null in the case where
     *        the parser was able to recover in line without exiting the
     *        surrounding rule.
     */
    syntaxError<S extends Token, T extends ATNSimulator>(recognizer: Recognizer<T>, offendingSymbol: S | null, line: number, charPositionInLine: number, msg: string, e: RecognitionException | null): void;
    /**
     * This method is called by the parser when a full-context prediction results in an ambiguity.
     *
     * Each full-context prediction which does not result in a syntax error
     * will call either {@link reportContextSensitivity} or {@link reportAmbiguity}.
     *
     * When `ambigAlts` is not null, it contains the set of potentially
     * viable alternatives identified by the prediction algorithm. When
     * `ambigAlts` is null, use {@link ATNConfigSet#getAlts} to obtain the
     * represented alternatives from the `configs` argument.
     *
     * When `exact` is `true`, *all* of the potentially
     * viable alternatives are truly viable, i.e. this is reporting an exact
     * ambiguity. When `exact` is `false`, *at least two* of
     * the potentially viable alternatives are viable for the current input, but
     * the prediction algorithm terminated as soon as it determined that at
     * least the *minimum* potentially viable alternative is truly
     * viable.
     *
     * When the {@link PredictionMode.LL_EXACT_AMBIG_DETECTION} prediction
     * mode is used, the parser is required to identify exact ambiguities so
     * `exact` will always be `true`.
     *
     * This method is not used by lexers.
     *
     * @param recognizer the parser instance
     * @param dfa the DFA for the current decision
     * @param startIndex the input index where the decision started
     * @param stopIndex the input input where the ambiguity was identified
     * @param exact `true` if the ambiguity is exactly known, otherwise
     * `false`. This is always `true` when
     * {@link PredictionMode.LL_EXACT_AMBIG_DETECTION} is used.
     * @param ambigAlts the potentially ambiguous alternatives, or `null`
     * to indicate that the potentially ambiguous alternatives are the complete
     * set of represented alternatives in `configs`
     * @param configs the ATN configuration set where the ambiguity was
     * identified
     */
    reportAmbiguity(recognizer: Parser, dfa: DFA, startIndex: number, stopIndex: number, exact: boolean, ambigAlts: BitSet | undefined, configs: ATNConfigSet): void;
    /**
     * This method is called when an SLL conflict occurs and the parser is about
     * to use the full context information to make an LL decision.
     *
     * If one or more configurations in `configs` contains a semantic
     * predicate, the predicates are evaluated before this method is called. The
     * subset of alternatives which are still viable after predicates are
     * evaluated is reported in `conflictingAlts`.
     *
     * This method is not used by lexers.
     *
     * @param recognizer the parser instance
     * @param dfa the DFA for the current decision
     * @param startIndex the input index where the decision started
     * @param stopIndex the input index where the SLL conflict occurred
     * @param conflictingAlts The specific conflicting alternatives. If this is
     * `null`, the conflicting alternatives are all alternatives
     * represented in `configs`. At the moment, conflictingAlts is non-null
     * (for the reference implementation, but Sam's optimized version can see this
     * as null).
     * @param configs the ATN configuration set where the SLL conflict was
     * detected
     */
    reportAttemptingFullContext(recognizer: Parser, dfa: DFA, startIndex: number, stopIndex: number, conflictingAlts: BitSet | undefined, configs: ATNConfigSet): void;
    /**
     * This method is called by the parser when a full-context prediction has a
     * unique result.
     *
     * Each full-context prediction which does not result in a syntax error
     * will call either {@link reportContextSensitivity} or
     * {@link #reportAmbiguity}.
     *
     * For prediction implementations that only evaluate full-context
     * predictions when an SLL conflict is found (including the default
     * {@link ParserATNSimulator} implementation), this method reports cases
     * where SLL conflicts were resolved to unique full-context predictions,
     * i.e. the decision was context-sensitive. This report does not necessarily
     * indicate a problem, and it may appear even in completely unambiguous
     * grammars.
     *
     * `configs` may have more than one represented alternative if the
     * full-context prediction algorithm does not evaluate predicates before
     * beginning the full-context prediction. In all cases, the final prediction
     * is passed as the `prediction` argument.
     *
     * Note that the definition of "context sensitivity" in this method
     * differs from the concept in {@link DecisionInfo.contextSensitivities}.
     * This method reports all instances where an SLL conflict occurred but LL
     * parsing produced a unique result, whether or not that unique result
     * matches the minimum alternative in the SLL conflicting set.
     *
     * This method is not used by lexers.
     *
     * @param recognizer the parser instance
     * @param dfa the DFA for the current decision
     * @param startIndex the input index where the decision started
     * @param stopIndex the input index where the context sensitivity was
     * finally determined
     * @param prediction the unambiguous result of the full-context prediction
     * @param configs the ATN configuration set where the unambiguous prediction
     * was determined
     */
    reportContextSensitivity(recognizer: Parser, dfa: DFA, startIndex: number, stopIndex: number, prediction: number, configs: ATNConfigSet): void;
}
