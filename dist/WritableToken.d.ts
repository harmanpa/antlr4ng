import { type Token } from "./Token";
/**
 * This interface provides access to all of the information about a token by
 * exposing the properties of the token as getter methods.
 */
export interface WritableToken extends Token {
    setText(text: string | null): void;
    setType(ttype: number): void;
    setLine(line: number): void;
    setCharPositionInLine(pos: number): void;
    setChannel(channel: number): void;
    setTokenIndex(index: number): void;
    toString(): string;
}
export declare const isWritableToken: (candidate: unknown) => candidate is WritableToken;
