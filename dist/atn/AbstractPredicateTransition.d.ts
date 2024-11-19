import { ATNState } from "./ATNState";
import { Transition } from "./Transition";
/** Used as base for PredicateTransition and PrecedencePredicateTransition, without adding their individual fields. */
export declare abstract class AbstractPredicateTransition extends Transition {
    constructor(target: ATNState);
}
