import type { Fighter, FighterId, MapId, World } from "./types.ts";

export const WORLD_WIDTH = 40;
export const WORLD_HEIGHT = 22;
export const HIT_RADIUS = 0.72;
export const SHOT_POWER = 3;
export const PRACTICE_HP = 5;
export const DUEL_HP = 3;

function cellIndex(width: number, x: number, y: number): number {
  return y * width + x;
}

export function isSolid(world: World, cx: number, cy: number): boolean {
  if (cx < 0 || cy < 0 || cx >= world.width || cy >= world.height) return false;
  return world.cells[cellIndex(world.width, cx, cy)] === 1;
}

export function setSolid(
  world: World,
  cx: number,
  cy: number,
  solid: boolean,
): void {
  if (cx < 0 || cy < 0 || cx >= world.width || cy >= world.height) return;
  world.cells[cellIndex(world.width, cx, cy)] = solid ? 1 : 0;
}

export function cloneWorld(world: World): World {
  return {
    mapId: world.mapId,
    width: world.width,
    height: world.height,
    cells: new Uint8Array(world.cells),
    blue: { ...world.blue },
    red: { ...world.red },
  };
}

export function fighter(world: World, id: FighterId): Fighter {
  return id === "blue" ? world.blue : world.red;
}

export function opponentId(id: FighterId): FighterId {
  return id === "blue" ? "red" : "blue";
}

function makeFighter(
  id: FighterId,
  x: number,
  y: number,
  hp: number,
): Fighter {
  return { id, x, y, hp, maxHp: hp };
}

function emptyCells(): Uint8Array {
  return new Uint8Array(WORLD_WIDTH * WORLD_HEIGHT);
}

function paintRect(
  cells: Uint8Array,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): void {
  const left = Math.max(0, Math.min(x0, x1));
  const right = Math.min(WORLD_WIDTH - 1, Math.max(x0, x1));
  const bottom = Math.max(0, Math.min(y0, y1));
  const top = Math.min(WORLD_HEIGHT - 1, Math.max(y0, y1));
  for (let y = bottom; y <= top; y += 1) {
    for (let x = left; x <= right; x += 1) {
      cells[cellIndex(WORLD_WIDTH, x, y)] = 1;
    }
  }
}

function paintDisk(
  cells: Uint8Array,
  cx: number,
  cy: number,
  r: number,
): void {
  const r2 = r * r;
  for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y += 1) {
    for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x += 1) {
      if (x < 0 || y < 0 || x >= WORLD_WIDTH || y >= WORLD_HEIGHT) continue;
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      if (dx * dx + dy * dy <= r2) {
        cells[cellIndex(WORLD_WIDTH, x, y)] = 1;
      }
    }
  }
}

function jitter(seed: number): number {
  const n = Math.sin(seed * 12.9898) * 43758.5453;
  return n - Math.floor(n);
}

function scatterStuds(cells: Uint8Array, seed: number): void {
  const spots = [
    [8, 6],
    [10, 16],
    [15, 10],
    [19, 4],
    [20, 17],
    [24, 11],
    [29, 5],
    [31, 15],
  ];
  spots.forEach(([x, y], i) => {
    const dx = Math.floor(jitter(seed + i) * 3) - 1;
    const dy = Math.floor(jitter(seed + i + 20) * 3) - 1;
    paintRect(cells, x + dx, y + dy, x + dx + 1, y + dy + 1);
  });
}

function brickWalls(cells: Uint8Array, seed: number): void {
  const gapA = 6 + Math.floor(jitter(seed) * 8);
  const gapB = 5 + Math.floor(jitter(seed + 3) * 9);
  for (let y = 2; y < WORLD_HEIGHT - 2; y += 1) {
    if (y === gapA || y === gapA + 1) continue;
    paintRect(cells, 13, y, 14, y);
  }
  for (let y = 2; y < WORLD_HEIGHT - 2; y += 1) {
    if (y === gapB || y === gapB + 1) continue;
    paintRect(cells, 25, y, 26, y);
  }
  paintRect(cells, 19, 2, 20, 4);
  paintRect(cells, 19, WORLD_HEIGHT - 5, 20, WORLD_HEIGHT - 3);
}

function starPark(cells: Uint8Array, seed: number): void {
  paintDisk(cells, 20, 11, 3.1);
  paintRect(cells, 19, 6, 20, 16);
  paintRect(cells, 15, 10, 24, 11);
  const corners = [
    [7, 4],
    [7, 16],
    [31, 4],
    [31, 16],
  ];
  corners.forEach(([x, y], i) => {
    const lift = Math.floor(jitter(seed + i) * 2);
    paintRect(cells, x, y + lift, x + 1, y + 1 + lift);
  });
}

function clearSpawns(cells: Uint8Array, blueX: number, redX: number, y: number): void {
  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      const by = y + dy;
      const bx = blueX + dx;
      const rx = redX + dx;
      if (bx >= 0 && bx < WORLD_WIDTH && by >= 0 && by < WORLD_HEIGHT) {
        cells[cellIndex(WORLD_WIDTH, bx, by)] = 0;
      }
      if (rx >= 0 && rx < WORLD_WIDTH && by >= 0 && by < WORLD_HEIGHT) {
        cells[cellIndex(WORLD_WIDTH, rx, by)] = 0;
      }
    }
  }
}

export function createWorld(
  mapId: MapId,
  hp: number,
  seed = Date.now(),
): World {
  const cells = emptyCells();
  switch (mapId) {
    case "stud-yard":
      scatterStuds(cells, seed);
      break;
    case "brick-crossing":
      brickWalls(cells, seed);
      break;
    case "star-park":
      starPark(cells, seed);
      break;
    default: {
      const neverMap: never = mapId;
      throw new Error(`Unhandled map ${neverMap}`);
    }
  }

  const blueX = 3;
  const redX = WORLD_WIDTH - 4;
  const y = 10;
  clearSpawns(cells, blueX, redX, y);

  return {
    mapId,
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT,
    cells,
    blue: makeFighter("blue", blueX + 0.5, y + 0.5, hp),
    red: makeFighter("red", redX + 0.5, y + 0.5, hp),
  };
}

export const MAP_CYCLE: MapId[] = [
  "stud-yard",
  "brick-crossing",
  "star-park",
];

export function randomMapId(seed = Date.now()): MapId {
  return MAP_CYCLE[Math.floor(jitter(seed) * MAP_CYCLE.length)];
}

export function applyChip(world: World, x: number, y: number): void {
  setSolid(world, x, y, false);
}

export function damageFighter(world: World, id: FighterId, amount: number): void {
  const unit = fighter(world, id);
  unit.hp = Math.max(0, unit.hp - amount);
}
