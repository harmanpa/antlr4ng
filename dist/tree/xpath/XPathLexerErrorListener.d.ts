import { Recognizer } from "../../Recognizer";
import { RecognitionException } from "../../RecognitionException";
import { Token } from "../../Token";
import { ATNSimulator } from "../../atn/ATNSimulator";
import { BaseErrorListener } from "../../BaseErrorListener";
export declare class XPathLexerErrorListener extends BaseErrorListener {
    syntaxError<S extends Token, T extends ATNSimulator>(_recognizer: Recognizer<T>, _offendingSymbol: S | null, _line: number, _charPositionInLine: number, _msg: string, _e: RecognitionException | null): void;
}
