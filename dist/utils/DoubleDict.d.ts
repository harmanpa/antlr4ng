import { IComparable } from "./helpers";
export declare class DoubleDict<Key1 extends IComparable, Key2 extends IComparable, Value> {
    private readonly cacheMap;
    constructor();
    get(a: Key1, b: Key2): Value | null;
    set(a: Key1, b: Key2, o: Value): void;
}
