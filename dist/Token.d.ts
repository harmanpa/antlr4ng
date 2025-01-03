import { type CharStream } from "./CharStream";
import { type TokenSource } from "./TokenSource";
/**
 * A token has properties: text, type, line, character position in the line
 * (so we can ignore tabs), token channel, index, and source from which
 * we obtained this token.
 */
export interface Token {
    /**
     * Get the text of the token.
     */
    text?: string;
    /** Get the token type of the token */
    type: number;
    /**
     * The line number on which the 1st character of this token was matched,
     *  line=1..n
     */
    line: number;
    /**
     * The index of the first character of this token relative to the
     *  beginning of the line at which it occurs, 0..n-1
     */
    column: number;
    /**
     * Return the channel of this token. Each token can arrive at the parser
     * on a different channel, but the parser only "tunes" to a single channel.
     * The parser ignores everything not on DEFAULT_CHANNEL.
     */
    channel: number;
    /**
     * An index from 0..n-1 of the token object in the input stream.
     *  This must be valid in order to print token streams and
     *  use TokenRewriteStream.
     *
     *  Return -1 to indicate that this token was conjured up since
     *  it doesn't have a valid index.
     */
    tokenIndex: number;
    /**
     * The starting character index of the token
     *  This method is optional; return -1 if not implemented.
     */
    start: number;
    /**
     * The last character index of the token.
     *  This method is optional; return -1 if not implemented.
     */
    stop: number;
    /**
      Gets the {@link TokenSource} which created this token.
     */
    get tokenSource(): TokenSource | null;
    /**
     * Gets or sets the {@link CharStream} from which this token was derived.
     */
    inputStream: CharStream | null;
}
export declare namespace Token {
    const INVALID_TYPE: number;
    /**
     * During lookahead operations, this "token" signifies we hit rule end ATN state
     * and did not follow it despite needing to.
     */
    const EPSILON: number;
    const MIN_USER_TOKEN_TYPE: number;
    const EOF: number;
    /**
     * All tokens go to the parser (unless skip() is called in that rule)
     * on a particular "channel". The parser tunes to a particular channel
     * so that whitespace etc... can go to the parser on a "hidden" channel.
     */
    const DEFAULT_CHANNEL: number;
    /**
     * Anything on different channel than DEFAULT_CHANNEL is not parsed
     * by parser.
     */
    const HIDDEN_CHANNEL: number;
    /**
     * This is the minimum constant value which can be assigned to a
     * user-defined token channel.
     *
     *
     * The non-negative numbers less than {@link MIN_USER_CHANNEL_VALUE} are
     * assigned to the predefined channels {@link DEFAULT_CHANNEL} and
     * {@link HIDDEN_CHANNEL}.
     *
     * @see Token.getChannel()
     */
    const MIN_USER_CHANNEL_VALUE: number;
}
export declare const isToken: (candidate: unknown) => candidate is Token;
