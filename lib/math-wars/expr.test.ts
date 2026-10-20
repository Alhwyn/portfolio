import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evalExpr, parseExpr } from "./expr.ts";

function value(source: string, x: number): number {
  const parsed = parseExpr(source);
  if (!parsed.ok) throw new Error(parsed.error);
  return evalExpr(parsed.ast, x);
}

describe("parseExpr", () => {
  it("parses arithmetic", () => {
    assert.equal(value("2+3*4", 0), 14);
    assert.equal(value("(2+3)*4", 0), 20);
    assert.equal(value("2^3", 0), 8);
    assert.equal(value("-x^2", 3), -9);
    assert.equal(value("2^-1", 0), 0.5);
    assert.equal(value("2^3^2", 0), 512);
  });

  it("supports implicit multiplication", () => {
    assert.equal(value("2x", 4), 8);
    assert.equal(value("2sin(0)", 0), 0);
    assert.equal(value("(x+1)(x-1)", 3), 8);
  });

  it("evaluates trig and constants", () => {
    assert.ok(Math.abs(value("sin(pi)", 0)) < 1e-10);
    assert.ok(Math.abs(value("cos(0)", 0) - 1) < 1e-10);
    assert.ok(value("e", 0) > 2.7);
  });

  it("rejects unknown identifiers and empty input", () => {
    assert.equal(parseExpr("").ok, false);
    assert.equal(parseExpr("process.exit(1)").ok, false);
    assert.equal(parseExpr("sin").ok, false);
    const boom = parseExpr("foo(x)");
    assert.equal(boom.ok, false);
  });

  it("treats x as horizontal distance", () => {
    assert.equal(value("0.5x + 1", 4), 3);
  });
});
