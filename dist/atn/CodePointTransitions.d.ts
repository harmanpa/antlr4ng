import type { ATNState } from "./ATNState";
import type { Transition } from "./Transition";
/**
 * Utility class to create {@link AtomTransition}, {@link RangeTransition},
 * and {@link SetTransition} appropriately based on the range of the input.
 *
 * Previously, we distinguished between atom and range transitions for
 * Unicode code points <= U+FFFF and those above. We used a set
 * transition for a Unicode code point > U+FFFF. Now that we can serialize
 * 32-bit int/chars in the ATN serialization, this is no longer necessary.
 */
export declare abstract class CodePointTransitions {
    /** @returns new {@link AtomTransition}     */
    static createWithCodePoint(target: ATNState, codePoint: number): Transition;
    /** @returns new {@link AtomTransition} if range represents one atom else {@link SetTransition}. */
    static createWithCodePointRange(target: ATNState, codePointFrom: number, codePointTo: number): Transition;
}
