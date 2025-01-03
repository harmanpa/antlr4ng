import { Token } from "./Token";
import { TokenStream } from "./TokenStream";
import { Interval } from "./misc/Interval";
/**
 * Useful for rewriting out a buffered input token stream after doing some
 * augmentation or other manipulations on it.
 *
 * You can insert stuff, replace, and delete chunks. Note that the operations
 * are done lazily--only if you convert the buffer to a {@link String} with
 * {@link TokenStream#getText()}. This is very efficient because you are not
 * moving data around all the time. As the buffer of tokens is converted to
 * strings, the {@link #getText()} method(s) scan the input token stream and
 * check to see if there is an operation at the current index. If so, the
 * operation is done and then normal {@link String} rendering continues on the
 * buffer. This is like having multiple Turing machine instruction streams
 * (programs) operating on a single input tape. :)
 *
 * This rewriter makes no modifications to the token stream. It does not ask the
 * stream to fill itself up nor does it advance the input cursor. The token
 * stream {@link TokenStream#index()} will return the same value before and
 * after any {@link #getText()} call.
 *
 * The rewriter only works on tokens that you have in the buffer and ignores the
 * current input cursor. If you are buffering tokens on-demand, calling
 * {@link #getText()} halfway through the input will only do rewrites for those
 * tokens in the first half of the file.
 *
 * Since the operations are done lazily at {@link #getText}-time, operations do
 * not screw up the token index values. That is, an insert operation at token
 * index `i` does not change the index values for tokens
 * `i`+1..n-1.
 *
 * Because operations never actually alter the buffer, you may always get the
 * original token stream back without undoing anything. Since the instructions
 * are queued up, you can easily simulate transactions and roll back any changes
 * if there is an error just by removing instructions. For example,
 *
 * ```
 * CharStream input = new ANTLRFileStream("input");
 * TLexer lex = new TLexer(input);
 * CommonTokenStream tokens = new CommonTokenStream(lex);
 * T parser = new T(tokens);
 * TokenStreamRewriter rewriter = new TokenStreamRewriter(tokens);
 * parser.startRule();
 * ```
 *
 * Then in the rules, you can execute (assuming rewriter is visible):
 *
 * ```
 * Token t,u;
 * ...
 * rewriter.insertAfter(t, "text to put after t");}
 * rewriter.insertAfter(u, "text after u");}
 * System.out.println(rewriter.getText());
 * ```
 *
 * You can also have multiple "instruction streams" and get multiple rewrites
 * from a single pass over the input. Just name the instruction streams and use
 * that name again when printing the buffer. This could be useful for generating
 * a C file and also its header file--all from the same buffer:
 *
 * ```
 * rewriter.insertAfter("pass1", t, "text to put after t");}
 * rewriter.insertAfter("pass2", u, "text after u");}
 * System.out.println(rewriter.getText("pass1"));
 * System.out.println(rewriter.getText("pass2"));
 * ```
 *
 * If you don't use named rewrite streams, a "default" stream is used as the
 * first example shows.
 */
export declare class TokenStreamRewriter {
    static readonly DEFAULT_PROGRAM_NAME = "default";
    static readonly PROGRAM_INIT_SIZE = 100;
    static readonly MIN_TOKEN_INDEX = 0;
    /** Our source stream */
    protected readonly tokens: TokenStream;
    /**
     * You may have multiple, named streams of rewrite operations.
     *  I'm calling these things "programs."
     *  Maps String (name) -> rewrite (List)
     */
    protected readonly programs: Map<string, RewriteOperation[]>;
    /** Map String (program name) -> Integer index */
    protected readonly lastRewriteTokenIndexes: Map<string, number>;
    /**
     * @param tokens The token stream to modify
     */
    constructor(tokens: TokenStream);
    getTokenStream(): TokenStream;
    /**
     * Insert the supplied text after the specified token (or token index)
     */
    insertAfter(tokenOrIndex: Token | number, text: string, programName?: string): void;
    /**
     * Insert the supplied text before the specified token (or token index)
     */
    insertBefore(tokenOrIndex: Token | number, text: unknown, programName?: string): void;
    /**
     * Replace the specified token with the supplied text
     */
    replaceSingle(tokenOrIndex: Token | number, text: string, programName?: string): void;
    /**
     * Replace the specified range of tokens with the supplied text.
     */
    replace(from: Token | number, to: Token | number, text: string | null, programName?: string): void;
    /**
     * Delete the specified range of tokens
     */
    delete(from: Token | number, to?: Token | number | null, programName?: string): void;
    getProgram(name: string): RewriteOperation[];
    initializeProgram(name: string): RewriteOperation[];
    /**
     * @returns the text from the original tokens altered per the instructions given to this rewriter
     */
    getText(intervalOrProgram?: Interval | string, programName?: string): string;
    /**
     * @returns a map from token index to operation
     */
    protected reduceToSingleOperationPerIndex(rewrites: Array<RewriteOperation | null>): Map<number, RewriteOperation | null>;
    private catOpText;
    /**
     * Get all operations before an index of a particular kind
     */
    private getKindOfOps;
}
declare class RewriteOperation {
    /** What index into rewrites List are we? */
    instructionIndex: number;
    /** Token buffer index. */
    index: number;
    text: unknown;
    tokens: TokenStream;
    constructor(tokens: TokenStream, index: number, instructionIndex: number, text: unknown);
    execute(_buf: string[]): number;
    toString(): string;
}
export {};
