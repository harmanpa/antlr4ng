import { LexerAction } from "./LexerAction";
import { Lexer } from "../Lexer";
/**
 * Implements the `more` lexer action by calling {@link Lexer//more}.
 *
 * The `more` command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link instance}.
 */
export declare class LexerMoreAction implements LexerAction {
    static readonly instance: LexerMoreAction;
    readonly actionType: number;
    isPositionDependent: boolean;
    constructor();
    equals(obj: unknown): boolean;
    hashCode(): number;
    /**
     * This action is implemented by calling {@link Lexer.popMode}.
     */
    execute(lexer: Lexer): void;
    toString(): string;
}
