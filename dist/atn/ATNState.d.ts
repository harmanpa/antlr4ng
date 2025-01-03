import { IntervalSet } from "../misc/IntervalSet";
import { IComparable } from "../utils/helpers";
import { Transition } from "./Transition";
export declare class ATNState implements IComparable {
    static readonly INVALID_STATE_NUMBER = -1;
    static readonly INVALID_TYPE = 0;
    static readonly BASIC = 1;
    static readonly RULE_START = 2;
    static readonly BLOCK_START = 3;
    static readonly PLUS_BLOCK_START = 4;
    static readonly STAR_BLOCK_START = 5;
    static readonly TOKEN_START = 6;
    static readonly RULE_STOP = 7;
    static readonly BLOCK_END = 8;
    static readonly STAR_LOOP_BACK = 9;
    static readonly STAR_LOOP_ENTRY = 10;
    static readonly PLUS_LOOP_BACK = 11;
    static readonly LOOP_END = 12;
    static readonly stateType: number;
    stateNumber: number;
    ruleIndex: number;
    epsilonOnlyTransitions: boolean;
    /** Used to cache lookahead during parsing, not used during construction */
    nextTokenWithinRule?: IntervalSet;
    /** Track the transitions emanating from this ATN state. */
    transitions: Transition[];
    hashCode(): number;
    equals(other: ATNState): boolean;
    toString(): string;
    addTransitionAtIndex(index: number, transition: Transition): void;
    addTransition(transition: Transition): void;
    setTransition(i: number, e: Transition): void;
    removeTransition(index: number): Transition;
}
