/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { BlockEndState } from "./BlockEndState";
import { DecisionState } from "./DecisionState";

/**
 *  The start of a regular `(...)` block
 */
export class BlockStartState extends DecisionState {
    public endState?: BlockEndState;
}
