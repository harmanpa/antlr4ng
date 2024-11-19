import { ParseTree } from "../ParseTree";
import { XPathElement } from "./XPathElement";
export declare class XPathTokenElement extends XPathElement {
    protected tokenType: number;
    constructor(tokenName: string, tokenType: number);
    evaluate(t: ParseTree): ParseTree[];
    toString(): string;
}
