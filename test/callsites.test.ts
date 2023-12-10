import { callsites } from "../lib/callsites.mjs";
import { describe, expect, it } from "./deps.ts";
import * as fixtures from "./fixtures/callsites.mjs";

describe("The function callsites", () => {
  it("should restore the original prepareStackTrace function", () => {
    callsites();

    expect(Error.prepareStackTrace).to.be.a("function");
    expect(Error.prepareStackTrace?.name).to.equal("prepareStackTrace");
  });
  describe("when called with no arguments", () => {
    it("returns an array", () => {
      const result = callsites();

      expect(result).to.be.instanceof(Array);
      expect(result).to.have.length.above(0);
    });

    it("returns an array where each member is an expanded call site", () => {
      const result = callsites();

      result.forEach((cs) => {
        const keys = Object.keys(cs);

        expect(keys).to.include("this");
        expect(keys).to.include("typeName");
        expect(keys).to.include("function");
        expect(keys).to.include("functionName");
        expect(keys).to.include("methodName");
        expect(keys).to.include("fileName");
        expect(keys).to.include("lineNumber");
        expect(keys).to.include("columnNumber");
        expect(keys).to.include("evalOrigin");
        expect(keys).to.include("isToplevel");
        expect(keys).to.include("isEval");
        expect(keys).to.include("isNative");
        expect(keys).to.include("isConstructor");
        expect(keys).to.include("isAsync");
        expect(keys).to.include("isPromiseAll");
        expect(keys).to.include("promiseIndex");
      });
    });

    it("returns an array that excludes the call made by the callsites function", () => {
      const result = callsites();
      const includesCallsiteCall = result.some((cs) => cs.fileName?.includes("callsites.mjs"));

      expect(includesCallsiteCall).to.be.false;
    });
  });

  describe("when called with an error instance", () => {
    it("returns an array", () => {
      const error = new Error();
      const result = callsites(error);

      expect(result).to.be.instanceof(Array);
      expect(result).to.have.length.above(0);
    });

    it("where each member is an expanded call site", () => {
      const error = new Error();
      const result = callsites(error);

      result.forEach((cs) => {
        const keys = Object.keys(cs);

        expect(keys).to.include("this");
        expect(keys).to.include("typeName");
        expect(keys).to.include("function");
        expect(keys).to.include("functionName");
        expect(keys).to.include("methodName");
        expect(keys).to.include("fileName");
        expect(keys).to.include("lineNumber");
        expect(keys).to.include("columnNumber");
        expect(keys).to.include("evalOrigin");
        expect(keys).to.include("isToplevel");
        expect(keys).to.include("isEval");
        expect(keys).to.include("isNative");
        expect(keys).to.include("isConstructor");
        expect(keys).to.include("isAsync");
        expect(keys).to.include("isPromiseAll");
        expect(keys).to.include("promiseIndex");
      });
    });
  });
});

describe("An ExpandedCallSite object", () => {
  it("has the property fileName set to the correct path where the call was made", () => {
    const cwd = Deno.cwd();
    const path = "/test/fixtures/callsites.mjs";

    expect(fixtures.fileDetails.fileName).to.equal("file://" + cwd + path);
  });

  it("has the property lineNumber set to the correct lineNumber where the call was made", () => {
    expect(fixtures.fileDetails.lineNumber).to.equal(7);
  });

  it("has the property columnNumber set to the correct column number where the call was made", () => {
    expect(fixtures.fileDetails.columnNumber).to.equal(28);
  });

  it("has the property functionName set to the correct function where the call was made", () => {
    const getCallSite = function getCallSite() {
      return callsites()[0];
    };
    const result = getCallSite();

    expect(result.functionName).to.equal(getCallSite.name);
  });
});
