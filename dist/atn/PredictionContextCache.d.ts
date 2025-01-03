import { PredictionContext } from "./PredictionContext";
/**
 * Used to cache {@link PredictionContext} objects. Its used for the shared
 * context cache associated with contexts in DFA states. This cache
 * can be used for both lexers and parsers.
 */
export declare class PredictionContextCache {
    private cache;
    /**
     * Add a context to the cache and return it. If the context already exists,
     * return that one instead and do not add a new context to the cache.
     * Protect shared cache from unsafe thread access.
     *
     * @param ctx tbd
     * @returns tbd
     */
    add(ctx: PredictionContext): PredictionContext;
    get(ctx: PredictionContext): PredictionContext | undefined;
    get length(): number;
}
