import { Lexer } from "./Lexer";
import { ATN } from "./atn/ATN";
import { Vocabulary } from "./Vocabulary";
import { CharStream } from "./CharStream";
export declare class LexerInterpreter extends Lexer {
    #private;
    constructor(grammarFileName: string, vocabulary: Vocabulary, ruleNames: string[], channelNames: string[], modeNames: string[], atn: ATN, input: CharStream);
    get atn(): ATN;
    get grammarFileName(): string;
    get ruleNames(): string[];
    get channelNames(): string[];
    get modeNames(): string[];
    get vocabulary(): Vocabulary;
}
