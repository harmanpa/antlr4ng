import type { IComparable } from "../utils/helpers";
import { HashSet } from "./HashSet";
export declare class OrderedHashSet<T extends IComparable> extends HashSet<T> {
    #private;
    getOrAdd(o: T): T;
    equals(o: unknown): boolean;
    add(element: T): boolean;
    clear(): void;
    [Symbol.iterator](): IterableIterator<T>;
    toArray(): T[];
}
