import { Token } from "./Token";
import { TerminalNode } from "./tree/TerminalNode";
import { ErrorNode } from "./tree/ErrorNode";
import { Recognizer } from "./Recognizer";
import { DefaultErrorStrategy } from "./DefaultErrorStrategy";
import { ParserATNSimulator } from "./atn/ParserATNSimulator";
import { TokenStream } from "./TokenStream";
import { ParseTreeListener } from "./tree/ParseTreeListener";
import { ParserRuleContext } from "./ParserRuleContext";
import { TokenFactory } from "./TokenFactory";
import { ATN } from "./atn/ATN";
import { RecognitionException } from "./RecognitionException";
import { IntervalSet } from "./misc/IntervalSet";
import type { IntStream } from "./IntStream";
import type { ParseTreePattern } from "./tree/pattern/ParseTreePattern";
import { Lexer } from "./Lexer";
export interface IDebugPrinter {
    println(s: string): void;
    print(s: string): void;
}
export declare abstract class Parser extends Recognizer<ParserATNSimulator> {
    #private;
    /** For testing only. */
    printer: IDebugPrinter | null;
    /**
     * Specifies whether or not the parser should construct a parse tree during
     * the parsing process. The default value is `true`.
     *
     * @see #getBuildParseTree
     * @see #setBuildParseTree
     */
    buildParseTrees: boolean;
    /**
     * The error handling strategy for the parser. The default value is a new
     * instance of {@link DefaultErrorStrategy}.
     *
     * @see #getErrorHandler
     * @see #setErrorHandler
     */
    errorHandler: DefaultErrorStrategy;
    /**
     * The {@link ParserRuleContext} object for the currently executing rule.
     * This is always non-null during the parsing process.
     */
    context: ParserRuleContext | null;
    protected precedenceStack: number[];
    /**
     * The list of {@link ParseTreeListener} listeners registered to receive
     * events during the parse.
     *
     * @see #addParseListener
     */
    protected parseListeners: ParseTreeListener[] | null;
    /**
     * The number of syntax errors reported during parsing. This value is
     * incremented each time {@link #notifyErrorListeners} is called.
     */
    protected syntaxErrors: number;
    /** Indicates parser has matched EOF token. See {@link #exitRule()}. */
    protected matchedEOF: boolean;
    /**
     * This is all the parsing support code essentially. Most of it is error recovery stuff.
     */
    constructor(input: TokenStream);
    /** reset the parser's state */
    reset(rewindInputStream?: boolean): void;
    /**
     * Match current input symbol against `ttype`. If the symbol type
     * matches, {@link ANTLRErrorStrategy//reportMatch} and {@link consume} are
     * called to complete the match process.
     *
     * If the symbol type does not match,
     * {@link ANTLRErrorStrategy//recoverInline} is called on the current error
     * strategy to attempt recovery. If {@link buildParseTree} is
     * `true` and the token index of the symbol returned by
     * {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
     * the parse tree by calling {@link ParserRuleContext//addErrorNode}.
     *
     * @param ttype the token type to match
     * @returns the matched symbol
     * @throws RecognitionException if the current input symbol did not match
     * `ttype` and the error strategy could not recover from the
     * mismatched symbol
     */
    match(ttype: number): Token;
    /**
     * Match current input symbol as a wildcard. If the symbol type matches
     * (i.e. has a value greater than 0), {@link ANTLRErrorStrategy//reportMatch}
     * and {@link consume} are called to complete the match process.
     *
     * If the symbol type does not match,
     * {@link ANTLRErrorStrategy//recoverInline} is called on the current error
     * strategy to attempt recovery. If {@link buildParseTree} is
     * `true` and the token index of the symbol returned by
     * {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
     * the parse tree by calling {@link ParserRuleContext//addErrorNode}.
     *
     * @returns the matched symbol
     * @throws RecognitionException if the current input symbol did not match
     * a wildcard and the error strategy could not recover from the mismatched
     * symbol
     */
    matchWildcard(): Token;
    getParseListeners(): ParseTreeListener[];
    /**
     * Registers `listener` to receive events during the parsing process.
     *
     * To support output-preserving grammar transformations (including but not
     * limited to left-recursion removal, automated left-factoring, and
     * optimized code generation), calls to listener methods during the parse
     * may differ substantially from calls made by
     * {@link ParseTreeWalker//DEFAULT} used after the parse is complete. In
     * particular, rule entry and exit events may occur in a different order
     * during the parse than after the parser. In addition, calls to certain
     * rule entry methods may be omitted.
     *
     * With the following specific exceptions, calls to listener events are
     * deterministic*, i.e. for identical input the calls to listener
     * methods will be the same.
     *
     * - Alterations to the grammar used to generate code may change the
     * behavior of the listener calls.
     * - Alterations to the command line options passed to ANTLR 4 when
     * generating the parser may change the behavior of the listener calls.
     * - Changing the version of the ANTLR Tool used to generate the parser
     * may change the behavior of the listener calls.
     *
     * @param listener the listener to add
     *
     * @throws NullPointerException if {@code} listener is `null`
     */
    addParseListener(listener: ParseTreeListener): void;
    /**
     * Remove `listener` from the list of parse listeners.
     *
     * If `listener` is `null` or has not been added as a parse
     * listener, this method does nothing.
     *
     * @param listener the listener to remove
     */
    removeParseListener(listener: ParseTreeListener | null): void;
    removeParseListeners(): void;
    triggerEnterRuleEvent(): void;
    /**
     * Notify any parse listeners of an exit rule event.
     *
     * @see //addParseListener
     */
    triggerExitRuleEvent(): void;
    getTokenFactory(): TokenFactory<Token>;
    setTokenFactory(factory: TokenFactory<Token>): void;
    /**
     * The preferred method of getting a tree pattern. For example, here's a
     * sample use:
     *
     * ```
     * const t = parser.expr();
     * const p = parser.compileParseTreePattern("<ID>+0", MyParser.RULE_expr);
     * const m = p.match(t);
     * const id = m.get("ID");
     * ```
     */
    compileParseTreePattern(pattern: string, patternRuleIndex: number, lexer?: Lexer): ParseTreePattern;
    /**
     * The ATN with bypass alternatives is expensive to create so we create it
     * lazily.
     *
     * @throws UnsupportedOperationException if the current parser does not
     * implement the {@link getSerializedATN()} method.
     */
    getATNWithBypassAlts(): ATN;
    /**
     * Gets the number of syntax errors reported during parsing. This value is
     * incremented each time {@link notifyErrorListeners} is called.
     */
    get numberOfSyntaxErrors(): number;
    get inputStream(): TokenStream;
    set inputStream(input: IntStream);
    get tokenStream(): TokenStream;
    /** Set the token stream and reset the parser. */
    set tokenStream(input: TokenStream);
    /**
     * Match needs to return the current input symbol, which gets put
     * into the label for the associated token ref; e.g., x=ID.
     */
    getCurrentToken(): Token;
    notifyErrorListeners(msg: string, offendingToken: Token | null, err: RecognitionException | null): void;
    /**
     * Consume and return the {@link getCurrentToken current symbol}.
     *
     * E.g., given the following input with `A` being the current
     * lookahead symbol, this function moves the cursor to `B` and returns
     * `A`.
     *
     * ```
     * A B
     * ^
     * ```
     *
     * If the parser is not in error recovery mode, the consumed symbol is added
     * to the parse tree using {@link ParserRuleContext//addChild(Token)}, and
     * {@link ParseTreeListener//visitTerminal} is called on any parse listeners.
     * If the parser *is* in error recovery mode, the consumed symbol is
     * added to the parse tree using
     * {@link ParserRuleContext//addErrorNode(Token)}, and
     * {@link ParseTreeListener//visitErrorNode} is called on any parse
     * listeners.
     */
    consume(): Token;
    addContextToParseTree(): void;
    /**
     * Always called by generated parsers upon entry to a rule. Access field
     * {@link context} get the current context.
     */
    enterRule(localctx: ParserRuleContext, state: number, _ruleIndex: number): void;
    exitRule(): void;
    enterOuterAlt(localctx: ParserRuleContext, altNum: number): void;
    /**
     * Get the precedence level for the top-most precedence rule.
     *
     * @returns The precedence level for the top-most precedence rule, or -1 if
     * the parser context is not nested within a precedence rule.
     */
    getPrecedence(): number;
    enterRecursionRule(localctx: ParserRuleContext, state: number, ruleIndex: number, precedence: number): void;
    /** Like {@link enterRule} but for recursive rules. */
    pushNewRecursionContext(localctx: ParserRuleContext, state: number, _ruleIndex: number): void;
    unrollRecursionContexts(parent: ParserRuleContext | null): void;
    getInvokingContext(ruleIndex: number): ParserRuleContext | null;
    precpred(_localctx: ParserRuleContext | null, precedence: number): boolean;
    /**
     * Checks whether or not `symbol` can follow the current state in the
     * ATN. The behavior of this method is equivalent to the following, but is
     * implemented such that the complete context-sensitive follow set does not
     * need to be explicitly constructed.
     *
     * ```
     * return getExpectedTokens().contains(symbol);
     * ```
     *
     * @param symbol the symbol type to check
     * @returns `true` if `symbol` can follow the current state in
     * the ATN, otherwise `false`.
     */
    isExpectedToken(symbol: number): boolean;
    /**
     * Computes the set of input symbols which could follow the current parser
     * state and context, as given by {@link getState} and {@link getContext},
     * respectively.
     *
     * {@link ATN.getExpectedTokens ATN.getExpectedTokens(int, RuleContext)}
     */
    getExpectedTokens(): IntervalSet;
    getExpectedTokensWithinCurrentRule(): IntervalSet;
    /** Get a rule's index (i.e., `RULE_ruleName` field) or -1 if not found. */
    getRuleIndex(ruleName: string): number;
    /**
     * @returns an array of string of the rule names in your parser instance
     * leading up to a call to the current rule. You could override if
     * you want more details such as the file/line info of where
     * in the ATN a rule is invoked.
     *
     * this is very useful for error messages.
     */
    getRuleInvocationStack(p?: ParserRuleContext | null): string[];
    /**
     * For debugging and other purposes.
     *
     * TODO: this differs from the Java version. Change it.
     */
    getDFAStrings(): string;
    /** For debugging and other purposes. */
    dumpDFA(): void;
    getSourceName(): string;
    setProfile(profile: boolean): void;
    /**
     * During a parse is sometimes useful to listen in on the rule entry and exit
     * events as well as token matches. this is for quick and dirty debugging.
     */
    setTrace(trace: boolean): void;
    createTerminalNode(parent: ParserRuleContext, t: Token): TerminalNode;
    createErrorNode(parent: ParserRuleContext, t: Token): ErrorNode;
}
