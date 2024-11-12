/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

/* eslint-disable @typescript-eslint/naming-convention */

import { Token } from "./Token";

export class Vocabulary {
    public static readonly EMPTY_NAMES: string[] = [];

    /**
     * Gets an empty {@link Vocabulary} instance.
     *
     *
     * No literal or symbol names are assigned to token types, so
     * {@link #getDisplayName(int)} returns the numeric value for all tokens
     * except {@link Token#EOF}.
     */
    public static readonly EMPTY_VOCABULARY =
        new Vocabulary(Vocabulary.EMPTY_NAMES, Vocabulary.EMPTY_NAMES, Vocabulary.EMPTY_NAMES);

    public readonly maxTokenType: number;

    private readonly literalNames: Array<string | null>;
    private readonly symbolicNames: Array<string | null>;
    private readonly displayNames: Array<string | null>;

    /**
     * Constructs a new instance of {@link Vocabulary} from the specified
     * literal, symbolic, and display token names.
     *
     * @param literalNames The literal names assigned to tokens, or `null`
     * if no literal names are assigned.
     * @param symbolicNames The symbolic names assigned to tokens, or
     * `null` if no symbolic names are assigned.
     * @param displayNames The display names assigned to tokens, or `null`
     * to use the values in `literalNames` and `symbolicNames` as
     * the source of display names, as described in
     * {@link #getDisplayName(int)}.
     */
    public constructor(literalNames: Array<string | null>, symbolicNames: Array<string | null>,
        displayNames?: Array<string | null> | null) {
        this.literalNames = literalNames ?? Vocabulary.EMPTY_NAMES;
        this.symbolicNames = symbolicNames ?? Vocabulary.EMPTY_NAMES;
        this.displayNames = displayNames ?? Vocabulary.EMPTY_NAMES;

        // See note here on -1 part: https://github.com/antlr/antlr4/pull/1146
        this.maxTokenType = Math.max(this.displayNames.length, Math.max(this.literalNames.length,
            this.symbolicNames.length)) - 1;
    }

    /**
     * Returns a {@link Vocabulary} instance from the specified set of token
     * names. This method acts as a compatibility layer for the single
     * `tokenNames` array generated by previous releases of ANTLR.
     *
     * The resulting vocabulary instance returns `null` for
     * {@link getLiteralName getLiteralName(int)} and {@link getSymbolicName getSymbolicName(int)}, and the
     * value from `tokenNames` for the display names.
     *
     * @param tokenNames The token names, or `null` if no token names are
     * available.
     * @returns A {@link Vocabulary} instance which uses `tokenNames` for
     * the display names of tokens.
     */
    public static fromTokenNames(tokenNames: Array<string | null> | null): Vocabulary {
        if (tokenNames == null || tokenNames.length === 0) {
            return Vocabulary.EMPTY_VOCABULARY;
        }

        const literalNames = [...tokenNames];
        const symbolicNames = [...tokenNames];
        for (let i = 0; i < tokenNames.length; i++) {
            const tokenName = tokenNames[i];
            if (tokenName == null) {
                continue;
            }

            if (tokenName?.length > 0) {
                const firstChar = tokenName.charAt(0);
                if (firstChar === "'") {
                    symbolicNames[i] = null;
                    continue;
                } else if (firstChar.toUpperCase() === firstChar) {
                    literalNames[i] = null;
                    continue;
                }
            }

            // wasn't a literal or symbolic name
            literalNames[i] = null;
            symbolicNames[i] = null;
        }

        return new Vocabulary(literalNames, symbolicNames, tokenNames);
    }

    public getMaxTokenType(): number {
        return this.maxTokenType;
    }

    public getLiteralName(tokenType: number): string | null {
        if (tokenType >= 0 && tokenType < this.literalNames.length) {
            return this.literalNames[tokenType];
        }

        return null;
    }

    public getSymbolicName(tokenType: number): string | null {
        if (tokenType >= 0 && tokenType < this.symbolicNames.length) {
            return this.symbolicNames[tokenType];
        }

        if (tokenType === Token.EOF) {
            return "EOF";
        }

        return null;
    }

    public getDisplayName(tokenType: number): string | null {
        if (tokenType >= 0 && tokenType < this.displayNames.length) {
            const displayName = this.displayNames[tokenType];
            if (displayName != null) {
                return displayName;
            }
        }

        const literalName = this.getLiteralName(tokenType);
        if (literalName != null) {
            return literalName;
        }

        const symbolicName = this.getSymbolicName(tokenType);
        if (symbolicName != null) {
            return symbolicName;
        }

        return `${tokenType}`;
    }

    public getLiteralNames(): Array<string | null> {
        return this.literalNames;
    }

    public getSymbolicNames(): Array<string | null> {
        return this.symbolicNames;
    }

    public getDisplayNames(): Array<string | null> {
        return this.displayNames;
    }
}
