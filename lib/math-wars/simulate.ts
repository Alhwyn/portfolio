import { evalExpr, isFiniteNumber } from "./expr.ts";
import type { Dir, Expr, FighterId, ShotPlan, Vec2, World } from "./types.ts";
import { HIT_RADIUS, SHOT_POWER, fighter, isSolid, opponentId } from "./world.ts";

const STEP = 0.08;
const SELF_GRACE = 1.35;
const MAX_T = 56;

export function sampleCurve(
  ast: Expr,
  origin: Vec2,
  dir: Dir,
  maxT = MAX_T,
): Vec2[] {
  const points: Vec2[] = [{ x: origin.x, y: origin.y }];
  for (let t = STEP; t <= maxT; t += STEP) {
    const yOff = evalExpr(ast, t);
    if (!isFiniteNumber(yOff)) break;
    points.push({
      x: origin.x + dir * t,
      y: origin.y + yOff,
    });
  }
  return points;
}

function dist2(a: Vec2, b: Vec2): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function simulateShot(
  world: World,
  shooter: FighterId,
  ast: Expr,
  dir: Dir,
  power = SHOT_POWER,
): ShotPlan {
  const origin = fighter(world, shooter);
  const foe = opponentId(shooter);
  const target = fighter(world, foe);
  const points: Vec2[] = [];
  const chips: ShotPlan["chips"] = [];
  const destroyed = new Set<string>();
  let remaining = power;
  let outcome: ShotPlan["outcome"] = "miss";
  let hit: FighterId | null = null;
  let hitAt = -1;
  let traveled = 0;
  let prevX = origin.x;
  let prevY = origin.y;

  points.push({ x: origin.x, y: origin.y });

  for (let t = STEP; t <= MAX_T; t += STEP) {
    let yOff: number;
    try {
      yOff = evalExpr(ast, t);
    } catch {
      outcome = "explode";
      break;
    }
    if (!isFiniteNumber(yOff)) {
      outcome = "explode";
      break;
    }

    const x = origin.x + dir * t;
    const y = origin.y + yOff;
    points.push({ x, y });
    traveled += Math.hypot(x - prevX, y - prevY);
    prevX = x;
    prevY = y;

    if (x < 0 || y < 0 || x >= world.width || y >= world.height) {
      outcome = "miss";
      break;
    }

    const cx = Math.floor(x);
    const cy = Math.floor(y);
    const key = `${cx},${cy}`;
    if (isSolid(world, cx, cy) && !destroyed.has(key)) {
      if (remaining <= 0) {
        outcome = "blocked";
        break;
      }
      remaining -= 1;
      destroyed.add(key);
      chips.push({ x: cx, y: cy, at: points.length - 1 });
    }

    if (traveled > SELF_GRACE && dist2({ x, y }, target) <= HIT_RADIUS * HIT_RADIUS) {
      hit = foe;
      hitAt = points.length - 1;
      outcome = "hit";
      break;
    }
  }

  return {
    points,
    chips,
    hit,
    hitAt,
    outcome,
    combo: chips.length + (hit ? 1 : 0),
  };
}

export function shotDamage(plan: ShotPlan): number {
  if (plan.outcome !== "hit") return 0;
  return plan.chips.length >= 2 ? 2 : 1;
}

export function closestApproach(plan: ShotPlan, world: World, foe: FighterId): number {
  const target = fighter(world, foe);
  let best = Infinity;
  for (const p of plan.points) {
    const d = Math.hypot(p.x - target.x, p.y - target.y);
    if (d < best) best = d;
  }
  return best;
}
