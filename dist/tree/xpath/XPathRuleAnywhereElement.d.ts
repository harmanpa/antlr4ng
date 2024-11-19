import { ParseTree } from "../ParseTree";
import { XPathElement } from "./XPathElement";
/**
 * Either `ID` at start of path or `...//ID` in middle of path.
 */
export declare class XPathRuleAnywhereElement extends XPathElement {
    protected ruleIndex: number;
    constructor(ruleName: string, ruleIndex: number);
    evaluate(t: ParseTree): ParseTree[];
    toString(): string;
}
