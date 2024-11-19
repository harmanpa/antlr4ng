import { ParseTree } from "../ParseTree";
import { XPathElement } from "./XPathElement";
export declare class XPathRuleElement extends XPathElement {
    protected ruleIndex: number;
    constructor(ruleName: string, ruleIndex: number);
    evaluate(t: ParseTree): ParseTree[];
    toString(): string;
}
