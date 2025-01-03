import { LexerAction } from "./LexerAction";
import { Lexer } from "../Lexer";
/**
 * Executes a custom lexer action by calling {@link Recognizer.action} with the
 * rule and action indexes assigned to the custom action. The implementation of
 * a custom action is added to the generated code for the lexer in an override
 * of {@link Recognizer//action} when the grammar is compiled.
 *
 * This class may represent embedded actions created with the `{...}`
 * syntax in ANTLR 4, as well as actions created for lexer commands where the
 * command argument could not be evaluated when the grammar was compiled.
 */
export declare class LexerCustomAction implements LexerAction {
    #private;
    readonly ruleIndex: number;
    readonly actionIndex: number;
    readonly actionType: number;
    isPositionDependent: boolean;
    /**
     * Constructs a custom lexer action with the specified rule and action indexes.
     *
     * @param ruleIndex The rule index to use for calls to {@link Recognizer.action}.
     * @param actionIndex The action index to use for calls to {@link Recognizer.action}.
     */
    constructor(ruleIndex: number, actionIndex: number);
    /**
     * Custom actions are implemented by calling {@link Lexer.action} with the
     * appropriate rule and action indexes.
     */
    execute(lexer: Lexer): void;
    hashCode(): number;
    equals(other: unknown): boolean;
}
