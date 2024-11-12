/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { LexerActionType } from "./LexerActionType";
import { LexerAction } from "./LexerAction";
import { Lexer } from "../Lexer";

/**
 * Implements the `skip` lexer action by calling {@link Lexer//skip}.
 *
 * The `skip` command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link instance}.
 */
export class LexerSkipAction implements LexerAction {
    /** Provides a singleton instance of this parameter-less lexer action. */
    public static readonly instance = new LexerSkipAction();
    public readonly actionType: number;
    public isPositionDependent: boolean = false;

    public constructor() {
        this.actionType = LexerActionType.SKIP;
    }

    public equals(obj: unknown): boolean {
        return obj === this;
    }

    public hashCode(): number {
        return LexerActionType.SKIP;
    }

    public execute(lexer: Lexer): void {
        lexer.skip();
    }

    public toString(): string {
        return "skip";
    }
}
