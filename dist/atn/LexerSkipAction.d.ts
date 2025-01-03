import { LexerAction } from "./LexerAction";
import { Lexer } from "../Lexer";
/**
 * Implements the `skip` lexer action by calling {@link Lexer//skip}.
 *
 * The `skip` command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link instance}.
 */
export declare class LexerSkipAction implements LexerAction {
    /** Provides a singleton instance of this parameter-less lexer action. */
    static readonly instance: LexerSkipAction;
    readonly actionType: number;
    isPositionDependent: boolean;
    constructor();
    equals(obj: unknown): boolean;
    hashCode(): number;
    execute(lexer: Lexer): void;
    toString(): string;
}
