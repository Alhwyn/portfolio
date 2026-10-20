import { parseExpr } from "./expr.ts";
import { closestApproach, simulateShot } from "./simulate.ts";
import type { Dir, FighterId, World } from "./types.ts";
import { SHOT_POWER, fighter, opponentId } from "./world.ts";

export type CpuShot = {
  source: string;
  dir: Dir;
};

function formatNum(n: number): string {
  const rounded = Math.round(n * 1000) / 1000;
  if (Object.is(rounded, -0)) return "0";
  return String(rounded);
}

function candidates(dx: number, dy: number): string[] {
  const len = Math.max(Math.abs(dx), 0.5);
  const m = dy / (dx === 0 ? 1 : Math.abs(dx));
  const slope = formatNum(m);
  const list = [
    `${slope}*x`,
    "0",
    "0.25*x",
    "-0.25*x",
    "0.5*x",
    "-0.5*x",
    "sin(x)",
    "2*sin(x)",
    "-2*sin(x)",
    "3*sin(0.6*x)",
    "0.04*x^2",
    "-0.04*x^2",
    `${slope}*x + 2*sin(x)`,
    `${slope}*x - 2*sin(x)`,
  ];

  for (const amp of [2, 3.5, 5, -2, -3.5, -5]) {
    const k = formatNum(Math.PI / len);
    list.push(`${slope}*x + ${amp}*sin(${k}*x)`);
  }

  return list;
}

function scorePlan(
  world: World,
  shooter: FighterId,
  source: string,
): number {
  const parsed = parseExpr(source);
  if (!parsed.ok) return -1e9;
  const self = fighter(world, shooter);
  const foe = opponentId(shooter);
  const dir: Dir = fighter(world, foe).x >= self.x ? 1 : -1;
  const plan = simulateShot(world, shooter, parsed.ast, dir, SHOT_POWER);
  if (plan.outcome === "hit") return 1000 + plan.combo * 10;
  if (plan.outcome === "explode") return -50;
  const near = closestApproach(plan, world, foe);
  return 200 - near * 12 + plan.chips.length;
}

export function chooseCpuShot(world: World, shooter: FighterId = "red"): CpuShot {
  const self = fighter(world, shooter);
  const foe = fighter(world, opponentId(shooter));
  const dir: Dir = foe.x >= self.x ? 1 : -1;
  const dx = foe.x - self.x;
  const dy = foe.y - self.y;
  let bestSource = "0.3*x";
  let bestScore = -1e9;

  for (const source of candidates(dx, dy)) {
    const score = scorePlan(world, shooter, source);
    if (score > bestScore) {
      bestScore = score;
      bestSource = source;
    }
  }

  return { source: bestSource, dir };
}

export function defaultDirFor(world: World, shooter: FighterId): Dir {
  const self = fighter(world, shooter);
  const foe = fighter(world, opponentId(shooter));
  return foe.x >= self.x ? 1 : -1;
}
