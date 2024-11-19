import { EqualityComparator } from "../misc/EqualityComparator";
import { DFAState } from "./index";
/**
 * The comparator for DFA states.
 */
export declare class DFAStateEqualityComparator implements EqualityComparator<Partial<DFAState>> {
    static readonly instance: DFAStateEqualityComparator;
    hashCode(state: Partial<DFAState>): number;
    equals(a: Partial<DFAState>, b: Partial<DFAState>): boolean;
}
