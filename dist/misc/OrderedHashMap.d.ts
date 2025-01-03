import type { IComparable } from "../utils/helpers";
import { HashMap } from "./HashMap";
/**
 * This class extends `HashMap` to maintain the insertion order of the keys.
 */
export declare class OrderedHashMap<K extends IComparable, V> extends HashMap<K, V> {
    #private;
    clear(): void;
    get(key: K): V | undefined;
    set(key: K, value: V): V | undefined;
    setIfAbsent(key: K, value: V): V | undefined;
    /**
     * @returns an iterable of the values in the map, in the order they were inserted.
     */
    values(): Iterable<V>;
    /**
     * @returns an iterable of the keys in the map, in the order they were inserted.
     */
    keys(): IterableIterator<K>;
    equals(o: unknown): boolean;
}
