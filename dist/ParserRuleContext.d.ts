import { Interval } from "./misc/Interval";
import { Token } from "./Token";
import { ParseTreeListener } from "./tree/ParseTreeListener";
import { ParseTree } from "./tree/ParseTree";
import { TerminalNode } from "./tree/TerminalNode";
import { ErrorNode } from "./tree/ErrorNode";
import type { Parser } from "./Parser";
import type { ParseTreeVisitor } from "./tree/ParseTreeVisitor";
/**
 * A rule invocation record for parsing.
 *
 *  Contains all of the information about the current rule not stored in the
 *  RuleContext. It handles parse tree children list, Any ATN state
 *  tracing, and the default values available for rule indications:
 *  start, stop, rule index, current alt number, current
 *  ATN state.
 *
 *  Subclasses made for each rule and grammar track the parameters,
 *  return values, locals, and labels specific to that rule. These
 *  are the objects that are returned from rules.
 *
 *  Note text is not an actual field of a rule return value; it is computed
 *  from start and stop using the input stream's toString() method.  I
 *  could add a ctor to this so that we can pass in and store the input
 *  stream, but I'm not sure we want to do that.  It would seem to be undefined
 *  to get the .text property anyway if the rule matches tokens from multiple
 *  input streams.
 *
 *  I do not use getters for fields of objects that are used simply to
 *  group values such as this aggregate.  The getters/setters are there to
 *  satisfy the superclass interface.
 */
export declare class ParserRuleContext implements ParseTree {
    #private;
    static readonly empty: ParserRuleContext;
    start: Token | null;
    stop: Token | null;
    readonly children: ParseTree[];
    /**
     * What state invoked the rule associated with this context?
     *  The "return address" is the followState of invokingState
     *  If parent is null, this should be -1 this context object represents
     *  the start rule.
     */
    invokingState: number;
    /**
     * A rule context is a record of a single rule invocation. It knows
     * which context invoked it, if any. If there is no parent context, then
     * naturally the invoking state is not valid.  The parent link
     * provides a chain upwards from the current rule invocation to the root
     * of the invocation tree, forming a stack. We actually carry no
     * information about the rule associated with this context (except
     * when parsing). We keep only the state number of the invoking state from
     * the ATN submachine that invoked this. Contrast this with the s
     * pointer inside ParserRuleContext that tracks the current state
     * being "executed" for the current rule.
     *
     * The parent contexts are useful for computing lookahead sets and
     * getting error information.
     *
     * These objects are used during parsing and prediction.
     * For the special case of parsers, we use the subclass
     * ParserRuleContext.
     */
    constructor(parent: ParserRuleContext | null, invokingStateNumber?: number);
    /** Copy a context */
    copyFrom(ctx: ParserRuleContext): void;
    enterRule(_listener: ParseTreeListener): void;
    exitRule(_listener: ParseTreeListener): void;
    addChild(child: ParserRuleContext): ParserRuleContext;
    /**
     * Used by enterOuterAlt to toss out a RuleContext previously added as
     * we entered a rule. If we have label, we will need to remove
     * generic ruleContext object.
     */
    removeLastChild(): void;
    addTokenNode(token: Token): TerminalNode;
    addErrorNode(errorNode: ErrorNode): ErrorNode;
    getChild(i: number): ParseTree | null;
    getChild<T extends ParseTree>(i: number, type: new (...args: unknown[]) => T): T | null;
    getToken(ttype: number, i: number): TerminalNode | null;
    getTokens(ttype: number): TerminalNode[];
    getRuleContext<T extends ParserRuleContext, Args extends unknown[]>(index: number, ctxType: new (...args: Args) => T): T | null;
    getRuleContexts<T extends ParserRuleContext, Args extends unknown[]>(ctxType: new (...args: Args) => T): T[];
    getChildCount(): number;
    getSourceInterval(): Interval;
    get parent(): ParserRuleContext | null;
    set parent(parent: ParserRuleContext | null);
    depth(): number;
    /**
     * A context is empty if there is no invoking state; meaning nobody call
     * current context.
     */
    isEmpty(): boolean;
    get ruleContext(): ParserRuleContext;
    get ruleIndex(): number;
    getPayload(): ParserRuleContext;
    getText(): string;
    /**
     * For rule associated with this parse tree internal node, return
     * the outer alternative number used to match the input. Default
     * implementation does not compute nor store this alt num. Create
     * a subclass of ParserRuleContext with backing field and set
     * option contextSuperClass.
     * to set it.
     */
    getAltNumber(): number;
    /**
     * Set the outer alternative number for this context node. Default
     * implementation does nothing to avoid backing field overhead for
     * trees that don't need it.  Create
     * a subclass of ParserRuleContext with backing field and set
     * option contextSuperClass.
     */
    setAltNumber(_altNumber: number): void;
    accept<T>(visitor: ParseTreeVisitor<T>): T | null;
    /**
     * Print out a whole tree, not just a node, in LISP format
     * (root child1 .. childN). Print just a node if this is a leaf.
     */
    toStringTree(recog?: Parser): string;
    toStringTree(ruleNames: string[] | null, recog: Parser): string;
    toString(ruleNames?: string[] | null, stop?: ParserRuleContext | null): string;
}
