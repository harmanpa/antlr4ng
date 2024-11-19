import { DFA } from "./DFA";
import { DFAState } from "./DFAState";
import { Vocabulary } from "../Vocabulary";
/** A DFA walker that knows how to dump them to serialized strings. */
export declare class DFASerializer {
    private readonly dfa;
    private readonly vocabulary;
    constructor(dfa: DFA, vocabulary: Vocabulary);
    toString(): string;
    protected getEdgeLabel(i: number): string;
    protected getStateString(s: DFAState): string;
}
