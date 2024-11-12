/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { ATNState } from "./ATNState";
import { BlockStartState } from "./BlockStartState";

/**
 * Terminal node of a simple `(a|b|c)` block.
 */
export class BlockEndState extends ATNState {
    public static override readonly stateType = ATNState.BLOCK_END;

    public startState?: BlockStartState;
}
