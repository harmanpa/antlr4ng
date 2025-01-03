import { Interval } from "./Interval";
import { Vocabulary } from "../Vocabulary";
/**
 * This class implements the `IntSet` backed by a sorted array of
 * non-overlapping intervals. It is particularly efficient for representing
 * large collections of numbers, where the majority of elements appear as part
 * of a sequential range of numbers that are all part of the set. For example,
 * the set { 1, 2, 3, 4, 7, 8 } may be represented as { [1, 4], [7, 8] }.
 *
 * This class is able to represent sets containing any combination of values in
 * the range {@link Integer#MIN_VALUE} to {@link Integer#MAX_VALUE}
 * (inclusive).
 */
export declare class IntervalSet {
    #private;
    constructor(set?: IntervalSet);
    /** Create a set with all ints within range [a..b] (inclusive) */
    static of(a: number, b: number): IntervalSet;
    /** Combine all sets in the array and return the union of them */
    static or(sets: IntervalSet[]): IntervalSet;
    [Symbol.iterator](): IterableIterator<Interval>;
    get(index: number): Interval;
    /**
     * Returns the minimum value contained in the set if not isNil().
     *
     * @returns the minimum value contained in the set.
     */
    get minElement(): number;
    /**
     * Returns the maximum value contained in the set if not isNil().
     *
     * @returns the maximum value contained in the set.
     */
    get maxElement(): number;
    clear(): void;
    /**
     * Add a single element to the set.  An isolated element is stored
     *  as a range el..el.
     */
    addOne(v: number): void;
    /**
     * Add interval; i.e., add all integers from a to b to set.
     *  If b < a, do nothing.
     *  Keep list in sorted order (by left range value).
     *  If overlap, combine ranges. For example,
     *  If this is {1..5, 10..20}, adding 6..7 yields
     *  {1..5, 6..7, 10..20}. Adding 4..8 yields {1..8, 10..20}.
     */
    addRange(l: number, h: number): void;
    addInterval(addition: Interval): void;
    addSet(other: IntervalSet): this;
    complementWithVocabulary(vocabulary?: IntervalSet): IntervalSet;
    complement(minElement: number, maxElement: number): IntervalSet;
    /** combine all sets in the array returned the or'd value */
    or(sets: IntervalSet[]): IntervalSet;
    and(other: IntervalSet): IntervalSet;
    /**
     * Compute the set difference between two interval sets. The specific
     * operation is `left - right`. If either of the input sets is
     * `null`, it is treated as though it was an empty set.
     */
    subtract(other: IntervalSet): IntervalSet;
    contains(el: number): boolean;
    removeRange(toRemove: Interval): void;
    removeOne(value: number): void;
    hashCode(): number;
    /**
     * Are two IntervalSets equal? Because all intervals are sorted and disjoint, equals is a simple linear walk over
     * both lists to make sure they are the same. Interval.equals() is used by the List.equals() method to check
     * the ranges.
     */
    equals(other: IntervalSet): boolean;
    toString(elementsAreChar?: boolean): string;
    toStringWithVocabulary(vocabulary: Vocabulary): string;
    toStringWithRuleNames(ruleNames: string[]): string;
    toArray(): number[];
    /** @returns the number of elements in this set. */
    get length(): number;
    private elementName;
}
