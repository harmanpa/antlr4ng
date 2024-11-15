/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { ParseTree } from "../ParseTree";
import { Trees } from "../Trees";
import { XPathElement } from "./XPathElement";

export class XPathTokenAnywhereElement extends XPathElement {
    protected tokenType: number;

    public constructor(tokenName: string, tokenType: number) {
        super(tokenName);
        this.tokenType = tokenType;
    }

    public evaluate(t: ParseTree): ParseTree[] {
        return Trees.findAllTokenNodes(t, this.tokenType);
    }

    public override toString(): string {
        const inv: string = this.invert ? "!" : "";

        return "XPathTokenAnywhereElement[" + inv + this.nodeName + "]";
    }

}
