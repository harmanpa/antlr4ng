import type { IComparable } from "../utils/helpers";
import { type EqualityComparator } from "./EqualityComparator";
export declare class HashMap<K extends IComparable, V> {
    private backingStore;
    constructor(keyComparer?: EqualityComparator<K>);
    constructor(map: HashMap<K, V>);
    clear(): void;
    containsKey(key: K): boolean;
    get(key: K): V | undefined;
    get isEmpty(): boolean;
    /**
     * Sets the value for a key in the map. If the key is not present in the map, it is added.
     * If the key is present, the value is updated and the old value is returned.
     *
     * @param key The key to set.
     * @param value The value to set.
     *
     * @returns The old value for the key, if present.
     */
    set(key: K, value: V): V | undefined;
    /**
     * Sets the value for a key in the map if the key is not already present. Otherwise the value is not changed and
     * the old value is returned.
     *
     * @param key The key to set.
     * @param value The value to set.
     *
     * @returns The current value for the key, if present.
     */
    setIfAbsent(key: K, value: V): V | undefined;
    values(): Iterable<V>;
    get size(): number;
    hashCode(): number;
    equals(o: HashMap<K, V>): boolean;
}
