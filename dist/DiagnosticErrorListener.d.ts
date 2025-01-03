import { BaseErrorListener } from "./BaseErrorListener";
import { Parser } from "./Parser";
import { ATNConfigSet } from "./atn/ATNConfigSet";
import { DFA } from "./dfa/DFA";
import { BitSet } from "./misc/BitSet";
/**
 * This implementation of {@link ANTLRErrorListener} can be used to identify
 * certain potential correctness and performance problems in grammars. "Reports"
 * are made by calling {@link Parser#notifyErrorListeners} with the appropriate
 * message.
 *
 * - <b>Ambiguities</b>: These are cases where more than one path through the
 * grammar can match the input.
 * - <b>Weak context sensitivity</b>: These are cases where full-context
 * prediction resolved an SLL conflict to a unique alternative which equaled the
 * minimum alternative of the SLL conflict.
 * - <b>Strong (forced) context sensitivity</b>: These are cases where the
 * full-context prediction resolved an SLL conflict to a unique alternative,
 * and* the minimum alternative of the SLL conflict was found to not be
 * a truly viable alternative. Two-stage parsing cannot be used for inputs where
 * this situation occurs.
 *
 * @author Sam Harwell
 */
export declare class DiagnosticErrorListener extends BaseErrorListener {
    /**
     * When `true`, only exactly known ambiguities are reported.
     */
    protected readonly exactOnly: boolean;
    /**
     * Initializes a new instance of {@link DiagnosticErrorListener} which only
     * reports exact ambiguities.
     */
    constructor();
    /**
     * Initializes a new instance of {@link DiagnosticErrorListener}, specifying
     * whether all ambiguities or only exact ambiguities are reported.
     *
     * @param exactOnly `true` to report only exact ambiguities, otherwise
     * `false` to report all ambiguities.
     */
    constructor(exactOnly: boolean);
    reportAmbiguity: (recognizer: Parser, dfa: DFA, startIndex: number, stopIndex: number, exact: boolean, ambigAlts: BitSet | undefined, configs: ATNConfigSet) => void;
    reportAttemptingFullContext: (recognizer: Parser, dfa: DFA, startIndex: number, stopIndex: number, _conflictingAlts: BitSet | undefined, _configs: ATNConfigSet | null) => void;
    reportContextSensitivity: (recognizer: Parser, dfa: DFA, startIndex: number, stopIndex: number, _prediction: number, _configs: ATNConfigSet | null) => void;
    protected getDecisionDescription: (recognizer: Parser, dfa: DFA) => string;
    /**
     * Computes the set of conflicting or ambiguous alternatives from a
     * configuration set, if that information was not already provided by the
     * parser.
     *
     * @param reportedAlts The set of conflicting or ambiguous alternatives, as
     * reported by the parser.
     * @param configs The conflicting or ambiguous configuration set.
     * @returns Returns `reportedAlts` if it is not `null`, otherwise
     * returns the set of alternatives represented in `configs`.
     */
    protected getConflictingAlts: (reportedAlts: BitSet | undefined, configs: ATNConfigSet) => BitSet | null;
}
