import { FN_ARITY, FN_NAMES, type Expr, type FnName, type ParseResult } from "./types.ts";

const MAX_SOURCE = 64;
const MAX_NODES = 96;

type TokKind =
  | "num"
  | "id"
  | "plus"
  | "minus"
  | "star"
  | "slash"
  | "caret"
  | "lparen"
  | "rparen"
  | "comma"
  | "eof";

type Tok = {
  kind: TokKind;
  value?: string;
  pos: number;
};

const FN_SET = new Set<string>(FN_NAMES);

function isFnName(name: string): name is FnName {
  return FN_SET.has(name);
}

function tokenize(source: string): Tok[] | string {
  const tokens: Tok[] = [];
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    if (ch === " " || ch === "\t") {
      i += 1;
      continue;
    }
    if (ch >= "0" && ch <= "9") {
      const start = i;
      i += 1;
      while (i < source.length && source[i] >= "0" && source[i] <= "9") i += 1;
      if (source[i] === ".") {
        i += 1;
        if (!(source[i] >= "0" && source[i] <= "9")) {
          return `Number at ${start + 1} needs digits after the decimal.`;
        }
        while (i < source.length && source[i] >= "0" && source[i] <= "9") i += 1;
      }
      tokens.push({ kind: "num", value: source.slice(start, i), pos: start });
      continue;
    }
    if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z")) {
      const start = i;
      i += 1;
      while (
        i < source.length &&
        ((source[i] >= "a" && source[i] <= "z") ||
          (source[i] >= "A" && source[i] <= "Z") ||
          source[i] === "_")
      ) {
        i += 1;
      }
      tokens.push({
        kind: "id",
        value: source.slice(start, i).toLowerCase(),
        pos: start,
      });
      continue;
    }
    const pos = i;
    switch (ch) {
      case "+":
        tokens.push({ kind: "plus", pos });
        break;
      case "-":
        tokens.push({ kind: "minus", pos });
        break;
      case "*":
        tokens.push({ kind: "star", pos });
        break;
      case "/":
        tokens.push({ kind: "slash", pos });
        break;
      case "^":
        tokens.push({ kind: "caret", pos });
        break;
      case "(":
        tokens.push({ kind: "lparen", pos });
        break;
      case ")":
        tokens.push({ kind: "rparen", pos });
        break;
      case ",":
        tokens.push({ kind: "comma", pos });
        break;
      default:
        return `Unexpected "${ch}" at ${pos + 1}.`;
    }
    i += 1;
  }
  tokens.push({ kind: "eof", pos: source.length });
  return insertImplicitMul(tokens);
}

function canEndAtom(kind: TokKind): boolean {
  return kind === "num" || kind === "id" || kind === "rparen";
}

function canStartAtom(kind: TokKind): boolean {
  return kind === "num" || kind === "id" || kind === "lparen";
}

function insertImplicitMul(tokens: Tok[]): Tok[] {
  const out: Tok[] = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const cur = tokens[i];
    const prev = out[out.length - 1];
    if (
      prev &&
      canEndAtom(prev.kind) &&
      canStartAtom(cur.kind) &&
      !(prev.kind === "id" && cur.kind === "lparen")
    ) {
      out.push({ kind: "star", pos: cur.pos });
    }
    out.push(cur);
  }
  return out;
}

class Parser {
  private i = 0;
  private nodes = 0;
  private readonly tokens: Tok[];

  constructor(tokens: Tok[]) {
    this.tokens = tokens;
  }

  parse(): ParseResult {
    try {
      const ast = this.parseAdd();
      if (this.peek().kind !== "eof") {
        return { ok: false, error: "Extra characters after the function." };
      }
      return { ok: true, ast };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Could not parse that.",
      };
    }
  }

  private bumpNodes() {
    this.nodes += 1;
    if (this.nodes > MAX_NODES) {
      throw new Error("Function is too nested.");
    }
  }

  private peek(): Tok {
    return this.tokens[this.i];
  }

  private eat(kind: TokKind): Tok {
    const tok = this.peek();
    if (tok.kind !== kind) {
      throw new Error("That function is incomplete.");
    }
    this.i += 1;
    return tok;
  }

  private parseAdd(): Expr {
    let left = this.parseMul();
    while (this.peek().kind === "plus" || this.peek().kind === "minus") {
      const op = this.peek().kind === "plus" ? "+" : "-";
      this.i += 1;
      this.bumpNodes();
      left = { type: "binary", op, left, right: this.parseMul() };
    }
    return left;
  }

  private parseMul(): Expr {
    let left = this.parseUnary();
    while (this.peek().kind === "star" || this.peek().kind === "slash") {
      const op = this.peek().kind === "star" ? "*" : "/";
      this.i += 1;
      this.bumpNodes();
      left = { type: "binary", op, left, right: this.parseUnary() };
    }
    return left;
  }

  private parseUnary(): Expr {
    if (this.peek().kind === "minus") {
      this.i += 1;
      this.bumpNodes();
      return { type: "unary", op: "-", arg: this.parseUnary() };
    }
    if (this.peek().kind === "plus") {
      this.i += 1;
      return this.parseUnary();
    }
    return this.parsePow();
  }

  private parsePow(): Expr {
    const left = this.parsePrimary();
    if (this.peek().kind !== "caret") return left;
    this.i += 1;
    this.bumpNodes();
    return { type: "binary", op: "^", left, right: this.parseUnary() };
  }

  private parsePrimary(): Expr {
    const tok = this.peek();
    if (tok.kind === "num") {
      this.i += 1;
      this.bumpNodes();
      return { type: "num", value: Number(tok.value) };
    }
    if (tok.kind === "id") {
      this.i += 1;
      const name = tok.value ?? "";
      if (this.peek().kind === "lparen") {
        if (!isFnName(name)) {
          throw new Error(`Unknown function "${name}".`);
        }
        this.i += 1;
        const args: Expr[] = [];
        if (this.peek().kind !== "rparen") {
          args.push(this.parseAdd());
          while (this.peek().kind === "comma") {
            this.i += 1;
            args.push(this.parseAdd());
          }
        }
        this.eat("rparen");
        const arity = FN_ARITY[name];
        if (args.length < arity.min || args.length > arity.max) {
          throw new Error(`${name}() needs ${arity.min} value${arity.min === 1 ? "" : "s"}.`);
        }
        this.bumpNodes();
        return { type: "call", name, args };
      }
      if (name === "x") {
        this.bumpNodes();
        return { type: "var" };
      }
      if (name === "pi") {
        this.bumpNodes();
        return { type: "const", name: "pi" };
      }
      if (name === "e") {
        this.bumpNodes();
        return { type: "const", name: "e" };
      }
      throw new Error(`Unknown name "${name}". Use x, pi, e, or a function.`);
    }
    if (tok.kind === "lparen") {
      this.i += 1;
      const inner = this.parseAdd();
      this.eat("rparen");
      return inner;
    }
    throw new Error("Expected a number, x, or a function.");
  }
}

export function parseExpr(source: string): ParseResult {
  const trimmed = source.trim();
  if (!trimmed) return { ok: false, error: "Type a function of x." };
  if (trimmed.length > MAX_SOURCE) {
    return { ok: false, error: "Keep it under 64 characters." };
  }
  const tokens = tokenize(trimmed);
  if (typeof tokens === "string") return { ok: false, error: tokens };
  return new Parser(tokens).parse();
}

function evalBinary(op: "+" | "-" | "*" | "/" | "^", left: number, right: number): number {
  switch (op) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "^":
      return left ** right;
    default: {
      const neverOp: never = op;
      throw new Error(`Unhandled op ${neverOp}`);
    }
  }
}

function evalCall(name: FnName, args: number[]): number {
  switch (name) {
    case "sin":
      return Math.sin(args[0]);
    case "cos":
      return Math.cos(args[0]);
    case "tan":
      return Math.tan(args[0]);
    case "abs":
      return Math.abs(args[0]);
    case "sqrt":
      return Math.sqrt(args[0]);
    case "log":
    case "ln":
      return Math.log(args[0]);
    case "exp":
      return Math.exp(args[0]);
    case "floor":
      return Math.floor(args[0]);
    case "ceil":
      return Math.ceil(args[0]);
    case "round":
      return Math.round(args[0]);
    case "asin":
      return Math.asin(args[0]);
    case "acos":
      return Math.acos(args[0]);
    case "atan":
      return Math.atan(args[0]);
    case "min":
      return Math.min(args[0], args[1]);
    case "max":
      return Math.max(args[0], args[1]);
    default: {
      const neverFn: never = name;
      throw new Error(`Unhandled fn ${neverFn}`);
    }
  }
}

function evalNode(node: Expr, x: number): number {
  switch (node.type) {
    case "num":
      return node.value;
    case "var":
      return x;
    case "const":
      return node.name === "pi" ? Math.PI : Math.E;
    case "unary":
      return -evalNode(node.arg, x);
    case "binary":
      return evalBinary(
        node.op,
        evalNode(node.left, x),
        evalNode(node.right, x),
      );
    case "call":
      return evalCall(
        node.name,
        node.args.map((arg) => evalNode(arg, x)),
      );
    default: {
      const neverExpr: never = node;
      throw new Error(`Unhandled expr ${(neverExpr as Expr).type}`);
    }
  }
}

export function evalExpr(ast: Expr, x: number): number {
  return evalNode(ast, x);
}

export function isFiniteNumber(n: number): boolean {
  return Number.isFinite(n);
}
