import { CommonToken } from "../../CommonToken";
/**
 * A {@link Token} object representing a token of a particular type; e.g.,
 * `<ID>`. These tokens are created for {@link TagChunk} chunks where the
 * tag corresponds to a lexer rule or token type.
 */
export declare class TokenTagToken extends CommonToken {
    readonly tokenName: string;
    /**
     * The name of the label associated with the rule tag, or undefined if this is an unlabeled rule tag.
     */
    readonly label?: string;
    /**
     * Constructs a new instance of {@link TokenTagToken} for an unlabeled tag
     * with the specified token name and type.
     *
     * @param tokenName The token name.
     * @param type The token type.
     */
    constructor(tokenName: string, type: number);
    /**
     * Constructs a new instance of {@link TokenTagToken} with the specified
     * token name, type, and label.
     *
     * @param tokenName The token name.
     * @param type The token type.
     * @param label The label associated with the token tag, or `undefined` if
     * the token tag is unlabeled.
     */
    constructor(tokenName: string, type: number, label: string | undefined);
    /**
     *
     * @returns the token tag formatted with `<` and `>` delimiters.
     */
    get text(): string;
    /**
     * @returns a string of the form `tokenName:type`.
     */
    toString(): string;
}
