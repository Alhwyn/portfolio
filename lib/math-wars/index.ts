export { parseExpr, evalExpr, isFiniteNumber } from "./expr.ts";
export { simulateShot, sampleCurve, shotDamage, closestApproach } from "./simulate.ts";
export { chooseCpuShot, defaultDirFor } from "./cpu.ts";
export {
  createWorld,
  cloneWorld,
  fighter,
  opponentId,
  applyChip,
  damageFighter,
  randomMapId,
  MAP_CYCLE,
  WORLD_WIDTH,
  WORLD_HEIGHT,
  HIT_RADIUS,
  SHOT_POWER,
  PRACTICE_HP,
  DUEL_HP,
} from "./world.ts";
export {
  loadStats,
  saveStats,
  recordMatch,
  titleFor,
  type MathWarsStats,
} from "./stats.ts";
export {
  MAP_LABELS,
  MODE_LABELS,
  type FighterId,
  type Dir,
  type GameMode,
  type MapId,
  type World,
  type ShotPlan,
  type Expr,
  type ParseResult,
} from "./types.ts";
export { MATH_WARS_ROBLOX_URL } from "./roblox.ts";
