import { DFA } from "./DFA";
import { DFASerializer } from "./DFASerializer";
export declare class LexerDFASerializer extends DFASerializer {
    constructor(dfa: DFA);
    getEdgeLabel: (i: number) => string;
}
