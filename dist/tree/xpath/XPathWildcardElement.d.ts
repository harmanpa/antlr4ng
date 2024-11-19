import { ParseTree } from "../ParseTree";
import { XPathElement } from "./XPathElement";
export declare class XPathWildcardElement extends XPathElement {
    constructor();
    evaluate(t: ParseTree): ParseTree[];
    toString(): string;
}
