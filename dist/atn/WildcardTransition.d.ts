import { Transition } from "./Transition";
export declare class WildcardTransition extends Transition {
    get transitionType(): number;
    matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
    toString(): string;
}
