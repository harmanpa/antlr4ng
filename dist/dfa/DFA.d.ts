import { DFAState } from "./DFAState";
import { Vocabulary } from "../Vocabulary";
import { DecisionState } from "../atn/DecisionState";
import type { ATNConfigSet } from "../index";
export declare class DFA {
    #private;
    s0?: DFAState;
    readonly decision: number;
    /** From which ATN state did we create this DFA? */
    readonly atnStartState: DecisionState | null;
    /**
     * Gets whether this DFA is a precedence DFA. Precedence DFAs use a special
     * start state {@link #s0} which is not stored in {@link #states}. The
     * {@link DFAState#edges} array for this start state contains outgoing edges
     * supplying individual start states corresponding to specific precedence
     * values.
     *
     * @returns `true` if this is a precedence DFA; otherwise, `false`.
     */
    readonly isPrecedenceDfa: boolean;
    constructor(atnStartState: DecisionState | null, decision?: number);
    [Symbol.iterator]: () => Iterator<DFAState>;
    /**
     * Get the start state for a specific precedence value.
     *
     * @param precedence The current precedence.
      @returns The start state corresponding to the specified precedence, or
     * `null` if no start state exists for the specified precedence.
     *
     * @throws IllegalStateException if this is not a precedence DFA.
     * @see #isPrecedenceDfa
     */
    readonly getPrecedenceStartState: (precedence: number) => DFAState | undefined;
    /**
     * Set the start state for a specific precedence value.
     *
     * @param precedence The current precedence.
     * @param startState The start state corresponding to the specified precedence.
     */
    readonly setPrecedenceStartState: (precedence: number, startState: DFAState) => void;
    /**
     * @returns a list of all states in this DFA, ordered by state number.
     */
    getStates(): DFAState[];
    getState(state: DFAState): DFAState | null;
    getStateForConfigs(configs: ATNConfigSet): DFAState | null;
    addState(state: DFAState): void;
    toString(vocabulary?: Vocabulary): string;
    toLexerString(): string;
    get length(): number;
}
