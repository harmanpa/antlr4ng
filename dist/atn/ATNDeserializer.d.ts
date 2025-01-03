import { ATN } from "./ATN";
import { ATNDeserializationOptions } from "./ATNDeserializationOptions";
export declare class ATNDeserializer {
    static readonly SERIALIZED_VERSION = 4;
    private static stateTypeMapper;
    private static readonly lexerActionFactoryMapper;
    private data;
    private pos;
    private readonly deserializationOptions;
    private actionFactories;
    constructor(options?: ATNDeserializationOptions);
    deserialize(data: number[]): ATN;
    private checkVersion;
    private readATN;
    private readStates;
    private readRules;
    private readModes;
    private readSets;
    private readEdges;
    private readDecisions;
    private readLexerActions;
    private generateRuleBypassTransitions;
    private generateRuleBypassTransition;
    private stateIsEndStateFor;
    /**
     * Analyze the {@link StarLoopEntryState} states in the specified ATN to set
     * the {@link StarLoopEntryState} field to the correct value.
     *
     * @param atn The ATN.
     */
    private markPrecedenceDecisions;
    private verifyATN;
    private checkCondition;
    private edgeFactory;
    private stateFactory;
    private lexerActionFactory;
}
