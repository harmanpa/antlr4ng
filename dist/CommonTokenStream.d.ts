import { Token } from "./Token";
import { BufferedTokenStream } from "./BufferedTokenStream";
import { TokenSource } from "./TokenSource";
/**
 * This class extends {@link BufferedTokenStream} with functionality to filter
 * token streams to tokens on a particular channel (tokens where
 * {@link Token.getChannel} returns a particular value).
 *
 * This token stream provides access to all tokens by index or when calling
 * methods like {@link getText}. The channel filtering is only used for code
 * accessing tokens via the lookahead methods {@link LA}, {@link LT}, and
 * {@link LB}.
 *
 * By default, tokens are placed on the default channel
 * ({@link Token.DEFAULT_CHANNEL}), but may be reassigned by using the
 * `->channel(HIDDEN)` lexer command, or by using an embedded action to
 * call {@link Lexer.setChannel}.
 *
 *
 * Note: lexer rules which use the `->skip` lexer command or call
 * {@link Lexer.skip} do not produce tokens at all, so input text matched by
 * such a rule will not be available as part of the token stream, regardless of
 * channel.
 */
export declare class CommonTokenStream extends BufferedTokenStream {
    /**
     * Specifies the channel to use for filtering tokens.
     *
     *
     * The default value is {@link Token.DEFAULT_CHANNEL}, which matches the
     * default channel assigned to tokens created by the lexer.
     */
    protected channel: number;
    constructor(lexer: TokenSource, channel?: number);
    adjustSeekIndex(i: number): number;
    LB(k: number): Token | null;
    LT(k: number): Token | null;
    getNumberOfOnChannelTokens(): number;
}
