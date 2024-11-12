/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { ATNState } from "./ATNState";
import { Transition } from "./Transition";

/** Used as base for PredicateTransition and PrecedencePredicateTransition, without adding their individual fields. */
export abstract class AbstractPredicateTransition extends Transition {
    public constructor(target: ATNState) {
        super(target);
    }
}
