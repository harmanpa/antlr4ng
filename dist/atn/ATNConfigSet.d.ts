import { SemanticContext } from "./SemanticContext";
import { ATNConfig } from "./ATNConfig";
import { BitSet } from "../misc/BitSet";
import { DoubleDict } from "../utils/DoubleDict";
import { PredictionContext } from "./PredictionContext";
import { ATNState } from "./ATNState";
import { ATNSimulator } from "./ATNSimulator";
import { HashSet } from "../misc/HashSet";
/**
 * Specialized {@link HashSet}`<`{@link ATNConfig}`>` that can track
 * info about the set, with support for combining similar configurations using a
 * graph-structured stack
 */
export declare class ATNConfigSet {
    #private;
    /**
     * The reason that we need this is because we don't want the hash map to use
     * the standard hash code and equals. We need all configurations with the
     * same
     * `(s,i,_,semctx)` to be equal. Unfortunately, this key effectively
     * doubles
     * the number of objects associated with ATNConfigs. The other solution is
     * to
     * use a hash table that lets us specify the equals/hashCode operation.
     * All configs but hashed by (s, i, _, pi) not including context. Wiped out
     * when we go readonly as this set becomes a DFA state
     */
    configLookup: HashSet<ATNConfig> | null;
    configs: ATNConfig[];
    uniqueAlt: number;
    /**
     * Used in parser and lexer. In lexer, it indicates we hit a pred
     * while computing a closure operation. Don't make a DFA state from this
     */
    hasSemanticContext: boolean;
    dipsIntoOuterContext: boolean;
    /**
     * Indicates that this configuration set is part of a full context
     * LL prediction. It will be used to determine how to merge $. With SLL
     * it's a wildcard whereas it is not for LL context merge
     */
    readonly fullCtx: boolean;
    /**
     * Indicates that the set of configurations is read-only. Do not
     * allow any code to manipulate the set; DFA states will point at
     * the sets and they must not change. This does not protect the other
     * fields; in particular, conflictingAlts is set after
     * we've made this readonly
     */
    readOnly: boolean;
    conflictingAlts: BitSet | null;
    /**
     * Tracks the first config that has a rule stop state. Avoids frequent linear search for that, when adding
     * a DFA state in the lexer ATN simulator.
     */
    firstStopState?: ATNConfig;
    constructor(fullCtxOrOldSet?: boolean | ATNConfigSet);
    [Symbol.iterator](): IterableIterator<ATNConfig>;
    /**
     * Adding a new config means merging contexts with existing configs for
     * `(s, i, pi, _)`, where `s` is the {@link ATNConfig.state}, `i` is the {@link ATNConfig.alt}, and
     * `pi` is the {@link ATNConfig.semanticContext}. We use `(s,i,pi)` as key.
     *
     * This method updates {@link dipsIntoOuterContext} and
     * {@link hasSemanticContext} when necessary.
     */
    add(config: ATNConfig, mergeCache?: DoubleDict<PredictionContext, PredictionContext, PredictionContext> | null): void;
    /** Return a List holding list of configs */
    get elements(): ATNConfig[];
    /**
     * Gets the complete set of represented alternatives for the configuration set.
     *
     * @returns the set of represented alternatives in this configuration set
     */
    getAlts(): BitSet;
    getPredicates(): SemanticContext[];
    getStates(): HashSet<ATNState>;
    optimizeConfigs(interpreter: ATNSimulator): void;
    addAll(coll: ATNConfig[]): boolean;
    equals(other: ATNConfigSet): boolean;
    hashCode(): number;
    get length(): number;
    isEmpty(): boolean;
    contains(item: ATNConfig): boolean;
    containsFast(item: ATNConfig): boolean;
    clear(): void;
    setReadonly(readOnly: boolean): void;
    toString(): string;
    private computeHashCode;
}
