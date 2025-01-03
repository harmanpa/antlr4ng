import { Lexer } from "../Lexer";
import { ATN } from "./ATN";
import { ATNSimulator } from "./ATNSimulator";
import { DFA } from "../dfa/DFA";
import { PredictionContextCache } from "./PredictionContextCache";
import { CharStream } from "../CharStream";
export declare class LexerATNSimulator extends ATNSimulator {
    #private;
    static debug: boolean;
    readonly decisionToDFA: DFA[];
    readonly recognizer: Lexer | null;
    /**
     * The current token's starting index into the character stream.
     *  Shared across DFA to ATN simulation in case the ATN fails and the
     *  DFA did not have a previous accept state. In this case, we use the
     *  ATN-generated exception object.
     */
    startIndex: number;
    /** line number 1..n within the input */
    line: number;
    /** The index of the character relative to the beginning of the line 0..n-1 */
    column: number;
    mode: number;
    /**
     * When we hit an accept state in either the DFA or the ATN, we
     * have to notify the character stream to start buffering characters
     * via {@link IntStream//mark} and record the current state. The current sim state
     * includes the current index into the input, the current line,
     * and current character position in that line. Note that the Lexer is
     * tracking the starting line and characterization of the token. These
     * variables track the "state" of the simulator when it hits an accept state.
     *
     * We track these variables separately for the DFA and ATN simulation
     * because the DFA simulation often has to fail over to the ATN
     * simulation. If the ATN simulation fails, we need the DFA to fall
     * back to its previously accepted state, if any. If the ATN succeeds,
     * then the ATN does the accept and the DFA simulator that invoked it
     * can simply return the predicted token type.
     */
    constructor(recog: Lexer | null, atn: ATN, decisionToDFA: DFA[], sharedContextCache?: PredictionContextCache);
    match(input: CharStream, mode: number): number;
    reset(): void;
    clearDFA(): void;
    getDFA(mode: number): DFA;
    /** @returns the text matched so far for the current token. */
    getText(input: CharStream): string;
    consume(input: CharStream): void;
    getTokenName(tt: number): string;
    private matchATN;
    private execATN;
    /**
     * Get an existing target state for an edge in the DFA. If the target state
     * for the edge has not yet been computed or is otherwise not available,
     * this method returns `null`.
     *
     * @param s The current DFA state.
     * @param t The next input symbol.
     *
     * @returns The existing target DFA state for the given input symbol
     * `t`, or `null` if the target state for this edge is not already cached
     */
    private getExistingTargetState;
    /**
     * Compute a target state for an edge in the DFA, and attempt to add the computed state and corresponding
     * edge to the DFA.
     *
     * @param input The input stream
     * @param s The current DFA state
     * @param t The next input symbol
     *
     * @returns The computed target DFA state for the given input symbol `t`.
     *          If `t` does not lead to a valid DFA state, this method returns `ERROR`.
     */
    private computeTargetState;
    private failOrAccept;
    /**
     * Given a starting configuration set, figure out all ATN configurations we can reach upon input `t`.
     * Parameter `reach` is a return parameter.
     */
    private getReachableConfigSet;
    private accept;
    private getReachableTarget;
    private computeStartState;
    /**
     * Since the alternatives within any lexer decision are ordered by
     * preference, this method stops pursuing the closure as soon as an accept
     * state is reached. After the first accept state is reached by depth-first
     * search from `config`, all other (potentially reachable) states for
     * this rule would have a lower priority.
     *
     * @returns {boolean} `true` if an accept state is reached, otherwise `false`.
     */
    private closure;
    private getEpsilonTarget;
    /**
     * Fills the lookup table for creating lexer ATN configs. This helps to avoid frequent checks of the transition
     * type, which determines the configuration of the created config.
     */
    private setupATNFactoryLookup;
    /**
     * Evaluate a predicate specified in the lexer.
     *
     * If `speculative` is `true`, this method was called before
     * {@link consume} for the matched character. This method should call
     * {@link consume} before evaluating the predicate to ensure position
     * sensitive values, including {@link Lexer//getText}, {@link Lexer//getLine},
     * and {@link Lexer}, properly reflect the current
     * lexer state. This method should restore `input` and the simulator
     * to the original state before returning (i.e. undo the actions made by the
     * call to {@link consume}.
     *
     * @param input The input stream.
     * @param ruleIndex The rule containing the predicate.
     * @param predIndex The index of the predicate within the rule.
     * @param speculative `true` if the current index in `input` is
     * one character before the predicate's location.
     *
     * @returns `true` if the specified predicate evaluates to
     * `true`.
     */
    private evaluatePredicate;
    private captureSimState;
    private addDFAEdge;
    /**
     * Add a new DFA state if there isn't one with this set of configurations already. This method also detects
     * the first configuration containing an ATN rule stop state. Later, when traversing the DFA, we will know
     * which rule to accept.
     */
    private addDFAState;
}
