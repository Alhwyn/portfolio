"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArenaCanvas, type Playback } from "@/components/math-wars/ArenaCanvas";
import { FunctionBar } from "@/components/math-wars/FunctionBar";
import { sfx, setMuted, isMuted } from "@/lib/math-wars/audio";
import { chooseCpuShot, defaultDirFor } from "@/lib/math-wars/cpu";
import { parseExpr } from "@/lib/math-wars/expr";
import { simulateShot, shotDamage } from "@/lib/math-wars/simulate";
import { loadStats, recordMatch } from "@/lib/math-wars/stats";
import {
  MAP_LABELS,
  MODE_LABELS,
  type Dir,
  type FighterId,
  type GameMode,
  type MapId,
  type ShotPlan,
  type World,
} from "@/lib/math-wars/types";
import {
  DUEL_HP,
  PRACTICE_HP,
  applyChip,
  cloneWorld,
  createWorld,
  damageFighter,
  fighter,
  opponentId,
  randomMapId,
} from "@/lib/math-wars/world";

type Phase =
  | { kind: "aim"; turn: FighterId; until: number }
  | { kind: "firing"; turn: FighterId }
  | { kind: "cpu-think"; until: number }
  | { kind: "over"; winner: FighterId };

const TURN_MS = 22000;
const CPU_MS = 1100;

function hpFor(mode: GameMode): number {
  return mode === "practice" ? PRACTICE_HP : DUEL_HP;
}

function shooterLabel(mode: GameMode, turn: FighterId): string {
  if (mode === "practice") return "Practice shot";
  if (mode === "hotseat") return turn === "blue" ? "Blue's shot" : "Red's shot";
  return turn === "blue" ? "Your shot" : "Rival is graphing…";
}

function winnerLabel(mode: GameMode, winner: FighterId): string {
  if (mode === "practice") return "Target down";
  if (mode === "hotseat") return winner === "blue" ? "Blue wins" : "Red wins";
  return winner === "blue" ? "You win" : "Rival wins";
}

export function MathWarsGame() {
  const [muted, setMutedState] = useState(false);
  const [mode, setMode] = useState<GameMode>("cpu");
  const [world, setWorld] = useState<World>(() =>
    createWorld("brick-crossing", DUEL_HP, 7),
  );
  const [phase, setPhase] = useState<Phase>(() => ({
    kind: "aim",
    turn: "blue",
    until: Date.now() + TURN_MS,
  }));
  const [source, setSource] = useState("0.4x + 2*sin(x)");
  const [dir, setDir] = useState<Dir>(1);
  const [error, setError] = useState<string | null>(null);
  const [playback, setPlayback] = useState<Playback | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [lastShot, setLastShot] = useState<string | null>(null);
  const [bestComboThisMatch, setBestComboThisMatch] = useState(0);
  const planRef = useRef<ShotPlan | null>(null);
  const playbackKey = useRef(0);
  const resolvedKey = useRef(-1);
  const busyRef = useRef(false);
  const worldRef = useRef(world);
  const recordedRef = useRef(false);

  worldRef.current = world;

  useEffect(() => {
    if (phase.kind === "over") return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [phase.kind]);

  const startMatch = useCallback((nextMode: GameMode, mapPick: MapId | "random") => {
    const mapId = mapPick === "random" ? randomMapId() : mapPick;
    const next = createWorld(mapId, hpFor(nextMode));
    setMode(nextMode);
    setWorld(next);
    setSource("0.4x + 2*sin(x)");
    setDir(defaultDirFor(next, "blue"));
    setError(null);
    setPlayback(null);
    planRef.current = null;
    recordedRef.current = false;
    busyRef.current = false;
    resolvedKey.current = -1;
    setBestComboThisMatch(0);
    setLastShot(null);
    setNow(Date.now());
    setPhase({
      kind: "aim",
      turn: "blue",
      until: Date.now() + (nextMode === "practice" ? 60000 : TURN_MS),
    });
  }, []);

  const preview = useMemo(() => {
    if (phase.kind !== "aim") return [];
    const parsed = parseExpr(source);
    if (!parsed.ok) return [];
    const plan = simulateShot(world, phase.turn, parsed.ast, dir);
    return plan.points;
  }, [dir, phase, source, world]);

  const fire = useCallback(
    (turn: FighterId, exprSource: string, shotDir: Dir) => {
      if (busyRef.current) return;
      const parsed = parseExpr(exprSource);
      if (!parsed.ok) {
        setError(parsed.error);
        return;
      }
      busyRef.current = true;
      const plan = simulateShot(worldRef.current, turn, parsed.ast, shotDir);
      playbackKey.current += 1;
      planRef.current = plan;
      setError(null);
      setLastShot(`${turn === "blue" ? "Blue" : "Red"} fired ${exprSource}`);
      setPlayback({
        key: playbackKey.current,
        points: plan.points,
        chips: plan.chips,
        color: turn === "blue" ? "#93c5fd" : "#fdba74",
      });
      setPhase({ kind: "firing", turn });
      sfx("fire");
    },
    [],
  );

  const onChip = useCallback((chip: { x: number; y: number }) => {
    setWorld((current) => {
      const next = cloneWorld(current);
      applyChip(next, chip.x, chip.y);
      return next;
    });
    sfx("chip");
  }, []);

  const finishShot = useCallback(
    (key: number) => {
      if (key !== playbackKey.current || resolvedKey.current === key) return;
      resolvedKey.current = key;
      busyRef.current = false;
      const plan = planRef.current;
      const currentWorld = worldRef.current;
      setPlayback(null);
      if (!plan) return;

      setBestComboThisMatch((n) => Math.max(n, plan.combo));

      if (plan.outcome === "hit" && plan.hit) {
        sfx("hit");
        const dmg = shotDamage(plan);
        const next = cloneWorld(currentWorld);
        const hitId = plan.hit;
        damageFighter(next, hitId, dmg);
        setWorld(next);
        worldRef.current = next;
        if (fighter(next, hitId).hp <= 0) {
          setPhase({ kind: "over", winner: opponentId(hitId) });
          return;
        }
      } else if (plan.outcome === "miss" || plan.outcome === "explode") {
        sfx("miss");
      }

      const shooter = phase.kind === "firing" ? phase.turn : "blue";
      if (mode === "practice") {
        setDir(defaultDirFor(worldRef.current, "blue"));
        setPhase({ kind: "aim", turn: "blue", until: Date.now() + 60000 });
        return;
      }
      const nextTurn = opponentId(shooter);
      if (mode === "cpu" && nextTurn === "red") {
        setPhase({ kind: "cpu-think", until: Date.now() + CPU_MS });
        return;
      }
      setDir(defaultDirFor(worldRef.current, nextTurn));
      setPhase({ kind: "aim", turn: nextTurn, until: Date.now() + TURN_MS });
    },
    [mode, phase],
  );

  useEffect(() => {
    if (phase.kind !== "aim") return;
    if (now && now >= phase.until) {
      const next = opponentId(phase.turn);
      if (mode === "practice") {
        setPhase({ kind: "aim", turn: "blue", until: Date.now() + 60000 });
        return;
      }
      if (mode === "cpu" && next === "red") {
        setPhase({ kind: "cpu-think", until: Date.now() + CPU_MS });
        return;
      }
      setDir(defaultDirFor(world, next));
      setPhase({ kind: "aim", turn: next, until: Date.now() + TURN_MS });
    }
  }, [mode, now, phase, world]);

  useEffect(() => {
    if (phase.kind !== "cpu-think") return;
    if (now && now >= phase.until) {
      const shot = chooseCpuShot(world, "red");
      setSource(shot.source);
      setDir(shot.dir);
      fire("red", shot.source, shot.dir);
    }
  }, [fire, now, phase, world]);

  useEffect(() => {
    if (phase.kind !== "over" || recordedRef.current) return;
    recordedRef.current = true;
    const won = mode !== "hotseat" && phase.winner === "blue";
    if (mode !== "hotseat") {
      recordMatch(loadStats(), won, bestComboThisMatch);
    }
    sfx(phase.winner === "blue" ? "win" : "lose");
  }, [bestComboThisMatch, mode, phase]);

  const aiming = phase.kind === "aim";
  const inputTurn = aiming ? phase.turn : null;
  const inputLocked = !aiming;
  const secondsLeft =
    phase.kind === "aim" ? Math.max(0, Math.ceil((phase.until - now) / 1000)) : 0;

  let overlay: string | undefined;
  if (phase.kind === "over") overlay = winnerLabel(mode, phase.winner);
  else if (phase.kind === "cpu-think") overlay = "Rival is graphing…";

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl bg-[#12171e] text-white ring-1 ring-neutral-900/15">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center gap-1.5">
          {(Object.keys(MODE_LABELS) as GameMode[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => startMatch(id, world.mapId)}
              className={`rounded-full px-2.5 py-1 text-xs ${
                mode === id
                  ? "bg-white text-neutral-900"
                  : "bg-white/10 text-white/70"
              }`}
            >
              {MODE_LABELS[id]}
            </button>
          ))}
          <span className="text-xs text-white/40">{MAP_LABELS[world.mapId]}</span>
        </div>
        <div className="flex items-center gap-2">
          {phase.kind === "aim" && mode !== "practice" ? (
            <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-xs text-white/70">
              {secondsLeft}s
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => {
              const next = !isMuted();
              setMuted(next);
              setMutedState(next);
            }}
            className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/70"
          >
            {muted ? "Sound off" : "Sound on"}
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ArenaCanvas
          world={world}
          preview={aiming && !inputLocked ? preview : []}
          previewColor={inputTurn === "red" ? "#fdba74" : "#93c5fd"}
          playback={playback}
          aimId={inputTurn}
          overlay={overlay}
          onChip={onChip}
          onPlaybackDone={finishShot}
        />
      </div>

      {lastShot ? (
        <p className="m-0 px-4 pb-1 font-mono text-[11px] text-white/40 sm:px-5">
          {lastShot}
        </p>
      ) : null}

      <FunctionBar
        value={source}
        dir={dir}
        error={error}
        disabled={inputLocked}
        label={
          phase.kind === "over"
            ? winnerLabel(mode, phase.winner)
            : shooterLabel(mode, inputTurn ?? "blue")
        }
        onChange={(value) => {
          setSource(value);
          setError(null);
        }}
        onDir={setDir}
        onFire={() => {
          if (phase.kind === "aim") fire(phase.turn, source, dir);
        }}
      />

      {phase.kind === "over" ? (
        <div className="flex justify-end gap-2 px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={() => startMatch(mode, world.mapId)}
            className="rounded-lg bg-amber-300 px-3 py-2 text-sm font-medium text-neutral-900"
          >
            Rematch
          </button>
        </div>
      ) : null}
    </div>
  );
}
