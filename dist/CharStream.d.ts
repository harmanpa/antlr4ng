import { type Interval } from "./misc/Interval";
import { IntStream } from "./IntStream";
export interface CharStream extends IntStream {
    name: string;
    /**
     * Reset the stream so that it's in the same state it was
     * when the object was created *except* the data array is not
     * touched.
     */
    reset(): void;
    /**
     * get a substring from the stream at start to stop (inclusive).
     *
     * @param start Start index
     * @param stop Stop index
     */
    getTextFromRange(start: number, stop: number): string;
    /**
     * get a substring from the stream at specified interval (inclusive).
     *
     * @param interval
     */
    getTextFromInterval(interval: Interval): string;
}
export declare namespace CharStream {
    const fromString: (str: string) => CharStream;
}
export declare class CharStreamImpl implements CharStream {
    #private;
    name: string;
    index: number;
    private data;
    constructor(input: string);
    /**
     * Reset the stream so that it's in the same state it was
     * when the object was created *except* the data array is not
     * touched.
     */
    reset(): void;
    consume(): void;
    LA(offset: number): number;
    mark(): number;
    release(_marker: number): void;
    /**
     * consume() ahead until p==_index; can't just set p=_index as we must
     * update line and column. If we seek backwards, just set p
     */
    seek(index: number): void;
    getTextFromRange(start: number, stop?: number): string;
    getTextFromInterval(interval: Interval): string;
    toString(): string;
    get size(): number;
    getSourceName(): string;
}
