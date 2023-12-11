/// <reference path="../typings/callsites.d.ts" />

/**
 * @file Utility functions for handling call sites.
 * @author Tori Rodriguez <vrodriguezfe@icloud.com>
 * @module callsites
 * @browser ✅  Compatible with browsers.
 * @deno ✅  Compatible with Deno.
 * @node ✅  Compatible with Node.js.
 * @bun 🟡  Partially compatible with Bun. When obtaining the `lineNumber`, `bun` skips white spaces and comments.
 * @license GPL-3.0-or-later.
 *
 *          **Copyright (C) 2023 Tori Rodriguez.**
 *
 *          This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as
 *          published by the Free Software Foundation, either version 3 of the License, or any later version.
 *
 *          This program is distributed in the hope that it will be useful,
 *          but **WITHOUT ANY WARRANTY**; without even the implied warranty of **MERCHANTABILITY** or **FITNESS FOR A PARTICULAR PURPOSE**. See
 *          the GNU General Public License for more details.
 *
 *          You should have received a copy of the GNU General Public License along with this program. If not, @see
 *          {@link https://www.gnu.org/licenses}
 */

/**
 * Array of known callSite methods.
 *
 * @type {CallSiteMethodName[]}
 */
const CALLSITE_METHODS = [
  "getThis",
  "getTypeName",
  "getFunction",
  "getFunctionName",
  "getMethodName",
  "getFileName",
  "getLineNumber",
  "getColumnNumber",
  "getEvalOrigin",
  "isToplevel",
  "isEval",
  "isNative",
  "isConstructor",
  "isAsync",
  "isPromiseAll",
  "getPromiseIndex",
];

class StackOnlyError extends Error {}

/**
 * Retrieves an array of expanded call sites.
 *
 * Call sites are parsed to provide additional information about each call site.
 *
 * @param {Error} [error]  - The error object from which call sites are to be retrieved.
 *                         Defaults to a new Error object.
 * @returns {Callsites.ExpandedCallSite[]} Array of {@link Callsites.ExpandedCallSite}
 *                                         &#32; providing detailed information about each call site.
 * @example
 *
 * ```javascript
 * import { callsites } from "./callsites.mjs";
 *
 * const sites = callsites();
 * const site = sites[0];
 *
 * console.assert(site.functionName === "file:///Users/Willow/Developer/Project/mod.ts");
 * console.assert(site.lineNumber === 5);
 * ```
 *
 */
export function callsites(error = new StackOnlyError()) {
  const _prepareStackTrace = Error.prepareStackTrace;

  try {
    Error.prepareStackTrace = (_, callsites) => callsites;
    const stack = /**
     * @type {CallSite[]}
     */ (
      /**
       * @type {unknown}
       */ (error.stack)
    );

    if (error instanceof StackOnlyError) {
      stack.shift();
    }

    return stack.map(parseCallsite);
  } finally {
    Error.prepareStackTrace = _prepareStackTrace;
  }
}

/**
 * Creates an object calling all available methods in a callSite.
 *
 * @param {CallSite} cs  - A call site.
 * @returns {Callsites.ExpandedCallSite} A {@link Callsites.ExpandedCallSite} providing detailed information about a call site.
 */
export function parseCallsite(cs) {
  const result = /**
   * @type {Callsites.ExpandedCallSite}
   */ ({});

  for (let i = 0; i < CALLSITE_METHODS.length; i++) {
    const method = CALLSITE_METHODS[i];
    const noGet = method.replace("get", "");
    const property = /**
     * @type {Callsites.ExpandedCallSiteProperty}
     */ (noGet[0].toLowerCase() + noGet.substring(1));
    // @ts-ignore: ¯\_(ツ)_/¯
    result[property] = cs[method]();
  }

  return result;
}
