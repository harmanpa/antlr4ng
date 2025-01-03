import { type ParseTreeVisitor } from "./ParseTreeVisitor";
import { TerminalNode } from "./TerminalNode";
/**
 * Represents a token that was consumed during resynchronization
 * rather than during a valid match operation. For example,
 * we will create this kind of a node during single token insertion
 * and deletion as well as during "consume until error recovery set"
 * upon no viable alternative exceptions.
 */
export declare class ErrorNode extends TerminalNode {
    accept<T>(visitor: ParseTreeVisitor<T>): T | null;
}
