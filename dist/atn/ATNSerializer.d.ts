import { ATN } from "./ATN";
/**
 * This class represents a target neutral serializer for ATNs. An ATN is converted to a list of integers
 *  that can be converted back to and ATN. We compute the list of integers and then generate an array
 *  into the target language for a particular lexer or parser.  Java is a special case where we must
 *  generate strings instead of arrays, but that is handled outside of this class.
 */
export declare class ATNSerializer {
    atn: ATN;
    private readonly data;
    private sets;
    private readonly nonGreedyStates;
    private readonly precedenceStates;
    constructor(atn: ATN);
    static getSerialized(atn: ATN): number[];
    private static serializeSets;
    /**
     * Serialize state descriptors, edge descriptors, and decision -> state map
     *  into list of ints.  Likely out of date, but keeping as it could be helpful:
     *
     *      SERIALIZED_VERSION
     *      UUID (2 longs)
     * 		grammar-type, (ANTLRParser.LEXER, ...)
     *  	max token type,
     *  	num states,
     *  	state-0-type ruleIndex, state-1-type ruleIndex, ... state-i-type ruleIndex optional-arg ...
     *  	num rules,
     *  	rule-1-start-state rule-1-args, rule-2-start-state  rule-2-args, ...
     *  	(args are token type,actionIndex in lexer else 0,0)
     *      num modes,
     *      mode-0-start-state, mode-1-start-state, ... (parser has 0 modes)
     *      num unicode-bmp-sets
     *      bmp-set-0-interval-count intervals, bmp-set-1-interval-count intervals, ...
     *      num unicode-smp-sets
     *      smp-set-0-interval-count intervals, smp-set-1-interval-count intervals, ...
     *	num total edges,
     *      src, trg, edge-type, edge arg1, optional edge arg2 (present always), ...
     *      num decisions,
     *      decision-0-start-state, decision-1-start-state, ...
     *
     *  Convenient to pack into unsigned shorts to make as Java string.
     */
    serialize(): number[];
    private addPreamble;
    private addLexerActions;
    private addDecisionStartStates;
    private addEdges;
    private addSets;
    private addModeStartStates;
    private addRuleStatesAndLexerTokenTypes;
    private addPrecedenceStates;
    private addNonGreedyStates;
}
