import { ErrorNode } from "./ErrorNode";
import { ParseTree } from "./ParseTree";
import { ParseTreeVisitor } from "./ParseTreeVisitor";
import { TerminalNode } from "./TerminalNode";
export declare abstract class AbstractParseTreeVisitor<T> implements ParseTreeVisitor<T> {
    visit(tree: ParseTree): T | null;
    visitChildren(node: ParseTree): T | null;
    visitTerminal(_node: TerminalNode): T | null;
    visitErrorNode(_node: ErrorNode): T | null;
    protected defaultResult(): T | null;
    protected shouldVisitNextChild(_node: ParseTree, _currentResult: T | null): boolean;
    protected aggregateResult(aggregate: T | null, nextResult: T | null): T | null;
}
