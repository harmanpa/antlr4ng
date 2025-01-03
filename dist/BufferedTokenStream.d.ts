import { Token } from "./Token";
import { Interval } from "./misc/Interval";
import { TokenStream } from "./TokenStream";
import { TokenSource } from "./TokenSource";
import { ParserRuleContext } from "./ParserRuleContext";
/**
 * This implementation of {@link TokenStream} loads tokens from a
 * {@link TokenSource} on-demand, and places the tokens in a buffer to provide
 * access to any previous token by index.
 *
 * This token stream ignores the value of {@link Token.getChannel}. If your
 * parser requires the token stream filter tokens to only those on a particular
 * channel, such as {@link Token.DEFAULT_CHANNEL} or
 * {@link Token.HIDDEN_CHANNEL}, use a filtering token stream such a {@link CommonTokenStream}.
 */
export declare class BufferedTokenStream implements TokenStream {
    /**
     * The {@link TokenSource} from which tokens for this stream are fetched.
     */
    tokenSource: TokenSource;
    /**
     * A collection of all tokens fetched from the token source. The list is
     * considered a complete view of the input once {@link fetchedEOF} is set
     * to `true`.
     */
    protected tokens: Token[];
    /**
     * The index into {@link tokens} of the current token (next token to
     * {@link consume}). {@link tokens}`[p]` should be
     * {@link LT LT(1)}.
     *
     * This field is set to -1 when the stream is first constructed or when
     * {@link setTokenSource} is called, indicating that the first token has
     * not yet been fetched from the token source. For additional information,
     * see the documentation of {@link IntStream} for a description of
     * Initializing Methods.
     */
    protected p: number;
    /**
     * Indicates whether the {@link Token.EOF} token has been fetched from
     * {@link tokenSource} and added to {@link tokens}. This field improves
     * performance for the following cases:
     *
     * - {@link consume}: The lookahead check in {@link consume} to prevent
     * consuming the EOF symbol is optimized by checking the values of
     * {@link fetchedEOF} and {@link p} instead of calling {@link LA}.
     * - {@link fetch}: The check to prevent adding multiple EOF symbols into
     * {@link tokens} is trivial with this field.
     */
    protected fetchedEOF: boolean;
    constructor(tokenSource: TokenSource);
    mark(): number;
    release(_marker: number): void;
    reset(): void;
    seek(index: number): void;
    get size(): number;
    get index(): number;
    get(index: number): Token;
    consume(): void;
    /**
     * Make sure index `i` in tokens has a token.
     *
     * @returns {boolean} `true` if a token is located at index `i`, otherwise `false`.
     */
    sync(i: number): boolean;
    /**
     * Add `n` elements to buffer.
     *
     * @returns {number} The actual number of elements added to the buffer.
     */
    fetch(n: number): number;
    /** Get all tokens from start..stop, inclusively. */
    getTokens(start?: number, stop?: number, types?: Set<number>): Token[];
    LA(k: number): number;
    LB(k: number): Token | null;
    LT(k: number): Token | null;
    /**
     * Allowed derived classes to modify the behavior of operations which change
     * the current stream position by adjusting the target token index of a seek
     * operation. The default implementation simply returns `i`. If an
     * exception is thrown in this method, the current stream index should not be
     * changed.
     *
     * For example, {@link CommonTokenStream} overrides this method to ensure that
     * the seek target is always an on-channel token.
     *
     * @param  i The target token index.
     *
     * @returns The adjusted target token index.
     */
    adjustSeekIndex(i: number): number;
    lazyInit(): void;
    setup(): void;
    /** Reset this token stream by setting its token source. */
    setTokenSource(tokenSource: TokenSource): void;
    /**
     * Given a starting index, return the index of the next token on channel.
     * Return i if tokens[i] is on channel. Return -1 if there are no tokens
     * on channel between i and EOF.
     */
    nextTokenOnChannel(i: number, channel: number): number;
    /**
     * Given a starting index, return the index of the previous token on
     * channel. Return `i` if `tokens[i]` is on channel. Return -1
     * if there are no tokens on channel between `i` and 0.
     *
     * If `i` specifies an index at or after the EOF token, the EOF token
     * index is returned. This is due to the fact that the EOF token is treated
     * as though it were on every channel.
     */
    previousTokenOnChannel(i: number, channel: number): number;
    /**
     * Collect all tokens on specified channel to the right of
     * the current token up until we see a token on DEFAULT_TOKEN_CHANNEL or
     * EOF. If channel is -1, find any non default channel token.
     */
    getHiddenTokensToRight(tokenIndex: number, channel: number): Token[] | undefined;
    /**
     * Collect all tokens on specified channel to the left of
     * the current token up until we see a token on DEFAULT_TOKEN_CHANNEL.
     * If channel is -1, find any non default channel token.
     */
    getHiddenTokensToLeft(tokenIndex: number, channel: number): Token[] | undefined;
    filterForChannel(left: number, right: number, channel: number): Token[] | undefined;
    getSourceName(): string;
    /** Get the text of all tokens in this buffer. */
    getText(): string;
    getTextFromInterval(interval: Interval): string;
    getTextFromContext(ctx: ParserRuleContext): string;
    getTextFromRange(start: Token | null, stop: Token | null): string;
    /** Get all tokens from lexer until EOF. */
    fill(): void;
}
