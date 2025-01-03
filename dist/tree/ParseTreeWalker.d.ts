import { ParserRuleContext } from "../ParserRuleContext";
import { ParseTree } from "./ParseTree";
import { ParseTreeListener } from "./ParseTreeListener";
export declare class ParseTreeWalker {
    static DEFAULT: ParseTreeWalker;
    /**
     * Performs a walk on the given parse tree starting at the root and going down recursively
     * with depth-first search. On each node, {@link ParseTreeWalker.enterRule} is called before
     * recursively walking down into child nodes, then
     * {@link ParseTreeWalker.exitRule} is called after the recursive call to wind up.
     *
     * @param listener The listener used by the walker to process grammar rules
     * @param t The parse tree to be walked on
     */
    walk<T extends ParseTreeListener>(listener: T, t: ParseTree): void;
    /**
     * Enters a grammar rule by first triggering the generic event {@link ParseTreeListener.enterEveryRule}
     * then by triggering the event specific to the given parse tree node
     *
     * @param listener The listener responding to the trigger events
     * @param r The grammar rule containing the rule context
     */
    protected enterRule(listener: ParseTreeListener, r: ParserRuleContext): void;
    /**
     * Exits a grammar rule by first triggering the event specific to the given parse tree node
     * then by triggering the generic event {@link ParseTreeListener.exitEveryRule}
     *
     * @param listener The listener responding to the trigger events
     * @param r The grammar rule containing the rule context
     */
    protected exitRule(listener: ParseTreeListener, r: ParserRuleContext): void;
}
