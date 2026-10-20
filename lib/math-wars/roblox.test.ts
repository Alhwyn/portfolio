import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { MATH_WARS_ROBLOX_URL } from "./roblox.ts";

describe("MATH_WARS_ROBLOX_URL", () => {
  it("points at the shipped Roblox experience", () => {
    assert.equal(
      MATH_WARS_ROBLOX_URL,
      "https://www.roblox.com/games/107994348663960/Math-Wars",
    );
  });
});
