import { LexerAction } from "./LexerAction";
import { Lexer } from "../Lexer";
/**
 * Implements the `channel` lexer action by calling
 * {@link Lexer.setChannel} with the assigned channel.
 * Constructs a new `channel` action with the specified channel value.
 *
 * @param channel The channel value to pass to {@link Lexer.setChannel}
 */
export declare class LexerChannelAction implements LexerAction {
    #private;
    readonly channel: number;
    readonly actionType: number;
    isPositionDependent: boolean;
    constructor(channel: number);
    /**
     * This action is implemented by calling {@link Lexer.setChannel} with the
     * value provided by {@link getChannel}.
     */
    execute(lexer: Lexer): void;
    hashCode(): number;
    equals(other: unknown): boolean;
    toString(): string;
}
