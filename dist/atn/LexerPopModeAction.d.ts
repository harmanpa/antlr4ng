import { LexerAction } from "./LexerAction";
import { Lexer } from "../Lexer";
/**
 * Implements the `popMode` lexer action by calling {@link Lexer.popMode}.
 *
 * The `popMode` command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link instance}.
 */
export declare class LexerPopModeAction implements LexerAction {
    static readonly instance: LexerPopModeAction;
    readonly actionType: number;
    isPositionDependent: boolean;
    constructor();
    equals(obj: unknown): boolean;
    hashCode(): number;
    /**
     * This action is implemented by calling {@link Lexer//popMode}.
     */
    execute(lexer: Lexer): void;
    toString(): string;
}
