/**
 * @file Log record.
 * @author Tori Rodriguez <vrodriguezfe@icloud.com>
 * @module record
 * @browser ✅  Compatible with browsers.
 * @deno ✅  Compatible with Deno.
 * @node ✅  Compatible with Node.js.
 * @bun ✅  Compatible with Bun.
 * @license GPL-3.0-or-later.
 *
 *          **Copyright (C) 2023 Tori Rodriguez.**
 *
 *          This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as
 *          published by the Free Software Foundation, either version 3 of the License,
 *          or any later version.
 *
 *          This program is distributed in the hope that it will be useful,
 *          but **WITHOUT ANY WARRANTY**; without even the implied warranty of **MERCHANTABILITY** or **FITNESS FOR A PARTICULAR PURPOSE**. See
 *          the GNU General Public License for more details.
 *
 *          You should have received a copy of the GNU General Public License along with this program. If not, @see
 *          {@link https://www.gnu.org/licenses}
 */

import { callsites } from "./callsites.mjs";

/**
 * @typedef {Expand<Exclude<keyof LogRecord, "toString" | "toJSON">>} LogRecordProperty
 */

/**
 * @template {*} T
 * @typedef {import("https://cdn.jsdelivr.net/gh/toridoriv/template-string/typings/utils.d.ts").Expand<T>} Expand<T>
 */

/**
 * @template {*} T
 * @typedef {import("https://cdn.jsdelivr.net/gh/toridoriv/template-string/typings/utils.d.ts").UnionToTuple<T>} UnionToTuple<T>
 */

/**
 * @typedef {import("https://cdn.jsdelivr.net/gh/toridoriv/template-string/typings/utils.d.ts").Primitive} Primitive
 */

/**
 * Log record class.
 *
 * Represents a single log record containing all metadata fields.
 */
export class LogRecord {
  /**
   * @type {Readonly<UnionToTuple<LogRecordProperty>>}
   * @readonly
   */
  static properties = Object.freeze([
    "@timestamp",
    "message",
    "data",
    "log.level",
    "log.logger",
    "log.origin.file.column",
    "log.origin.file.line",
    "log.origin.file.name",
    "log.origin.file.path",
    "log.origin.function",
    "error.code",
    "error.id",
    "error.message",
    "error.stack_trace",
    "error.type",
    "service.name",
    "service.version",
    "service.environment",
    "service.id",
    "process.args",
    "process.args_count",
    "event.duration",
    "http.version",
    "http.request.id",
    "http.request.method",
    "http.request.mime_type",
    "http.response.body.content",
    "http.response.mime_type",
    "http.response.status_code",
    "url.domain",
    "url.extension",
    "url.fragment",
    "url.full",
    "url.password",
    "url.path",
    "url.port",
    "url.query",
    "url.scheme",
    "url.username",
  ]);

  #callsites = callsites();

  constructor() {
    /**
     * Date/time when the event originated.
     *
     * @readonly
     * @example
     *
     * "2023-12-10T20:55:18.908Z"
     *
     */
    this["@timestamp"] = new Date().toISOString();

    /**
     * The main log message text.
     */
    this.message = "";

    /**
     * Any structured data associated with the log event.
     */
    this.data = "";

    /**
     * Log level of the log event.
     *
     * @example
     *
     * "ERROR"
     *
     */
    this["log.level"] = "";
    /**
     * Name of the logger. Defaults to `unknown`.
     *
     * @example
     *
     * "Logger"
     *
     */
    this["log.logger"] = "unknown";

    const originDetails = this.#getOriginDetails();

    /**
     * The column number of the file which originated the log event.
     *
     * @readonly
     */
    this["log.origin.file.column"] = originDetails.column;

    /**
     * The line number of the file which originated the log event.
     *
     * @readonly
     */
    this["log.origin.file.line"] = originDetails.line;

    /**
     * The source file which originated the log event.
     *
     * @readonly
     */
    this["log.origin.file.name"] = originDetails.fileName;

    /**
     * The source file path which originated the log event.
     *
     * @readonly
     */
    this["log.origin.file.path"] = originDetails.path;

    /**
     * The function which originated the log event.
     *
     * @readonly
     */
    this["log.origin.function"] = originDetails.function;

    /**
     * Error code describing the error.
     */
    this["error.code"] = "";

    /**
     * Unique identifier for the error.
     */
    this["error.id"] = "";

    /**
     * Error message.
     */
    this["error.message"] = "";

    /**
     * The stack trace of this error in plain text.
     */
    this["error.stack_trace"] = "";

    /**
     * The type of the error, for example the class name of the exception.
     *
     * @example
     *
     * "TypeError"
     *
     */
    this["error.type"] = "";

    /**
     * Name of the service.
     */
    this["service.name"] = "";

    /**
     * Version of the service.
     *
     * @example
     *
     * "1.2.3"
     *
     */
    this["service.version"] = "";

    /**
     * Environment of the service.
     *
     * @example
     *
     * "production"
     *
     */
    this["service.environment"] = "";

    /**
     * Unique identifier of the running service.
     */
    this["service.id"] = "";

    /**
     * @readonly
     */
    this["process.args"] = globalThis.Deno ? Deno.args : [];

    /**
     * @readonly
     */
    this["process.args_count"] = this["process.args"].length;

    /**
     * Duration of the event in nanoseconds.
     */
    this["event.duration"] = "";

    /**
     * HTTP version.
     *
     * @example
     *
     * "1.1"
     *
     */
    this["http.version"] = "";

    /**
     * "HTTP request ID.
     *
     * @example
     *
     * "123e4567-e89b-12d3-a456-426614174000"
     *
     */
    this["http.request.id"] = "";

    /**
     * HTTP request method.
     *
     * @example
     *
     * "POST"
     *
     */
    this["http.request.method"] = "";

    /**
     * Mime type of the body of the request.
     *
     * @example
     *
     * "image/gif"
     *
     */
    this["http.request.mime_type"] = "";

    /**
     * The full HTTP response body.
     *
     * @example
     *
     * "Hello world."
     *
     */
    this["http.response.body.content"] = "";

    /**
     * Mime type of the body of the response.
     *
     * @example
     *
     * "text/plain"
     *
     */
    this["http.response.mime_type"] = "";
    /**
     * HTTP response status code.
     *
     * @example
     *
     * 404
     *
     */
    this["http.response.status_code"] = 0;

    /**
     * Domain of the url.
     *
     * @example
     *
     * "www.example.org"
     *
     */
    this["url.domain"] = "";

    /**
     * File extension from the request url, excluding the leading dot.
     *
     * @example
     *
     * "json"
     *
     */
    this["url.extension"] = "";

    /**
     * Portion of the url after the `#`.
     *
     * @example
     *
     * "top"
     *
     */
    this["url.fragment"] = "";

    /**
     * Full unparsed URL.
     *
     * @example
     *
     * "https://www.example.org:3000/search?q=value#top"
     *
     */
    this["url.full"] = "";

    /**
     * Password of the request.
     *
     * @example
     *
     * "123password"
     *
     */
    this["url.password"] = "";

    /**
     * Path of the request.
     *
     * @example
     *
     * "/search"
     *
     */
    this["url.path"] = "";

    /**
     * Port of the request.
     *
     * @example
     *
     * 3000
     *
     */
    this["url.port"] = 0;

    /**
     * Query string of the request.
     *
     * @example
     *
     * "?q=value"
     *
     */
    this["url.query"] = "";

    /**
     * Scheme of the url.
     *
     * @example
     *
     * "https"
     *
     */
    this["url.scheme"] = "";

    /**
     * Username of the request.
     *
     * @example
     *
     * "tori"
     *
     */
    this["url.username"] = "";
  }

  #getOriginDetails() {
    const cs = this.#callsites[2];
    const path = cs.fileName || "";
    const fileName = path ? path.substring(path.lastIndexOf("/") + 1) : "";

    return {
      column: cs.columnNumber || 0,
      line: cs.lineNumber || 0,
      path,
      fileName,
      function: cs.functionName || "none",
    };
  }

  toJSON() {
    /**
     * @type {Record<PropertyKey, Primitive | Primitive[]>}
     */
    const obj = {};

    for (const key of LogRecord.properties) {
      const value = this[key];

      if (value) {
        obj[key] = value;
      }
    }

    return obj;
  }

  toString() {
    return JSON.stringify(this, null, 2);
  }
}
