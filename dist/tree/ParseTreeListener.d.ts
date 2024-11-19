import { type ParserRuleContext } from "../ParserRuleContext";
import { type ErrorNode } from "./ErrorNode";
import { type TerminalNode } from "./TerminalNode";
export interface ParseTreeListener {
    visitTerminal(node: TerminalNode): void;
    visitErrorNode(node: ErrorNode): void;
    enterEveryRule(node: ParserRuleContext): void;
    exitEveryRule(node: ParserRuleContext): void;
}
