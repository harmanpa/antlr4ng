import { CharStream } from "./CharStream";
import { ParserRuleContext } from "./ParserRuleContext";
import { Recognizer } from "./Recognizer";
import { Token } from "./Token";
import { TokenStream } from "./TokenStream";
import { ATNSimulator } from "./atn/ATNSimulator";
import { IntervalSet } from "./misc/IntervalSet";
export interface IExceptionParams {
    message: string;
    recognizer: Recognizer<ATNSimulator> | null;
    input: CharStream | TokenStream | null;
    ctx: ParserRuleContext | null;
}
/**
 * The root of the ANTLR exception hierarchy. In general, ANTLR tracks just
 * 3 kinds of errors: prediction errors, failed predicate errors, and
 * mismatched input errors. In each case, the parser knows where it is
 * in the input, where it is in the ATN, the rule invocation stack,
 * and what kind of problem occurred.
 */
export declare class RecognitionException extends Error {
    ctx: ParserRuleContext | null;
    /**
     * The current {@link Token} when an error occurred. Since not all streams
     * support accessing symbols by index, we have to track the {@link Token}
     * instance itself
     */
    offendingToken: Token | null;
    /**
     * Get the ATN state number the parser was in at the time the error
     * occurred. For {@link NoViableAltException} and
     * {@link LexerNoViableAltException} exceptions, this is the
     * {@link DecisionState} number. For others, it is the state whose outgoing
     * edge we couldn't match.
     */
    offendingState: number;
    protected recognizer: Recognizer<ATNSimulator> | null;
    protected input: CharStream | TokenStream | null;
    constructor(params: IExceptionParams);
    /**
     * Gets the set of input symbols which could potentially follow the
     * previously matched symbol at the time this exception was thrown.
     *
     * If the set of expected tokens is not known and could not be computed,
     * this method returns `null`.
     *
     * @returns The set of token types that could potentially follow the current
     * state in the ATN, or `null` if the information is not available.
     */
    getExpectedTokens(): IntervalSet | null;
    toString(): string;
}
