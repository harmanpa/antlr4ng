import { Chunk } from "./Chunk";
/**
 * Represents a placeholder tag in a tree pattern. A tag can have any of the
 * following forms.
 *
 * - `expr`: An unlabeled placeholder for a parser rule `expr`.
 * - `ID`: An unlabeled placeholder for a token of type `ID`.
 * - `e:expr`: A labeled placeholder for a parser rule `expr`.
 * - `id:ID`: A labeled placeholder for a token of type `ID`.
 *
 * This class does not perform any validation on the tag or label names aside
 * from ensuring that the tag is a non-null, non-empty string.
 */
export declare class TagChunk extends Chunk {
    readonly tag: string;
    readonly label?: string;
    /**
     * Construct a new instance of {@link TagChunk} using the specified tag and
     * no label.
     *
     * @param tag The tag, which should be the name of a parser rule or token
     * type.
     *
     * @throws IllegalArgumentException if `tag` is `null` or
     * empty.
     */
    constructor(tag?: string);
    /**
     * Construct a new instance of {@link TagChunk} using the specified label
     * and tag.
     *
     * @param label The label for the tag. If this is `null`, the
     * {@link TagChunk} represents an unlabeled tag.
     * @param tag The tag, which should be the name of a parser rule or token
     * type.
     *
     * @throws IllegalArgumentException if `tag` is `null` or
     * empty.
     */
    constructor(label: string | undefined, tag: string);
    /**
     * @returns a text representation of the tag chunk. Labeled tags
     * are returned in the form `label:tag`, and unlabeled tags are
     * returned as just the tag name.
     */
    toString(): string;
}
