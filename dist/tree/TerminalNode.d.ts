import { Interval } from "../misc/Interval";
import { Token } from "../Token";
import { ParseTree } from "./ParseTree";
import { type ParseTreeVisitor } from "./ParseTreeVisitor";
export declare class TerminalNode implements ParseTree {
    parent: ParseTree | null;
    symbol: Token;
    constructor(symbol: Token);
    getChild(_i: number): ParseTree | null;
    getSymbol(): Token;
    getPayload(): Token | null;
    getSourceInterval(): Interval;
    getChildCount(): number;
    accept<T>(visitor: ParseTreeVisitor<T>): T | null;
    getText(): string;
    toString(): string;
    toStringTree(): string;
}
