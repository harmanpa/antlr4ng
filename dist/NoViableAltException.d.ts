import { Parser } from "./Parser";
import { ParserRuleContext } from "./ParserRuleContext";
import { RecognitionException } from "./RecognitionException";
import { Token } from "./Token";
import { TokenStream } from "./TokenStream";
import { ATNConfigSet } from "./atn/ATNConfigSet";
/**
 * Indicates that the parser could not decide which of two or more paths
 * to take based upon the remaining input. It tracks the starting token
 * of the offending input and also knows where the parser was
 * in the various paths when the error. Reported by reportNoViableAlternative()
 */
export declare class NoViableAltException extends RecognitionException {
    /** Which configurations did we try at input.index() that couldn't match input.LT(1)? */
    readonly deadEndConfigs: ATNConfigSet | null;
    /**
     * The token object at the start index; the input stream might
     * 	not be buffering tokens so get a reference to it. (At the
     *  time the error occurred, of course the stream needs to keep a
     *  buffer all of the tokens but later we might not have access to those.)
     */
    readonly startToken: Token | null;
    constructor(recognizer: Parser, input?: TokenStream | null, startToken?: Token | null, offendingToken?: Token | null, deadEndConfigs?: ATNConfigSet | null, ctx?: ParserRuleContext | null);
}
