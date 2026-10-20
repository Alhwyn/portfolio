"use client";

import { MATH_WARS_ROBLOX_URL } from "@/lib/math-wars/roblox";
import { MAP_LABELS, MODE_LABELS, type GameMode, type MapId } from "@/lib/math-wars/types";
import { MAP_CYCLE } from "@/lib/math-wars/world";
import type { MathWarsStats } from "@/lib/math-wars/stats";
import { titleFor } from "@/lib/math-wars/stats";

type MathWarsMenuProps = {
  stats: MathWarsStats;
  onStart: (mode: GameMode, mapId: MapId | "random") => void;
};

const TIPS = [
  "x is distance from your marble, not the arena origin.",
  "0.4x is a slope. sin(x) weaves. 0.05*x^2 is a parabola.",
  "Shots chip three bricks, then stop. Curve around or punch through.",
  "A path that chips two bricks and still hits deals extra damage.",
];

export function MathWarsMenu({ stats, onStart }: MathWarsMenuProps) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center overflow-auto bg-[#12171e]/92 p-4">
      <div className="flex w-full max-w-xl flex-col gap-6 text-white">
        <div>
          <p className="m-0 text-xs uppercase tracking-[0.2em] text-amber-300/80">
            {titleFor(stats)}
          </p>
          <h1 className="mt-1 text-4xl font-medium tracking-tight sm:text-5xl">
            Math Wars
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
            The Roblox math arena I shipped on a new account — 10M+ views in
            under a week. Type a function, pick +x or −x, and fire the curve.
            Last marble standing wins.
          </p>
          <p className="m-0 mt-3 text-sm">
            <a
              href={MATH_WARS_ROBLOX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300/90 underline-offset-2 hover:underline"
            >
              Play on Roblox
            </a>
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(MODE_LABELS) as GameMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onStart(mode, "random")}
              className="rounded-xl bg-white/10 px-3 py-3 text-left ring-1 ring-white/10 transition-colors hover:bg-white/15"
            >
              <span className="block text-sm font-medium">
                {MODE_LABELS[mode]}
              </span>
              <span className="mt-1 block text-[11px] leading-snug text-white/50">
                {mode === "cpu"
                  ? "You vs a rival that graphs back."
                  : mode === "hotseat"
                    ? "Pass the keyboard. Blue then red."
                    : "Dummy target. Unlimited turns."}
              </span>
            </button>
          ))}
        </div>

        <div>
          <p className="m-0 mb-2 text-xs text-white/45">Or pick a yard</p>
          <div className="flex flex-wrap gap-1.5">
            {MAP_CYCLE.map((mapId: MapId) => (
              <button
                key={mapId}
                type="button"
                onClick={() => onStart("cpu", mapId)}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/75 ring-1 ring-white/10 hover:bg-white/15"
              >
                {MAP_LABELS[mapId]}
              </button>
            ))}
          </div>
        </div>

        <ul className="m-0 list-disc space-y-1 pl-4 text-xs leading-relaxed text-white/50">
          {TIPS.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>

        <p className="m-0 text-[11px] text-white/35">
          {stats.games === 0
            ? "No matches yet."
            : `${stats.wins} win${stats.wins === 1 ? "" : "s"} in ${stats.games} · best combo ${stats.bestCombo}`}
        </p>
      </div>
    </div>
  );
}
