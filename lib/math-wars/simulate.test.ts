import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseExpr } from "./expr.ts";
import { simulateShot } from "./simulate.ts";
import { chooseCpuShot } from "./cpu.ts";
import { createWorld, setSolid } from "./world.ts";

function ast(source: string) {
  const parsed = parseExpr(source);
  if (!parsed.ok) throw new Error(parsed.error);
  return parsed.ast;
}

describe("simulateShot", () => {
  it("hits a same-height rival with y = 0", () => {
    const world = createWorld("stud-yard", 3, 1);
    world.cells.fill(0);
    world.blue.y = 10.5;
    world.red.y = 10.5;
    const plan = simulateShot(world, "blue", ast("0"), 1);
    assert.equal(plan.outcome, "hit");
    assert.equal(plan.hit, "red");
  });

  it("chips a wall and can keep going", () => {
    const world = createWorld("stud-yard", 3, 1);
    world.cells.fill(0);
    world.blue.x = 3.5;
    world.blue.y = 10.5;
    world.red.x = 20.5;
    world.red.y = 10.5;
    setSolid(world, 10, 10, true);
    const plan = simulateShot(world, "blue", ast("0"), 1, 3);
    assert.equal(plan.chips.length, 1);
    assert.equal(plan.outcome, "hit");
  });

  it("blocks when power runs out", () => {
    const world = createWorld("stud-yard", 3, 1);
    world.cells.fill(0);
    world.blue.x = 3.5;
    world.blue.y = 10.5;
    world.red.x = 20.5;
    world.red.y = 10.5;
    setSolid(world, 8, 10, true);
    setSolid(world, 9, 10, true);
    const plan = simulateShot(world, "blue", ast("0"), 1, 1);
    assert.equal(plan.outcome, "blocked");
    assert.equal(plan.hit, null);
  });
});

describe("chooseCpuShot", () => {
  it("finds a hitting shot on an open lane", () => {
    const world = createWorld("stud-yard", 3, 1);
    world.cells.fill(0);
    world.blue.y = 10.5;
    world.red.y = 10.5;
    const shot = chooseCpuShot(world, "red");
    const parsed = parseExpr(shot.source);
    assert.equal(parsed.ok, true);
    if (!parsed.ok) return;
    const plan = simulateShot(world, "red", parsed.ast, shot.dir);
    assert.equal(plan.outcome, "hit");
  });
});
