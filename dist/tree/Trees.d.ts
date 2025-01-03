import { ParserRuleContext } from "../ParserRuleContext";
import { ParseTree } from "./ParseTree";
import { Parser } from "../Parser";
/** A set of utility routines useful for all kinds of ANTLR trees. */
export declare class Trees {
    /**
     * Print out a whole tree in LISP form. {@link getNodeText} is used on the
     * node payloads to get the text for the nodes.  Detect
     * parse trees and extract data appropriately.
     */
    static toStringTree(tree: ParseTree, ruleNames: string[] | null, recog?: Parser): string;
    static getNodeText(t: ParseTree, ruleNames: string[] | null, recog?: Parser): string | undefined;
    /**
     * Return ordered list of all children of this node
     */
    static getChildren(t: ParseTree): ParseTree[];
    /**
     * Return a list of all ancestors of this node.  The first node of
     * list is the root and the last is the parent of this node.
     */
    static getAncestors(t: ParseTree): ParseTree[];
    /**
     * Return true if t is u's parent or a node on path to root from u.
     */
    static isAncestorOf(t: ParseTree | null, u: ParseTree | null): boolean;
    static findAllTokenNodes(t: ParseTree, ttype: number): ParseTree[];
    static findAllRuleNodes(t: ParseTree, ruleIndex: number): ParseTree[];
    static findAllNodes(t: ParseTree, index: number, findTokens: boolean): ParseTree[];
    static descendants(t: ParseTree): ParseTree[];
    /**
     * Find smallest subtree of t enclosing range startTokenIndex..stopTokenIndex
     * inclusively using post order traversal. Recursive depth-first-search.
     */
    static getRootOfSubtreeEnclosingRegion(t: ParseTree, startTokenIndex: number, stopTokenIndex: number): ParserRuleContext | null;
    /**
     * Replace any subtree siblings of root that are completely to left
     * or right of lookahead range with a CommonToken(Token.INVALID_TYPE,"...")
     * node. The source interval for t is not altered to suit smaller range!
     *
     * WARNING: destructive to t.
     */
    static stripChildrenOutOfRange(t: ParserRuleContext | null, root: ParserRuleContext, startIndex: number, stopIndex: number): void;
    private static doFindAllNodes;
}
