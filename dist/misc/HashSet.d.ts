import { EqualityComparator } from "./EqualityComparator";
export declare class HashSet<T> implements Iterable<T> {
    #private;
    constructor(comparator?: EqualityComparator<T>, initialCapacity?: number);
    constructor(set: HashSet<T>);
    /**
     * Add `o` to set if not there; return existing value if already
     * there. This method performs the same operation as {@link #add} aside from
     * the return value.
     *
     * @param o the object to add to the set.
     *
     * @returns An existing element that equals to `o` if already in set, otherwise `o`.
     */
    getOrAdd(o: T): T;
    get(o: T): T | undefined;
    /**
     * Removes the specified element from this set if it is present.
     *
     * @param o object to be removed from this set, if present.
     *
     * @returns `true` if the set contained the specified element.
     */
    remove(o: T): boolean;
    hashCode(): number;
    equals(o: unknown): boolean;
    add(t: T): boolean;
    contains(o: T): boolean;
    containsFast(obj: T): boolean;
    [Symbol.iterator](): IterableIterator<T>;
    toArray(): T[];
    containsAll(collection: Iterable<T>): boolean;
    addAll(c: Iterable<T>): boolean;
    clear(): void;
    toString(): string;
    toTableString(): string;
    protected getBucket(o: T): number;
    protected expand(): void;
    get size(): number;
    get isEmpty(): boolean;
    /**
     * Return an array of `T[]` with length `capacity`.
     *
     * @param capacity the length of the array to return
     * @returns the newly constructed array
     */
    private createBuckets;
}
