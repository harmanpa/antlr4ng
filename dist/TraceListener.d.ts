import { Parser } from "./Parser";
import { ParserRuleContext } from "./ParserRuleContext";
import { ParseTreeListener } from "./tree/ParseTreeListener";
import { TerminalNode } from "./tree/TerminalNode";
export declare class TraceListener implements ParseTreeListener {
    private parser;
    constructor(parser: Parser);
    enterEveryRule(ctx: ParserRuleContext): void;
    visitTerminal(node: TerminalNode): void;
    exitEveryRule(ctx: ParserRuleContext): void;
    visitErrorNode(_node: TerminalNode): void;
}
