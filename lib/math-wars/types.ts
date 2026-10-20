export type FighterId = "blue" | "red";

export type Dir = 1 | -1;

export type GameMode = "cpu" | "hotseat" | "practice";

export type MapId = "stud-yard" | "brick-crossing" | "star-park";

export type Fighter = {
  id: FighterId;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
};

export type World = {
  mapId: MapId;
  width: number;
  height: number;
  cells: Uint8Array;
  blue: Fighter;
  red: Fighter;
};

export type Vec2 = {
  x: number;
  y: number;
};

export type ShotOutcome = "hit" | "miss" | "explode" | "blocked";

export type Chip = {
  x: number;
  y: number;
  at: number;
};

export type ShotPlan = {
  points: Vec2[];
  chips: Chip[];
  hit: FighterId | null;
  hitAt: number;
  outcome: ShotOutcome;
  combo: number;
};

export type ParseOk = {
  ok: true;
  ast: Expr;
};

export type ParseErr = {
  ok: false;
  error: string;
};

export type ParseResult = ParseOk | ParseErr;

export type FnName =
  | "sin"
  | "cos"
  | "tan"
  | "abs"
  | "sqrt"
  | "log"
  | "ln"
  | "exp"
  | "floor"
  | "ceil"
  | "round"
  | "asin"
  | "acos"
  | "atan"
  | "min"
  | "max";

export type Expr =
  | { type: "num"; value: number }
  | { type: "var" }
  | { type: "const"; name: "pi" | "e" }
  | { type: "unary"; op: "-"; arg: Expr }
  | {
      type: "binary";
      op: "+" | "-" | "*" | "/" | "^";
      left: Expr;
      right: Expr;
    }
  | { type: "call"; name: FnName; args: Expr[] };

export const MAP_LABELS: Record<MapId, string> = {
  "stud-yard": "Stud Yard",
  "brick-crossing": "Brick Crossing",
  "star-park": "Star Park",
};

export const MODE_LABELS: Record<GameMode, string> = {
  cpu: "vs Rival",
  hotseat: "Hotseat",
  practice: "Practice",
};

export const FN_ARITY: Record<FnName, { min: number; max: number }> = {
  sin: { min: 1, max: 1 },
  cos: { min: 1, max: 1 },
  tan: { min: 1, max: 1 },
  abs: { min: 1, max: 1 },
  sqrt: { min: 1, max: 1 },
  log: { min: 1, max: 1 },
  ln: { min: 1, max: 1 },
  exp: { min: 1, max: 1 },
  floor: { min: 1, max: 1 },
  ceil: { min: 1, max: 1 },
  round: { min: 1, max: 1 },
  asin: { min: 1, max: 1 },
  acos: { min: 1, max: 1 },
  atan: { min: 1, max: 1 },
  min: { min: 2, max: 2 },
  max: { min: 2, max: 2 },
};

export const FN_NAMES = Object.keys(FN_ARITY) as FnName[];
