import { Transition } from "./Transition";
import { ATNState } from "./ATNState";
export declare class EpsilonTransition extends Transition {
    #private;
    constructor(target: ATNState, outermostPrecedenceReturn?: number);
    /**
     * @returns the rule index of a precedence rule for which this transition is
     * returning from, where the precedence value is 0; otherwise, -1.
     *
     * @see ATNConfig.isPrecedenceFilterSuppressed()
     * @see ParserATNSimulator.applyPrecedenceFilter(ATNConfigSet)
     * @since 4.4.1
     */
    get outermostPrecedenceReturn(): number;
    get isEpsilon(): boolean;
    get transitionType(): number;
    matches(): boolean;
    toString(): string;
}
