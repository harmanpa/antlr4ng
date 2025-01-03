import { Vocabulary } from "../Vocabulary";
import { ATN } from "../atn/ATN";
/** The data in an interpreter file. */
export interface IInterpreterData {
    atn: ATN;
    vocabulary: Vocabulary;
    ruleNames: string[];
    /** Only valid for lexer grammars. Lists the defined lexer channels. */
    channels?: string[];
    /** Only valid for lexer grammars. Lists the defined lexer modes. */
    modes?: string[];
}
export declare class InterpreterDataReader {
    /**
     * The structure of the data file is very simple. Everything is line based with empty lines
     * separating the different parts. For lexers the layout is:
     * token literal names:
     * ...
     *
     * token symbolic names:
     * ...
     *
     * rule names:
     * ...
     *
     * channel names:
     * ...
     *
     * mode names:
     * ...
     *
     * atn:
     * a single line with comma separated int values, enclosed in a pair of squared brackets.
     *
     * Data for a parser does not contain channel and mode names.
     */
    static parseInterpreterData(source: string): IInterpreterData;
}
