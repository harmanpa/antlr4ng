import { PredictionContext } from "./PredictionContext";
import { SingletonPredictionContext } from "./SingletonPredictionContext";
import { ATN } from "./ATN";
import { PredictionContextCache } from "./PredictionContextCache";
import { DoubleDict } from "../utils/DoubleDict";
import { ParserRuleContext } from "../ParserRuleContext";
import { HashMap } from "../misc/HashMap";
/**
 * Convert a {@link RuleContext} tree to a {@link PredictionContext} graph.
 * Return {@link EMPTY} if `outerContext` is empty or null.
 */
export declare const predictionContextFromRuleContext: (atn: ATN, outerContext?: ParserRuleContext) => PredictionContext;
export declare const getCachedPredictionContext: (context: PredictionContext, contextCache: PredictionContextCache, visited: HashMap<PredictionContext, PredictionContext>) => PredictionContext;
export declare const merge: (a: PredictionContext, b: PredictionContext, rootIsWildcard: boolean, mergeCache: DoubleDict<PredictionContext, PredictionContext, PredictionContext> | null) => PredictionContext;
/**
 * Make pass over all *M* `parents`; merge any `equals()`
 * ones.
 */
export declare const combineCommonParents: (parents: Array<PredictionContext | null>) => void;
/**
 * Merge two {@link SingletonPredictionContext} instances.
 *
 * Stack tops equal, parents merge is same; return left graph.<br>
 * <embed src="images/SingletonMerge_SameRootSamePar.svg"
 * type="image/svg+xml"/>
 *
 * Same stack top, parents differ; merge parents giving array node, then
 * remainders of those graphs. A new root node is created to point to the
 * merged parents.<br>
 * <embed src="images/SingletonMerge_SameRootDiffPar.svg"
 * type="image/svg+xml"/>
 *
 * Different stack tops pointing to same parent. Make array node for the
 * root where both element in the root point to the same (original)
 * parent.<br>
 * <embed src="images/SingletonMerge_DiffRootSamePar.svg"
 * type="image/svg+xml"/>
 *
 * Different stack tops pointing to different parents. Make array node for
 * the root where each element points to the corresponding original
 * parent.<br>
 * <embed src="images/SingletonMerge_DiffRootDiffPar.svg"
 * type="image/svg+xml"/>
 *
 * @param a the first {@link SingletonPredictionContext}
 * @param b the second {@link SingletonPredictionContext}
 * @param rootIsWildcard `true` if this is a local-context merge,
 * otherwise false to indicate a full-context merge
 * @param mergeCache tbd
 */
export declare const mergeSingletons: (a: SingletonPredictionContext, b: SingletonPredictionContext, rootIsWildcard: boolean, mergeCache: DoubleDict<PredictionContext, PredictionContext, PredictionContext> | null) => PredictionContext;
/**
 * Handle case where at least one of `a` or `b` is
 * {@link EMPTY}. In the following diagrams, the symbol `$` is used
 * to represent {@link EMPTY}.
 *
 * <h2>Local-Context Merges</h2>
 *
 * These local-context merge operations are used when `rootIsWildcard`
 * is true.
 *
 * {@link EMPTY} is superset of any graph; return {@link EMPTY}.<br>
 * <embed src="images/LocalMerge_EmptyRoot.svg" type="image/svg+xml"/>
 *
 * {@link EMPTY} and anything is `//EMPTY`, so merged parent is
 * `//EMPTY`; return left graph.<br>
 * <embed src="images/LocalMerge_EmptyParent.svg" type="image/svg+xml"/>
 *
 * Special case of last merge if local context.<br>
 * <embed src="images/LocalMerge_DiffRoots.svg" type="image/svg+xml"/>
 *
 * <h2>Full-Context Merges</h2>
 *
 * These full-context merge operations are used when `rootIsWildcard`
 * is false.
 *
 * <embed src="images/FullMerge_EmptyRoots.svg" type="image/svg+xml"/>
 *
 * Must keep all contexts; {@link EMPTY} in array is a special value (and
 * null parent).<br>
 * <embed src="images/FullMerge_EmptyRoot.svg" type="image/svg+xml"/>
 *
 * <embed src="images/FullMerge_SameRoot.svg" type="image/svg+xml"/>
 *
 * @param a the first {@link SingletonPredictionContext}
 * @param b the second {@link SingletonPredictionContext}
 * @param rootIsWildcard `true` if this is a local-context merge,
 * otherwise false to indicate a full-context merge
 */
export declare const mergeRoot: (a: SingletonPredictionContext, b: SingletonPredictionContext, rootIsWildcard: boolean) => PredictionContext | null;
