/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

/* eslint-disable jsdoc/require-param */

import { LexerActionType } from "./LexerActionType";
import { LexerAction } from "./LexerAction";
import { Lexer } from "../Lexer";
import { MurmurHash } from "../utils/MurmurHash";

/**
 * Implements the `pushMode` lexer action by calling
 * {@link Lexer//pushMode} with the assigned mode
 */
export class LexerPushModeAction implements LexerAction {
    public readonly mode: number;
    public readonly actionType: number;
    public isPositionDependent: boolean = false;

    #cachedHashCode: number | undefined;

    public constructor(mode: number) {
        this.actionType = LexerActionType.PUSH_MODE;
        this.mode = mode;
    }

    /**
     * This action is implemented by calling {@link Lexer.pushMode} with the
     * value provided by {@link getMode}.
     */
    public execute(lexer: Lexer): void {
        lexer.pushMode(this.mode);
    }

    public hashCode(): number {
        if (this.#cachedHashCode === undefined) {
            let hash = MurmurHash.initialize();
            hash = MurmurHash.update(hash, this.actionType);
            hash = MurmurHash.update(hash, this.mode);
            this.#cachedHashCode = MurmurHash.finish(hash, 2);
        }

        return this.#cachedHashCode;
    }

    public equals(other: unknown): boolean {
        if (this === other) {
            return true;
        }

        if (!(other instanceof LexerPushModeAction)) {
            return false;
        }

        return this.mode === other.mode;
    }

    public toString(): string {
        return "pushMode(" + this.mode + ")";
    }
}
