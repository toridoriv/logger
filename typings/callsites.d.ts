/**
 * @file Types for the callsites module.
 * @author Tori Rodriguez <vrodriguezfe@icloud.com>
 * @module typings/callsites
 * @license GPL-3.0-or-later.
 *
 *          **Copyright (C) 2023 Tori Rodriguez.**
 *
 *          This program is free software: you can redistribute it and/or modify it
 *          under the terms of the GNU General Public License as published by the
 *          Free Software Foundation, either version 3 of the License, or any later
 *          version.
 *
 *          This program is distributed in the hope that it will be useful,
 *          but **WITHOUT ANY WARRANTY**; without even the implied warranty of
 *          **MERCHANTABILITY** or **FITNESS FOR A PARTICULAR PURPOSE**. See the GNU
 *          General Public License for more details.
 *
 *          You should have received a copy of the GNU General Public License along
 *          with this program. If not, @see {@link https://www.gnu.org/licenses}
 */
export as namespace Callsites;

import "./global.d.ts";

import type { Expand } from "https://cdn.jsdelivr.net/gh/toridoriv/template-string/typings/utils.d.ts";

/**
 * Represents detailed information about a call site in the call stack.
 *
 * This provides extended metadata beyond the standard CallSite interface,
 * including things like the function name, file path, line number, etc.
 *
 * Useful for logging, errors, and debugging. Allows inspecting the full context of a call
 * site programmatically.
 *
 * @example
 *
 * ```ts
 * import type { ExpandedCallSite } from "./typings.ts";
 * import { callsites } from "./callsites.mjs";
 *
 * const sites = callsites();
 * const site: ExpandedCallSite = sites[0];
 *
 * console.assert(site.functionName === "file:///Users/Willow/Developer/Project/mod.ts");
 * console.assert(site.lineNumber === 5);
 * ```
 *
 */
export interface ExpandedCallSite {
  /**
   * The `this` value of the call site or `undefined` in strict mode.
   */
  this: unknown | undefined;
  /**
   * The type name of `this`.
   */
  typeName: string | null;
  /**
   * The function being invoked at the call site or `undefined` in strict mode.
   */
  function: CallableFunction | undefined;
  /**
   * The name of the function being invoked.
   */
  functionName: string | null;
  /**
   * The method name if it's a method call.
   */
  methodName: string | null;
  /**
   * The file path where the call site originated.
   */
  fileName: string | undefined;
  /**
   * The line number in the file where the call originated.
   */
  lineNumber: number | null;
  /**
   * The column number where the call originated.
   */
  columnNumber: number | null;
  /**
   * The eval origin if the call site originated in eval.
   */
  evalOrigin: string | undefined;
  /**
   * Whether this call site is at the top level of the call stack.
   */
  isToplevel: boolean;
  /**
   * Whether the call site originated from eval.
   */
  isEval: boolean;
  /**
   * Whether the call site originated from native code.
   */
  isNative: boolean;
  /**
   * Whether the call site is from a constructor invocation.
   */
  isConstructor: boolean;
  /**
   * Whether the call site is from an async operation.
   */
  isAsync: boolean;
  /**
   * Whether the call site is from an async operation resolved with `Promise.all`.
   */
  isPromiseAll: boolean;
  /**
   * The index of the promise element that was followed in `Promise.all()`.
   */
  promiseIndex: number;
}

export type ExpandedCallSiteProperty = Expand<keyof ExpandedCallSite>;
