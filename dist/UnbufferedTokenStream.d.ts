import type { ParserRuleContext } from "./ParserRuleContext";
import { Token } from "./Token";
import type { TokenSource } from "./TokenSource";
import type { TokenStream } from "./TokenStream";
import { Interval } from "./misc/Interval";
export declare class UnbufferedTokenStream implements TokenStream {
    readonly tokenSource: TokenSource;
    /**
     * A moving window buffer of the data being scanned. While there's a marker,
     * we keep adding to buffer. Otherwise, {@link #consume consume()} resets so
     * we start filling at index 0 again.
     */
    protected tokens: Token[];
    /**
     * The number of tokens currently in {@link #tokens tokens}.
     *
     * This is not the buffer capacity, that's `tokens.length`.
     */
    protected n: number;
    /**
     * 0..n-1 index into {@link #tokens tokens} of next token.
     *
     * The `LT(1)` token is `tokens[p]`. If `p == n`, we are
     * out of buffered tokens.
     */
    protected p: number;
    /**
     * Count up with {@link #mark mark()} and down with
     * {@link #release release()}. When we `release()` the last mark,
     * `numMarkers` reaches 0 and we reset the buffer. Copy
     * `tokens[p]..tokens[n-1]` to `tokens[0]..tokens[(n-1)-p]`.
     */
    protected numMarkers: number;
    /**
     * This is the `LT(-1)` token for the current position.
     */
    protected lastToken: Token;
    /**
     * When `numMarkers > 0`, this is the `LT(-1)` token for the
     * first token in {@link #tokens}. Otherwise, this is `null`.
     */
    protected lastTokenBufferStart: Token;
    /**
     * Absolute token index. It's the index of the token about to be read via
     * `LT(1)`. Goes from 0 to the number of tokens in the entire stream,
     * although the stream size is unknown before the end is reached.
     *
     * This value is used to set the token indexes if the stream provides tokens
     * that implement {@link WritableToken}.
     */
    protected currentTokenIndex: number;
    constructor(tokenSource: TokenSource, bufferSize?: number);
    get(i: number): Token;
    LT(i: number): Token;
    LA(i: number): number;
    getText(): string;
    getTextFromContext(ctx: ParserRuleContext): string;
    getTextFromInterval(interval: Interval): string;
    getTextFromRange(start: Token, stop: Token): string;
    consume(): void;
    /**
     * Return a marker that we can release later.
     *
     * The specific marker value used for this class allows for some level of
     * protection against misuse where `seek()` is called on a mark or
     * `release()` is called in the wrong order.
     */
    mark(): number;
    release(marker: number): void;
    get index(): number;
    seek(index: number): void;
    get size(): number;
    getSourceName(): string;
    /**
     * Make sure we have 'need' elements from current position {@link #p p}. Last valid
     * `p` index is `tokens.length-1`.  `p+need-1` is the tokens index 'need' elements
     * ahead.  If we need 1 element, `(p+1-1)==p` must be less than `tokens.length`.
     */
    protected sync(want: number): void;
    /**
     * Add `n` elements to the buffer. Returns the number of tokens
     * actually added to the buffer. If the return value is less than `n`,
     * then EOF was reached before `n` tokens could be added.
     */
    protected fill(n: number): number;
    protected add(t: Token): void;
    protected getBufferStartIndex(): number;
}
