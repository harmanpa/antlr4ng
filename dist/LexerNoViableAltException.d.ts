import { ATNConfigSet } from "./atn/ATNConfigSet";
import { CharStream } from "./CharStream";
import { Lexer } from "./Lexer";
import { RecognitionException } from "./RecognitionException";
import { TokenStream } from "./TokenStream";
export declare class LexerNoViableAltException extends RecognitionException {
    startIndex: number;
    deadEndConfigs: ATNConfigSet;
    protected input: CharStream | null;
    constructor(lexer: Lexer | null, input: CharStream | TokenStream, startIndex: number, deadEndConfigs: ATNConfigSet);
    toString(): string;
}
