import { SetTransition } from "./SetTransition";
export declare class NotSetTransition extends SetTransition {
    get transitionType(): number;
    matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
    toString(): string;
}
