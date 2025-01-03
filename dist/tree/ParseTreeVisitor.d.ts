import { type ErrorNode } from "./ErrorNode";
import { type ParseTree } from "./ParseTree";
import { type TerminalNode } from "./TerminalNode";
/**
 * This interface defines the basic notion of a parse tree visitor. Generated
 * visitors implement this interface and the `XVisitor` interface for
 * grammar `X`.
 *
 * @param T The return type of the visit operation. Use void for
 * operations with no return type.
 */
export interface ParseTreeVisitor<T> {
    /**
     * Visit a parse tree, and return a user-defined result of the operation.
     *
     * @param tree The {@link ParseTree} to visit.
     * @returns The result of visiting the parse tree.
     */
    visit(tree: ParseTree): T | null;
    /**
     * Visit the children of a node, and return a user-defined result of the
     * operation.
     *
     * @param node The {@link RuleNode} whose children should be visited.
     * @returns The result of visiting the children of the node.
     */
    visitChildren(node: ParseTree): T | null;
    /**
     * Visit a terminal node, and return a user-defined result of the operation.
     *
     * @param node The {@link TerminalNode} to visit.
     * @returns The result of visiting the node.
     */
    visitTerminal(node: TerminalNode): T | null;
    /**
     * Visit an error node, and return a user-defined result of the operation.
     *
     * @param node The {@link ErrorNode} to visit.
     * @returns The result of visiting the node.
     */
    visitErrorNode(node: ErrorNode): T | null;
}
