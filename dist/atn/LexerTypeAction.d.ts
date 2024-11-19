import { LexerAction } from "./LexerAction";
import { Lexer } from "../Lexer";
/**
 * Implements the `type` lexer action by calling {@link Lexer.setType} with the assigned type.
 */
export declare class LexerTypeAction implements LexerAction {
    #private;
    readonly type: number;
    readonly actionType: number;
    isPositionDependent: boolean;
    constructor(type: number);
    execute(lexer: Lexer): void;
    hashCode(): number;
    equals(other: unknown): boolean;
    toString(): string;
}
