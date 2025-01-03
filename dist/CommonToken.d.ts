import { CharStream } from "./CharStream";
import { Recognizer } from "./Recognizer";
import { Token } from "./Token";
import { TokenSource } from "./TokenSource";
import { WritableToken } from "./WritableToken";
import { ATNSimulator } from "./atn/ATNSimulator";
export declare class CommonToken implements WritableToken {
    #private;
    /**
     * An empty tuple which is used as the default value of
     * {@link source} for tokens that do not have a source.
     */
    static readonly EMPTY_SOURCE: [TokenSource | null, CharStream | null];
    /**
     * These properties share a field to reduce the memory footprint of
     * {@link CommonToken}. Tokens created by a {@link CommonTokenFactory} from
     * the same source and input stream share a reference to the same
     * {@link Pair} containing these values.
     */
    source: [TokenSource | null, CharStream | null];
    tokenIndex: number;
    start: number;
    stop: number;
    /**
     * This is the backing field for {@link #getType} and {@link #setType}.
     */
    type: number;
    /**
     * The (one-based) line number on which the 1st character of this token was.
     */
    line: number;
    /**
     * The zero-based index of the first character position in its line.
     */
    column: number;
    /**
     * The token's channel.
     */
    channel: number;
    protected constructor(details: {
        source: [TokenSource | null, CharStream | null];
        type: number;
        channel?: number;
        start?: number;
        stop?: number;
        text?: string;
        line?: number;
        tokenIndex?: number;
        column?: number;
    });
    /**
     * Constructs a new {@link CommonToken} as a copy of another {@link Token}.
     *
     * If `token` is also a {@link CommonToken} instance, the newly
     * constructed token will share a reference to the {@link #text} field and
     * the {@link Pair} stored in {@link source}. Otherwise, {@link text} will
     * be assigned the result of calling {@link getText}, and {@link source}
     * will be constructed from the result of {@link Token.getTokenSource} and
     * {@link Token#getInputStream}.
     *
     * @param token The token to copy.
     */
    static fromToken(token: Token): CommonToken;
    /**
     * Constructs a new {@link CommonToken} with the specified token type and text.
     *
     * @param type The token type.
     * @param text The text of the token.
     */
    static fromType(type: number, text?: string): CommonToken;
    static fromSource(source: [TokenSource | null, CharStream | null], type: number, channel: number, start: number, stop: number): CommonToken;
    get tokenSource(): TokenSource | null;
    get inputStream(): CharStream | null;
    set inputStream(input: CharStream | null);
    /**
     * Constructs a new {@link CommonToken} as a copy of another {@link Token}.
     *
     * If `oldToken` is also a {@link CommonToken} instance, the newly
     * constructed token will share a reference to the {@link text} field and
     * the {@link Pair} stored in {@link source}. Otherwise, {@link text} will
     * be assigned the result of calling {@link getText}, and {@link source}
     * will be constructed from the result of {@link Token.getTokenSource} and
     * {@link Token.getInputStream}.
     */
    clone(): CommonToken;
    toString(recognizer?: Recognizer<ATNSimulator>): string;
    get text(): string | undefined;
    set text(text: string | undefined);
    setText(text: string): void;
    setType(ttype: number): void;
    setLine(line: number): void;
    setCharPositionInLine(pos: number): void;
    setChannel(channel: number): void;
    setTokenIndex(index: number): void;
}
