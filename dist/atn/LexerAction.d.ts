import { Lexer } from "../Lexer";
import type { IComparable } from "../index";
/**
 * Represents a single action which can be executed following the successful
 * match of a lexer rule. Lexer actions are used for both embedded action syntax
 * and ANTLR 4's new lexer command syntax.
 */
export interface LexerAction extends IComparable {
    readonly actionType: number;
    isPositionDependent: boolean;
    execute(lexer: Lexer): void;
    toString(): string;
}
