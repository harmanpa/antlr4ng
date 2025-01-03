import type { IComparable } from "../utils/helpers";
import type { EqualityComparator } from "./EqualityComparator";
/**
 * Since `HashMap` is implemented on top of `HashSet`, we defined a bucket type which can store a
 * key-value pair. The value is optional since looking up values in the map by a key only needs to include the key.
 */
export interface Bucket<K extends IComparable, V> {
    key: K;
    value?: V;
}
export declare class MapKeyEqualityComparator<K extends IComparable, V> implements EqualityComparator<Bucket<K, V>> {
    private readonly keyComparator;
    constructor(keyComparator: EqualityComparator<K>);
    hashCode(obj: Bucket<K, V>): number;
    equals(a: Bucket<K, V>, b: Bucket<K, V>): boolean;
}
