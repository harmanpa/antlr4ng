import type { CharStream } from "../../CharStream";
import { Token } from "../../Token";
import type { TokenSource } from "../../TokenSource";
/**
 * A {@link Token} object representing an entire subtree matched by a parser
 * rule; e.g., `<expr>`. These tokens are created for {@link TagChunk}
 * chunks where the tag corresponds to a parser rule.
 */
export declare class RuleTagToken implements Token {
    /** The name of the label associated with the rule tag. */
    readonly label?: string;
    /** The name of the parser rule associated with this rule tag. */
    readonly ruleName: string;
    /**
     * The token type for the current token. This is the token type assigned to
     * the bypass alternative for the rule during ATN deserialization.
     */
    private readonly bypassTokenType;
    /**
     * Constructs a new instance of {@link RuleTagToken} with the specified rule
     * name and bypass token type and no label.
     *
     * @param ruleName The name of the parser rule this rule tag matches.
     * @param bypassTokenType The bypass token type assigned to the parser rule.
     *
     * @throws IllegalArgumentException if `ruleName` is `null`
     * or empty.
     */
    constructor(ruleName: string, bypassTokenType: number);
    /**
     * Constructs a new instance of {@link RuleTagToken} with the specified rule
     * name, bypass token type, and label.
     *
     * @param ruleName The name of the parser rule this rule tag matches.
     * @param bypassTokenType The bypass token type assigned to the parser rule.
     * @param label The label associated with the rule tag, or `null` if
     * the rule tag is unlabeled.
     *
     * @throws IllegalArgumentException if `ruleName` is `undefined` or empty.
     */
    constructor(ruleName: string, bypassTokenType: number, label: string | undefined);
    /**
     * Rule tag tokens are always placed on the {@link #DEFAULT_CHANNEL}.
     */
    get channel(): number;
    /**
     * This method returns the rule tag formatted with `<` and `>`
     * delimiters.
     */
    get text(): string;
    /**
     * Rule tag tokens have types assigned according to the rule bypass
     * transitions created during ATN deserialization.
     */
    get type(): number;
    /**
     * The implementation for {@link RuleTagToken} always returns 0.
     */
    get line(): number;
    /**
     * The implementation for {@link RuleTagToken} always returns -1.
     */
    get column(): number;
    /**
     * The implementation for {@link RuleTagToken} always returns -1.
     */
    get tokenIndex(): number;
    /**
     * The implementation for {@link RuleTagToken} always returns -1.
     */
    get start(): number;
    /**
     * The implementation for {@link RuleTagToken} always returns -1.
     */
    get stop(): number;
    /**
     * The implementation for {@link RuleTagToken} always returns `null`.
     */
    get tokenSource(): TokenSource | null;
    /**
     * The implementation for {@link RuleTagToken} always returns `null`.
     */
    get inputStream(): CharStream | null;
    /**
     * The implementation for {@link RuleTagToken} returns a string of the form
     * `ruleName:bypassTokenType`.
     */
    toString(): string;
}
