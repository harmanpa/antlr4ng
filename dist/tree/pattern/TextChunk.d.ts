import { Chunk } from "./Chunk";
/**
 * Represents a span of raw text (concrete syntax) between tags in a tree
 * pattern string.
 */
export declare class TextChunk extends Chunk {
    readonly text: string;
    /**
     * Constructs a new instance of {@link TextChunk} with the specified text.
     *
     * @param text The text of this chunk.
     */
    constructor(text: string);
    /**
     * @returns the result of {@link #getText()} in single quotes.
     */
    toString(): string;
}
