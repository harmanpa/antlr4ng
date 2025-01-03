import { ATNSimulator } from "./atn/ATNSimulator";
import { ParseInfo } from "./atn/ParseInfo";
import { Vocabulary } from "./Vocabulary";
import { ANTLRErrorListener } from "./ANTLRErrorListener";
import { RecognitionException } from "./RecognitionException";
import { ATN } from "./atn/ATN";
import { ParserRuleContext } from "./ParserRuleContext";
import { IntStream } from "./IntStream";
export declare abstract class Recognizer<ATNInterpreter extends ATNSimulator> {
    #private;
    static readonly EOF = -1;
    private static tokenTypeMapCache;
    private static ruleIndexMapCache;
    interpreter: ATNInterpreter;
    checkVersion(toolVersion: string): void;
    addErrorListener(listener: ANTLRErrorListener): void;
    removeErrorListeners(): void;
    removeErrorListener(listener: ANTLRErrorListener): void;
    getErrorListeners(): ANTLRErrorListener[];
    getTokenTypeMap(): Map<string, number>;
    /**
     * Get a map from rule names to rule indexes.
     * Used for XPath and tree pattern compilation.
     */
    getRuleIndexMap(): Map<string, number>;
    getTokenType(tokenName: string): number;
    /** What is the error header, normally line/character position information? */
    getErrorHeader(e: RecognitionException): string;
    get errorListenerDispatch(): ANTLRErrorListener;
    /**
     * subclass needs to override these if there are semantic predicates or actions
     * that the ATN interp needs to execute
     */
    sempred(_localctx: ParserRuleContext | null, _ruleIndex: number, _actionIndex: number): boolean;
    precpred(_localctx: ParserRuleContext | null, _precedence: number): boolean;
    action(_localctx: ParserRuleContext | null, _ruleIndex: number, _actionIndex: number): void;
    get atn(): ATN;
    get state(): number;
    set state(state: number);
    getSerializedATN(): number[];
    getParseInfo(): ParseInfo | null;
    abstract get grammarFileName(): string;
    abstract get ruleNames(): string[];
    abstract get vocabulary(): Vocabulary;
    abstract get inputStream(): IntStream | null;
    abstract set inputStream(input: IntStream | null);
}
