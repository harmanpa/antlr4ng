import { type CharStream } from "./CharStream";
import { type Token } from "./Token";
import { type TokenSource } from "./TokenSource";
export interface TokenFactory<Symbol extends Token> {
    /**
     * This is the method used to create tokens in the lexer and in the
     *  error handling strategy. If text!=null, than the start and stop positions
     *  are wiped to -1 in the text override is set in the CommonToken.
     */
    create(source: [TokenSource | null, CharStream | null], type: number, text: string | undefined, channel: number, start: number, stop: number, line: number, charPositionInLine: number): Symbol;
}
