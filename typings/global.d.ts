import type {
  Expand,
  SafeAny,
} from "https://cdn.jsdelivr.net/gh/toridoriv/template-string/typings/utils.d.ts";

export {};

declare global {
  interface ErrorConstructor {
    /**
     * Optional override for formatting stack traces.
     *
     * @see https://v8.dev/docs/stack-trace-api#customizing-stack-traces
     */
    prepareStackTrace: ((err: Error, stackTraces: CallSite[]) => SafeAny) | undefined;
  }

  export interface CallSite {
    /**
     * Returns the value of `this`.
     */
    getThis(): unknown;
    /**
     * Returns the type of `this` as a string.
     * This is the name of the function stored in the constructor field of `this`,
     * if available, otherwise the object’s `[[Class]]` internal property.
     */
    getTypeName(): string | null;
    /**
     * Returns the current function.
     */
    getFunction(): CallableFunction | undefined;
    /**
     * Returns the name of the current function, typically its name property.
     * If a name property is not available an attempt is made to infer a name from the function’s context.
     */
    getFunctionName(): string | null;
    /**
     * Returns the name of the property of `this` or one of its prototypes that holds the current function.
     */
    getMethodName(): string | null;
    /**
     * If this function was defined in a script returns the name of the script.
     */
    getFileName(): string | undefined;
    /**
     * If this function was defined in a script returns the current line number.
     */
    getLineNumber(): number | null;
    /**
     * If this function was defined in a script returns the current column number.
     */
    getColumnNumber(): number | null;
    /**
     * If this function was created using a call to `eval` returns a string representing the location where eval was called.
     */
    getEvalOrigin(): string | undefined;
    /**
     * Is this a toplevel invocation, that is, is "this" the global object?
     */
    isToplevel(): boolean;
    /**
     * Does this call take place in code defined by a call to eval?
     */
    isEval(): boolean;
    /**
     * Is this call in native V8 code?
     */
    isNative(): boolean;
    /**
     * Is this a constructor call?
     */
    isConstructor(): boolean;
    /**
     * Is this an async call (i.e. `await`, `Promise.all()`, or `Promise.any()`)?
     */
    isAsync(): boolean;
    /**
     * Is this an async call to `Promise.all()`?
     */
    isPromiseAll(): boolean;
    /**
     * Returns the index of the promise element that was followed in `Promise.all()`.
     */
    getPromiseIndex(): number;
  }

  export type CallSiteMethodName = Expand<keyof CallSite>;
}
