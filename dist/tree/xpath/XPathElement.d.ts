import { ParseTree } from "../ParseTree";
export declare abstract class XPathElement {
    invert: boolean;
    protected nodeName?: string;
    /**
     * Construct element like `/ID` or `ID` or `/*` etc... `nodeName` is undefined if just node
     *
     * @param nodeName The name of the node; may be undefined for any node.
     */
    constructor(nodeName?: string);
    toString(): string;
    /**
     * Given tree rooted at `t` return all nodes matched by this path
     * element.
     */
    abstract evaluate(t: ParseTree): ParseTree[];
}
