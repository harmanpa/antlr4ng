﻿/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

/* eslint-disable @typescript-eslint/naming-convention, jsdoc/require-returns, jsdoc/require-param */

import { CharStream } from "../../CharStream";
import { CommonTokenStream } from "../../CommonTokenStream";
import { LexerNoViableAltException } from "../../LexerNoViableAltException";
import { Parser } from "../../Parser";
import { ParserRuleContext } from "../../ParserRuleContext";
import { ParseTree } from "../ParseTree";
import { Token } from "../../Token";
import { XPathElement } from "./XPathElement";
import { XPathLexer } from "./XPathLexer";
import { XPathLexerErrorListener } from "./XPathLexerErrorListener";
import { XPathRuleAnywhereElement } from "./XPathRuleAnywhereElement";
import { XPathRuleElement } from "./XPathRuleElement";
import { XPathTokenAnywhereElement } from "./XPathTokenAnywhereElement";
import { XPathTokenElement } from "./XPathTokenElement";
import { XPathWildcardAnywhereElement } from "./XPathWildcardAnywhereElement";
import { XPathWildcardElement } from "./XPathWildcardElement";

/**
 * Represent a subset of XPath XML path syntax for use in identifying nodes in
 * parse trees.
 *
 * Split path into words and separators `/` and `//` via ANTLR
 * itself then walk path elements from left to right. At each separator-word
 * pair, find set of nodes. Next stage uses those as work list.
 *
 * The basic interface is
 * {@link XPath.findAll ParseTree.findAll}`(tree, pathString, parser)`.
 * But that is just shorthand for:
 *
 * ```
 * let p = new XPath(parser, pathString);
 * return p.evaluate(tree);
 * ```
 *
 * See `TestXPath` for descriptions. In short, this
 * allows operators:
 *
 * | | |
 * | --- | --- |
 * | `/` | root |
 * | `//` | anywhere |
 * | `!` | invert; this much appear directly after root or anywhere operator |
 *
 * and path elements:
 *
 * | | |
 * | --- | --- |
 * | `ID` | token name |
 * | `'string'` | any string literal token from the grammar |
 * | `expr` | rule name |
 * | `*` | wildcard matching any node |
 *
 * Whitespace is not allowed.
 */
export class XPath {
    public static readonly WILDCARD: string = "*"; // word not operator/separator
    public static readonly NOT: string = "!"; 	   // word for invert operator

    protected path: string;
    protected elements: XPathElement[];
    protected parser: Parser;

    public constructor(parser: Parser, path: string) {
        this.parser = parser;
        this.path = path;
        this.elements = this.split(path);
    }

    public static findAll(tree: ParseTree, xpath: string, parser: Parser): Set<ParseTree> {
        const p: XPath = new XPath(parser, xpath);

        return p.evaluate(tree);
    }

    // TODO: check for invalid token/rule names, bad syntax

    public split(path: string): XPathElement[] {
        const lexer = new XPathLexer(CharStream.fromString(path));
        lexer.recover = (e: LexerNoViableAltException) => { throw e; };

        lexer.removeErrorListeners();
        lexer.addErrorListener(new XPathLexerErrorListener());
        const tokenStream = new CommonTokenStream(lexer);
        try {
            tokenStream.fill();
        } catch (e) {
            if (e instanceof LexerNoViableAltException) {
                const pos = lexer.column;
                const msg = "Invalid tokens or characters at index " + pos + " in path '" + path + "' -- " + e.message;
                throw new RangeError(msg);
            }
            throw e;
        }

        const tokens: Token[] = tokenStream.getTokens();
        const elements: XPathElement[] = [];
        const n: number = tokens.length;
        let i: number = 0;

        loop:
        while (i < n) {
            const el: Token = tokens[i];
            let next: Token | undefined;
            switch (el.type) {
                case XPathLexer.ROOT:
                case XPathLexer.ANYWHERE:
                    const anywhere: boolean = el.type === XPathLexer.ANYWHERE;
                    i++;
                    next = tokens[i];
                    const invert: boolean = next.type === XPathLexer.BANG;
                    if (invert) {
                        i++;
                        next = tokens[i];
                    }
                    const pathElement: XPathElement = this.getXPathElement(next, anywhere);
                    pathElement.invert = invert;
                    elements.push(pathElement);
                    i++;

                    break;

                case XPathLexer.TOKEN_REF:
                case XPathLexer.RULE_REF:
                case XPathLexer.WILDCARD:
                    elements.push(this.getXPathElement(el, false));
                    ++i;

                    break;

                case Token.EOF:
                    break loop;

                default:
                    throw new Error("Unknown path element " + el);
            }
        }

        return elements;
    }

    /**
     * Return a list of all nodes starting at `t` as root that satisfy the
     * path. The root `/` is relative to the node passed to {@link evaluate}.
     */
    public evaluate(t: ParseTree): Set<ParseTree> {
        const dummyRoot = new ParserRuleContext(null);
        dummyRoot.addChild(t as ParserRuleContext);

        let work = new Set<ParseTree>([dummyRoot]);

        let i: number = 0;
        while (i < this.elements.length) {
            const next = new Set<ParseTree>();
            for (const node of work) {
                if (node.getChildCount() > 0) {
                    // only try to match next element if it has children
                    // e.g., //func/*/stat might have a token node for which
                    // we can't go looking for stat nodes.
                    const matching = this.elements[i].evaluate(node);
                    matching.forEach((tree) => { next.add(tree); }, next);
                }
            }
            i++;
            work = next;
        }

        return work;
    }

    /**
     * Convert word like `*` or `ID` or `expr` to a path
     * element. `anywhere` is `true` if `//` precedes the
     * word.
     */
    protected getXPathElement(wordToken: Token, anywhere: boolean): XPathElement {
        if (wordToken.type === Token.EOF) {
            throw new Error("Missing path element at end of path");
        }

        const word = wordToken.text;
        if (word == null) {
            throw new Error("Expected wordToken to have text content.");
        }

        const ttype: number = this.parser.getTokenType(word);
        const ruleIndex: number = this.parser.getRuleIndex(word);
        switch (wordToken.type) {
            case XPathLexer.WILDCARD:
                return anywhere ?
                    new XPathWildcardAnywhereElement() :
                    new XPathWildcardElement();
            case XPathLexer.TOKEN_REF:
            case XPathLexer.STRING:
                if (ttype === Token.INVALID_TYPE) {
                    throw new Error(word + " at index " +
                        wordToken.start +
                        " isn't a valid token name");
                }

                return anywhere ?
                    new XPathTokenAnywhereElement(word, ttype) :
                    new XPathTokenElement(word, ttype);
            default:
                if (ruleIndex === -1) {
                    throw new Error(word + " at index " +
                        wordToken.start +
                        " isn't a valid rule name");
                }

                return anywhere ?
                    new XPathRuleAnywhereElement(word, ruleIndex) :
                    new XPathRuleElement(word, ruleIndex);
        }
    }
}
