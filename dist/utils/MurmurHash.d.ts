import { type IComparable } from "./helpers";
/** A class that implements the Murmur hash algorithm. */
export declare class MurmurHash {
    #private;
    private constructor();
    /**
     * Initialize the hash using the specified {@code seed}.
     *
     * @param seed the seed
     *
     * @returns the intermediate hash value
     */
    static initialize(seed?: number): number;
    static updateFromComparable(hash: number, value?: IComparable | null): number;
    /**
     * Update the intermediate hash value for the next input {@code value}.
     *
     * @param hash The intermediate hash value.
     * @param value the value to add to the current hash.
     *
     * @returns the updated intermediate hash value
     */
    static update(hash: number, value: number): number;
    /**
     * Apply the final computation steps to the intermediate value {@code hash}
     * to form the final result of the MurmurHash 3 hash function.
     *
     * @param hash The intermediate hash value.
     * @param entryCount The number of values added to the hash.
     *
     * @returns the final hash result
     */
    static finish(hash: number, entryCount: number): number;
    /**
     * An all-in-one convenience method to compute a hash for a single value.
     *
     * @param value The value to hash.
     * @param seed The seed for the hash value.
     *
     * @returns The computed hash.
     */
    static hashCode(value: number, seed?: number): number;
}
