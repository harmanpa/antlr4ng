import { EqualityComparator } from "./EqualityComparator";
/**
 * This default implementation of {@link EqualityComparator} uses object equality
 * for comparisons, but is optimized for null/undefined, string, and number values.
 */
export declare class DefaultEqualityComparator implements EqualityComparator<unknown> {
    static readonly instance: DefaultEqualityComparator;
    hashCode(obj: unknown): number;
    equals(a: unknown, b: unknown): boolean;
}
