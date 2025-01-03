import { LexerAction } from "./LexerAction";
import { Lexer } from "../Lexer";
/**
 * Implements the `pushMode` lexer action by calling
 * {@link Lexer//pushMode} with the assigned mode
 */
export declare class LexerPushModeAction implements LexerAction {
    #private;
    readonly mode: number;
    readonly actionType: number;
    isPositionDependent: boolean;
    constructor(mode: number);
    /**
     * This action is implemented by calling {@link Lexer.pushMode} with the
     * value provided by {@link getMode}.
     */
    execute(lexer: Lexer): void;
    hashCode(): number;
    equals(other: unknown): boolean;
    toString(): string;
}
