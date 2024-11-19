import { ATNConfig } from "./ATNConfig";
import { LexerActionExecutor } from "./LexerActionExecutor";
import { ATNState } from "./ATNState";
import { PredictionContext } from "./PredictionContext";
export declare class LexerATNConfig extends ATNConfig {
    /**
     * This is the backing field for {@link #getLexerActionExecutor}.
     */
    readonly lexerActionExecutor: LexerActionExecutor | null;
    readonly passedThroughNonGreedyDecision: boolean;
    constructor(config: Partial<LexerATNConfig>, state: ATNState, context: PredictionContext | null, lexerActionExecutor: LexerActionExecutor | null);
    static createWithExecutor(config: LexerATNConfig, state: ATNState, lexerActionExecutor: LexerActionExecutor | null): LexerATNConfig;
    static createWithConfig(state: ATNState, config: LexerATNConfig, context?: PredictionContext): LexerATNConfig;
    static createWithContext(state: ATNState, alt: number, context: PredictionContext): LexerATNConfig;
    private static checkNonGreedyDecision;
    hashCode(): number;
    equals(other: LexerATNConfig): boolean;
}
