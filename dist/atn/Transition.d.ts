import { IntervalSet } from "../misc/IntervalSet";
import { ATNState } from "./ATNState";
/**
 * An ATN transition between any two ATN states.  Subclasses define
 * atom, set, epsilon, action, predicate, rule transitions.
 *
 * This is a one way link.  It emanates from a state (usually via a list of
 * transitions) and has a target state.
 *
 * Since we never have to change the ATN transitions once we construct it,
 * we can fix these transitions as specific classes. The DFA transitions
 * on the other hand need to update the labels as it adds transitions to
 * the states. We'll use the term Edge for the DFA to distinguish them from
 * ATN transitions.
 */
export declare abstract class Transition {
    static readonly INVALID = 0;
    static readonly EPSILON = 1;
    static readonly RANGE = 2;
    static readonly RULE = 3;
    static readonly PREDICATE = 4;
    static readonly ATOM = 5;
    static readonly ACTION = 6;
    static readonly SET = 7;
    static readonly NOT_SET = 8;
    static readonly WILDCARD = 9;
    static readonly PRECEDENCE = 10;
    /** The target of this transition. */
    target: ATNState;
    constructor(target: ATNState);
    /**
     * Determines if the transition is an "epsilon" transition.
     *
     * The default implementation returns `false`.
     *
     * @returns `true` if traversing this transition in the ATN does not
     * consume an input symbol; otherwise, `false` if traversing this
     * transition consumes (matches) an input symbol.
     */
    get isEpsilon(): boolean;
    get label(): IntervalSet | null;
    abstract get transitionType(): number;
    abstract matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
}
