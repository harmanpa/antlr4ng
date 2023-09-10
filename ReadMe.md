# JavaScript + TypeScript Target Runtime for ANTLR 4

[![Build & Test](https://github.com/mike-lischke/antlr4ng/actions/workflows/nodejs.yml/badge.svg?branch=master)](https://github.com/mike-lischke/antlr4ng/actions/workflows/nodejs.yml)
[![Downloads](https://img.shields.io/npm/dw/antlr4ng?color=blue)](https://www.npmjs.com/package/antlr4ng)
[![npm version](https://img.shields.io/npm/v/antlr4ng?color=yellow)](https://www.npmjs.com/package/antlr4ng)


This package is a fork of the official ANTLR4 JavaScript runtime, with the following changes:

- Much improved TypeScript type definitions.
- XPath implementation.
- Vocabulary implementation.
- Complete Interval implementation.
- Consistent formatting (indentation, semicolons, spaces, etc.).
- Numerous smaller fixes (`null` instead of `undefined` and others).
- Smaller node package (no test specs or other unnecessary files).

It is (mostly) a drop-in replacement of the `antlr4` package, and can be used as such. For more information about ANTLR see www.antlr.org. Read more details about the [JavaScript](https://github.com/antlr/antlr4/blob/master/doc/javascript-target.md) and [TypeScript](https://github.com/antlr/antlr4/blob/master/doc/typescript-target.md) targets at the provided links, but keep in mind that this documentation applies to the original JS/TS target.

## Benchmarks

This runtime is constantly monitored for performance regressions. The following table shows the results of the benchmarks run on last release:

| Test | Cold Run | Warm Run|
| ---- | -------- | ------- |
| Query Collection| 8585 ms | 227 ms |
| Example File | 1052 ms | 108 ms |
| Large Inserts | 10417 ms | 10534 ms |
| Total | 20114 ms | 10890 ms |

The benchmarks consist of a set of query files, which are parsed by a MySQL parser.

## Release Notes

### 1.0.2 - 1.0.4

- Github build action
- Updated package.json
- Exported `ErrorNode`, `InputMismatchException`
- Some smaller fixes
- Introduced the `IntStream` interface as the base for `CharStream` and `TokenStream`. This avoids duplicate code in the stream type definitions.
- Removed `FileStream` as a preparation to get rid of the separate package files for node and browser. If something needs to be loaded from a file, the particular environment should provide the code for that.

### 1.0.1

- Added and/or replaced all copyrights to a common ANTLR version.
- Removed all individual default exports. Only the final lib exports contain both, default and non-default exports. This avoids namespace access like `antlr4.atn`. Everything is available under a top level import.
- Renamed ErrorListener to BaseErrorListener, as that is what it is actually when comparing it to the Java runtime.

### 1.0.0

- Initial release.
