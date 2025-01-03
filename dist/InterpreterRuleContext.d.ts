import { ParserRuleContext } from "./ParserRuleContext";
/**
 * This class extends {@link ParserRuleContext} by allowing the value of
 * {@link getRuleIndex} to be explicitly set for the context.
 *
 * {@link ParserRuleContext} does not include field storage for the rule index
 * since the context classes created by the code generator override the
 * {@link getRuleIndex} method to return the correct value for that context.
 * Since the parser interpreter does not use the context classes generated for a
 * parser, this class (with slightly more memory overhead per node) is used to
 * provide equivalent functionality.
 */
export declare class InterpreterRuleContext extends ParserRuleContext {
    #private;
    constructor(ruleIndex: number, parent: ParserRuleContext | null, invokingStateNumber?: number);
    get ruleIndex(): number;
}
