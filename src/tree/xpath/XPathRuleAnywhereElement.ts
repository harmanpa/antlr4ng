/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { ParseTree } from "../ParseTree";
import { Trees } from "../Trees";
import { XPathElement } from "./XPathElement";

/**
 * Either `ID` at start of path or `...//ID` in middle of path.
 */
export class XPathRuleAnywhereElement extends XPathElement {
    protected ruleIndex: number;

    public constructor(ruleName: string, ruleIndex: number) {
        super(ruleName);
        this.ruleIndex = ruleIndex;
    }

    public evaluate(t: ParseTree): ParseTree[] {
        return Trees.findAllRuleNodes(t, this.ruleIndex);
    }

    public override toString(): string {
        const inv: string = this.invert ? "!" : "";

        return "XPathRuleAnywhereElement[" + inv + this.nodeName + "]";
    }

}
