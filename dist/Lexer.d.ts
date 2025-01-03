import { Token } from "./Token";
import { Recognizer } from "./Recognizer";
import { RecognitionException } from "./RecognitionException";
import { LexerNoViableAltException } from "./LexerNoViableAltException";
import { LexerATNSimulator } from "./atn/LexerATNSimulator";
import { CharStream } from "./CharStream";
import { TokenFactory } from "./TokenFactory";
import { TokenSource } from "./TokenSource";
/**
 * Options used during lexer execution.
 */
export interface LexerOptions {
    /**
     * A DFA edge is a DFA state set in the edge cache of another DFA state to quickly look up the next state
     * for a given input symbol (usually a Unicode codepoint). This speeds up the performance of the lexer at the cost
     * of memory. The edge cache is a sparse array, so the actual memory usage is proportional to the number of
     * unique input symbols.
     *
     * For input symbols outside of the specified range, the lexer will always use the full computation to determine
     * the next state. The same is true for lexer rules with predicates, since the next state is not known until the
     * predicate is evaluated.
     *
     * The min DFA edge is 0 by default.
     */
    minDFAEdge: number;
    /**
     * This is the upper bound of the edge cache. Only input symbols smaller than this value are cached.
     * The default value is 256, which encompasses the entire ASCII range, but leaves most of the other Unicode
     * codepoints uncached. If you need to parse other languages instead of Latin, you can set the min and max
     * edge values to Unicode block ranges that cover that particular language.
     */
    maxDFAEdge: number;
    /** The minimum input symbol value that is allowed. The default value is 0. */
    minCodePoint: number;
    /**
     * The maximum input value that is allowed. The default value is 0x10FFFF (the full Unicode range).
     * Values outside of this range will be treated as invalid input and will cause the lexer to throw an error.
     */
    maxCodePoint: number;
}
/**
 * A lexer is recognizer that draws input symbols from a character stream.
 * lexer grammars result in a subclass of this object. A Lexer object
 * uses simplified match() and error recovery mechanisms in the interest of speed.
 */
export declare abstract class Lexer extends Recognizer<LexerATNSimulator> implements TokenSource {
    #private;
    static readonly DEFAULT_MODE = 0;
    static readonly MORE = -2;
    static readonly SKIP = -3;
    static readonly DEFAULT_TOKEN_CHANNEL: number;
    static readonly HIDDEN: number;
    readonly options: LexerOptions;
    /**
     * What character index in the stream did the current token start at?
     *  Needed, for example, to get the text for current token.  Set at
     *  the start of nextToken.
     */
    tokenStartCharIndex: number;
    /** The channel number for the current token */
    channel: number;
    /** The token type for the current token */
    type: number;
    mode: number;
    /** The start column of the current token (the one that was last read by `nextToken`). */
    protected currentTokenColumn: number;
    /**
     * The line on which the first character of the current token (the one that was last read by `nextToken`) resides.
     */
    protected currentTokenStartLine: number;
    constructor(input: CharStream, options?: Partial<LexerOptions>);
    reset(seekBack?: boolean): void;
    /** @returns a token from this source; i.e., match a token on the char stream. */
    nextToken(): Token;
    /**
     * Instruct the lexer to skip creating a token for current lexer rule
     * and look for another token. nextToken() knows to keep looking when
     * a lexer rule finishes with token set to SKIP_TOKEN. Recall that
     * if token==null at end of any token rule, it creates one for you
     * and emits it.
     */
    skip(): void;
    more(): void;
    pushMode(m: number): void;
    popMode(): number;
    get modeStack(): number[];
    /**
     * By default does not support multiple emits per nextToken invocation
     * for efficiency reasons. Subclass and override this method, nextToken,
     * and getToken (to push tokens into a list and pull from that list
     * rather than a single variable as this implementation does).
     */
    emitToken(token: Token): void;
    /**
     * The standard method called to automatically emit a token at the
     * outermost lexical rule. The token object should point into the
     * char buffer start..stop. If there is a text override in 'text',
     * use that to set the token's text. Override this method to emit
     * custom Token objects or provide a new factory.
     */
    emit(): Token;
    emitEOF(): Token;
    /** What is the index of the current character of lookahead? */
    getCharIndex(): number;
    /**
     * Return a list of all Token objects in input char stream.
     * Forces load of all tokens. Does not include EOF token.
     */
    getAllTokens(): Token[];
    notifyListeners(e: LexerNoViableAltException): void;
    getErrorDisplay(s: string): string;
    getErrorDisplayForChar(c: string): string;
    getCharErrorDisplay(c: string): string;
    /**
     * Lexers can normally match any char in it's vocabulary after matching
     * a token, so do the easy thing and just kill a character and hope
     * it all works out. You can instead use the rule invocation stack
     * to do sophisticated error recovery if you are in a fragment rule.
     */
    recover(re: LexerNoViableAltException | RecognitionException): void;
    get inputStream(): CharStream;
    set inputStream(input: CharStream);
    set tokenFactory(factory: TokenFactory<Token>);
    get tokenFactory(): TokenFactory<Token>;
    get sourceName(): string;
    get line(): number;
    set line(line: number);
    get column(): number;
    set column(column: number);
    get text(): string;
    set text(text: string);
}
