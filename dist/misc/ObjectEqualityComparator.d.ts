import type { IComparable } from "../utils/helpers";
import { EqualityComparator } from "./EqualityComparator";
/**
 * This default implementation of {@link EqualityComparator} uses object equality
 * for comparisons by calling {@link Object.hashCode} and {@link Object.equals}.
 */
export declare class ObjectEqualityComparator implements EqualityComparator<IComparable> {
    static readonly instance: ObjectEqualityComparator;
    hashCode(obj: IComparable): number;
    equals(a: IComparable, b: IComparable): boolean;
}
