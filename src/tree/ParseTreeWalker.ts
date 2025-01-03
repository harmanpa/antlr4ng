/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { ParserRuleContext } from "../ParserRuleContext";
import { ErrorNode } from "./ErrorNode";
import { ParseTree } from "./ParseTree";
import { ParseTreeListener } from "./ParseTreeListener";
import { TerminalNode } from "./TerminalNode";

export class ParseTreeWalker {
    public static DEFAULT = new ParseTreeWalker();

    /**
     * Performs a walk on the given parse tree starting at the root and going down recursively
     * with depth-first search. On each node, {@link ParseTreeWalker.enterRule} is called before
     * recursively walking down into child nodes, then
     * {@link ParseTreeWalker.exitRule} is called after the recursive call to wind up.
     *
     * @param listener The listener used by the walker to process grammar rules
     * @param t The parse tree to be walked on
     */
    public walk<T extends ParseTreeListener>(listener: T, t: ParseTree): void {
        const errorNode = t instanceof ErrorNode;
        if (errorNode) {
            listener.visitErrorNode(t);
        } else if (t instanceof TerminalNode) {
            listener.visitTerminal(t);
        } else {
            const r = t as ParserRuleContext;
            this.enterRule(listener, r);
            for (let i = 0; i < t.getChildCount(); i++) {
                this.walk(listener, t.getChild(i)!);
            }
            this.exitRule(listener, r);
        }
    }

    /**
     * Enters a grammar rule by first triggering the generic event {@link ParseTreeListener.enterEveryRule}
     * then by triggering the event specific to the given parse tree node
     *
     * @param listener The listener responding to the trigger events
     * @param r The grammar rule containing the rule context
     */
    protected enterRule(listener: ParseTreeListener, r: ParserRuleContext): void {
        const ctx = r.ruleContext;
        listener.enterEveryRule(ctx);
        ctx.enterRule(listener);
    }

    /**
     * Exits a grammar rule by first triggering the event specific to the given parse tree node
     * then by triggering the generic event {@link ParseTreeListener.exitEveryRule}
     *
     * @param listener The listener responding to the trigger events
     * @param r The grammar rule containing the rule context
     */
    protected exitRule(listener: ParseTreeListener, r: ParserRuleContext): void {
        const ctx = r.ruleContext;
        ctx.exitRule(listener);
        listener.exitEveryRule(ctx);
    }
}
