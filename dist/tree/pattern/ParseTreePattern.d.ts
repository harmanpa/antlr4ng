import type { ParseTree } from "../ParseTree";
import type { ParseTreeMatch } from "./ParseTreeMatch";
import type { ParseTreePatternMatcher } from "./ParseTreePatternMatcher";
/**
 * A pattern like `<ID> = <expr>;` converted to a {@link ParseTree} by
 * {@link ParseTreePatternMatcher#compile(String, int)}.
 */
export declare class ParseTreePattern {
    /**
     * This is the backing field for {@link #getPatternRuleIndex()}.
     */
    private readonly patternRuleIndex;
    /**
     * This is the backing field for {@link #getPattern()}.
     */
    private readonly pattern;
    /**
     * This is the backing field for {@link #getPatternTree()}.
     */
    private readonly patternTree;
    /**
     * This is the backing field for {@link #getMatcher()}.
     */
    private readonly matcher;
    /**
     * Construct a new instance of the {@link ParseTreePattern} class.
     *
     * @param matcher The {@link ParseTreePatternMatcher} which created this
     * tree pattern.
     * @param pattern The tree pattern in concrete syntax form.
     * @param patternRuleIndex The parser rule which serves as the root of the
     * tree pattern.
     * @param patternTree The tree pattern in {@link ParseTree} form.
     */
    constructor(matcher: ParseTreePatternMatcher, pattern: string, patternRuleIndex: number, patternTree: ParseTree);
    /**
     * Match a specific parse tree against this tree pattern.
     *
     * @param tree The parse tree to match against this tree pattern.
     * @returns A {@link ParseTreeMatch} object describing the result of the
     * match operation. The {@link ParseTreeMatch#succeeded()} method can be
     * used to determine whether or not the match was successful.
     */
    match(tree: ParseTree): ParseTreeMatch;
    /**
     * Determine whether or not a parse tree matches this tree pattern.
     *
     * @param tree The parse tree to match against this tree pattern.
     * @returns `true` if `tree` is a match for the current tree
     * pattern; otherwise, `false`.
     */
    matches(tree: ParseTree): boolean;
    /**
     * Find all nodes using XPath and then try to match those subtrees against
     * this tree pattern.
     *
     * @param tree The {@link ParseTree} to match against this pattern.
     * @param xpath An expression matching the nodes
     *
     * @returns A collection of {@link ParseTreeMatch} objects describing the
     * successful matches. Unsuccessful matches are omitted from the result,
     * regardless of the reason for the failure.
     */
    findAll(tree: ParseTree, xpath: string): ParseTreeMatch[];
    /**
     * Get the {@link ParseTreePatternMatcher} which created this tree pattern.
     *
     * @returns The {@link ParseTreePatternMatcher} which created this tree
     * pattern.
     */
    getMatcher(): ParseTreePatternMatcher;
    /**
     * Get the tree pattern in concrete syntax form.
     *
     * @returns The tree pattern in concrete syntax form.
     */
    getPattern(): string;
    /**
     * Get the parser rule which serves as the outermost rule for the tree
     * pattern.
     *
     * @returns The parser rule which serves as the outermost rule for the tree
     * pattern.
     */
    getPatternRuleIndex(): number;
    /**
     * Get the tree pattern as a {@link ParseTree}. The rule and token tags from
     * the pattern are present in the parse tree as terminal nodes with a symbol
     * of type {@link RuleTagToken} or {@link TokenTagToken}.
     *
     * @returns The tree pattern as a {@link ParseTree}.
     */
    getPatternTree(): ParseTree;
}
