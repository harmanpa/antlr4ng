import type { CharStream } from "./CharStream";
import { Token } from "./Token";
import type { TokenFactory } from "./TokenFactory";
import type { TokenSource } from "./TokenSource";
/**
 * Provides an implementation of {@link TokenSource} as a wrapper around a list
 * of {@link Token} objects.
 *
 * If the final token in the list is an {@link Token#EOF} token, it will be used
 * as the EOF token for every call to {@link #nextToken} after the end of the
 * list is reached. Otherwise, an EOF token will be created.
 */
export declare class ListTokenSource implements TokenSource {
    /**
     * The name of the input source. If this value is `null`, a call to
     * {@link #getSourceName} should return the source name used to create the
     * the next token in {@link #tokens} (or the previous token if the end of
     * the input has been reached).
     */
    readonly sourceName: string;
    tokenFactory: TokenFactory<Token>;
    /**
     * The wrapped collection of {@link Token} objects to return.
     */
    protected readonly tokens: Token[];
    /**
     * The index into {@link tokens} of token to return by the next call to
     * {@link #nextToken}. The end of the input is indicated by this value
     * being greater than or equal to the number of items in {@link #tokens}.
     */
    protected i: number;
    /**
     * This field caches the EOF token for the token source.
     */
    protected eofToken: Token | null;
    /**
     * Constructs a new {@link ListTokenSource} instance from the specified
     * collection of {@link Token} objects.
     *
     * @param tokens The collection of {@link Token} objects to provide as a
     * {@link TokenSource}.
     * @throws NullPointerException if `tokens` is `null`
     */
    constructor(tokens: Token[]);
    /**
     * Constructs a new {@link ListTokenSource} instance from the specified
     * collection of {@link Token} objects and source name.
     *
     * @param tokens The collection of {@link Token} objects to provide as a
     * {@link TokenSource}.
     * @param sourceName The name of the {@link TokenSource}. If this value is
     * `null`, {@link #getSourceName} will attempt to infer the name from
     * the next {@link Token} (or the previous token if the end of the input has
     * been reached).
     *
     * @throws NullPointerException if `tokens` is `null`
     */
    constructor(tokens: Token[], sourceName: string);
    get column(): number;
    nextToken(): Token;
    get line(): number;
    get inputStream(): CharStream | null;
    getSourceName(): string;
}
