import { LexerAction } from "./LexerAction";
import { Lexer } from "../Lexer";
/**
 * This implementation of {@link LexerAction} is used for tracking input offsets
 * for position-dependent actions within a {@link LexerActionExecutor}.
 *
 * This action is not serialized as part of the ATN, and is only required for
 * position-dependent lexer actions which appear at a location other than the
 * end of a rule. For more information about DFA optimizations employed for
 * lexer actions, see {@link LexerActionExecutor//append} and
 * {@link LexerActionExecutor//fixOffsetBeforeMatch}.
 *
 * Constructs a new indexed custom action by associating a character offset
 * with a {@link LexerAction}.
 *
 * Note: This class is only required for lexer actions for which
 * {@link LexerAction//isPositionDependent} returns `true`.
 *
 * @param offset The offset into the input {@link CharStream}, relative to
 * the token start index, at which the specified lexer action should be
 * executed.
 * @param action The lexer action to execute at a particular offset in the
 * input {@link CharStream}.
 */
export declare class LexerIndexedCustomAction implements LexerAction {
    #private;
    readonly offset: number;
    readonly action: LexerAction;
    readonly actionType: number;
    isPositionDependent: boolean;
    constructor(offset: number, action: LexerAction);
    /**
     * This method calls {@link execute} on the result of {@link getAction}
     * using the provided `lexer`.
     */
    execute(lexer: Lexer): void;
    hashCode(): number;
    equals(other: unknown): boolean;
}
