import { BaseErrorListener } from "./BaseErrorListener";
import { RecognitionException } from "./RecognitionException";
import { Recognizer } from "./Recognizer";
import { ATNSimulator } from "./atn/ATNSimulator";
/**
 * This implementation prints messages to the console containing the values of `line`, `charPositionInLine`,
 * and `msg` using the following format.
 *
 * ```
 * line *line*:*charPositionInLine* *msg*
 * ```
 */
export declare class ConsoleErrorListener extends BaseErrorListener {
    /**
     * Provides a default instance of {@link ConsoleErrorListener}.
     */
    static readonly instance: ConsoleErrorListener;
    syntaxError<T extends ATNSimulator>(recognizer: Recognizer<T> | null, offendingSymbol: unknown, line: number, charPositionInLine: number, msg: string | null, _e: RecognitionException | null): void;
}
