import { Recognizer } from "../Recognizer";
import { ParserRuleContext } from "../ParserRuleContext";
import { HashSet } from "../misc/HashSet";
import { IComparable } from "../utils/helpers";
import { ATNSimulator } from "./ATNSimulator";
/**
 * A tree structure used to record the semantic context in which
 * an ATN configuration is valid.  It's either a single predicate,
 * a conjunction `p1&&p2`, or a sum of products `p1||p2`.
 *
 * I have scoped the {@link AND}, {@link OR}, and {@link SemanticContext.Predicate} subclasses of
 * {@link SemanticContext} within the scope of this outer class.
 */
export declare abstract class SemanticContext implements IComparable {
    protected cachedHashCode: number | undefined;
    static andContext(a: SemanticContext | null, b: SemanticContext | null): SemanticContext | null;
    static orContext(a: SemanticContext | null, b: SemanticContext | null): SemanticContext | null;
    protected static filterPrecedencePredicates(set: HashSet<SemanticContext>): SemanticContext.PrecedencePredicate[];
    /**
     * Evaluate the precedence predicates for the context and reduce the result.
     *
     * @param _parser The parser instance.
     * @param _parserCallStack The current parser context object.
     * @returns The simplified semantic context after precedence predicates are
     * evaluated, which will be one of the following values.
     * - {@link NONE}: if the predicate simplifies to `true` after
     * precedence predicates are evaluated.
     * - `null`: if the predicate simplifies to `false` after
     * precedence predicates are evaluated.
     * - `this`: if the semantic context is not changed as a result of
     * precedence predicate evaluation.
     * - A non-`null` {@link SemanticContext}: the new simplified
     * semantic context after precedence predicates are evaluated.
     */
    evalPrecedence<T extends ATNSimulator>(_parser: Recognizer<T>, _parserCallStack?: ParserRuleContext): SemanticContext | null;
    /**
     * For context independent predicates, we evaluate them without a local
     * context (i.e., null context). That way, we can evaluate them without
     * having to create proper rule-specific context during prediction (as
     * opposed to the parser, which creates them naturally). In a practical
     * sense, this avoids a cast exception from RuleContext to myRuleContext.
     *
     * For context dependent predicates, we must pass in a local context so that
     * references such as $arg evaluate properly as _localctx.arg. We only
     * capture context dependent predicates in the context in which we begin
     * prediction, so we passed in the outer context here in case of context
     * dependent predicate evaluation.
     */
    abstract evaluate<T extends ATNSimulator>(parser: Recognizer<T>, parserCallStack: ParserRuleContext): boolean;
    abstract equals(other: SemanticContext): boolean;
    abstract hashCode(): number;
}
export declare namespace SemanticContext {
    class Predicate extends SemanticContext {
        readonly ruleIndex: number;
        readonly predIndex: number;
        readonly isCtxDependent: boolean;
        constructor(ruleIndex?: number, predIndex?: number, isCtxDependent?: boolean);
        evaluate<T extends ATNSimulator>(parser: Recognizer<T>, outerContext: ParserRuleContext): boolean;
        hashCode(): number;
        equals(other: Predicate): boolean;
        toString(): string;
    }
    class PrecedencePredicate extends SemanticContext {
        readonly precedence: number;
        constructor(precedence?: number);
        evaluate<T extends ATNSimulator>(parser: Recognizer<T>, outerContext: ParserRuleContext): boolean;
        evalPrecedence(parser: Recognizer<ATNSimulator>, outerContext?: ParserRuleContext): SemanticContext | null;
        compareTo(other: PrecedencePredicate): number;
        hashCode(): number;
        equals(other: PrecedencePredicate): boolean;
        toString(): string;
    }
    /**
     * The default {@link SemanticContext}, which is semantically equivalent to
     * a predicate of the form `{true`?}
     */
    const NONE: Predicate;
}
