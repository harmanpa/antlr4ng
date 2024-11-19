import { BaseErrorListener } from "./BaseErrorListener";
import { Parser } from "./Parser";
import { RecognitionException } from "./RecognitionException";
import { Recognizer } from "./Recognizer";
import { Token } from "./Token";
import { ATNConfigSet } from "./atn/ATNConfigSet";
import { ATNSimulator } from "./atn/ATNSimulator";
import { DFA } from "./dfa/DFA";
import { BitSet } from "./misc/BitSet";
export declare class ProxyErrorListener extends BaseErrorListener {
    private delegates;
    constructor(delegates: BaseErrorListener[]);
    syntaxError<S extends Token, T extends ATNSimulator>(recognizer: Recognizer<T>, offendingSymbol: S | null, line: number, column: number, msg: string, e: RecognitionException | null): void;
    reportAmbiguity(recognizer: Parser, dfa: DFA, startIndex: number, stopIndex: number, exact: boolean, ambigAlts: BitSet | undefined, configs: ATNConfigSet): void;
    reportAttemptingFullContext(recognizer: Parser, dfa: DFA, startIndex: number, stopIndex: number, conflictingAlts: BitSet | undefined, configs: ATNConfigSet): void;
    reportContextSensitivity(recognizer: Parser, dfa: DFA, startIndex: number, stopIndex: number, prediction: number, configs: ATNConfigSet): void;
}
