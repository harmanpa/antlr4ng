import { CharStream } from "./CharStream";
import { CommonToken } from "./CommonToken";
import { TokenFactory } from "./TokenFactory";
import { TokenSource } from "./TokenSource";
/**
 * This default implementation of {@link TokenFactory} creates {@link CommonToken} objects.
 */
export declare class CommonTokenFactory implements TokenFactory<CommonToken> {
    /**
     * The default {@link CommonTokenFactory} instance.
     *
     *
     * This token factory does not explicitly copy token text when constructing
     * tokens.
     */
    static readonly DEFAULT: CommonTokenFactory;
    /**
     * Indicates whether {@link CommonToken.setText} should be called after
     * constructing tokens to explicitly set the text. This is useful for cases
     * where the input stream might not be able to provide arbitrary substrings
     * of text from the input after the lexer creates a token (e.g. the
     * implementation of {@link CharStream.getText} in
     * {@link UnbufferedCharStream} throws an
     * {@link UnsupportedOperationException}). Explicitly setting the token text
     * allows {@link Token.getText} to be called at any time regardless of the
     * input stream implementation.
     *
     *
     * The default value is `false` to avoid the performance and memory
     * overhead of copying text for every token unless explicitly requested.
     */
    protected readonly copyText: boolean;
    constructor(copyText?: boolean);
    create(source: [TokenSource | null, CharStream | null], type: number, text: string | undefined, channel: number, start: number, stop: number, line: number, column: number): CommonToken;
}
