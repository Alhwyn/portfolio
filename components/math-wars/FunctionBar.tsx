"use client";

import type { Dir } from "@/lib/math-wars/types";

export const FUNCTION_CHIPS = [
  "0.4x",
  "sin(x)",
  "2*sin(x)",
  "0.05*x^2",
  "-0.05*x^2",
  "abs(x)",
  "0.4x+2*sin(x)",
];

type FunctionBarProps = {
  value: string;
  dir: Dir;
  error: string | null;
  disabled: boolean;
  label: string;
  onChange: (value: string) => void;
  onDir: (dir: Dir) => void;
  onFire: () => void;
};

export function FunctionBar({
  value,
  dir,
  error,
  disabled,
  label,
  onChange,
  onDir,
  onFire,
}: FunctionBarProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-white/10 bg-[#0c1016] px-4 py-3 sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="m-0 text-xs tracking-tight text-white/55">{label}</p>
        <p className="m-0 text-[11px] text-white/40">
          x is distance from you. Bend around cover. Chip holes. Last standing wins.
        </p>
      </div>

      <form
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
        onSubmit={(event) => {
          event.preventDefault();
          if (!disabled) onFire();
        }}
      >
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-white/5 px-3 py-2 ring-1 ring-white/10 focus-within:ring-white/30">
          <span className="shrink-0 font-mono text-sm text-white/60">y =</span>
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            placeholder="0.4x + 2*sin(x)"
            className="min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/25 disabled:opacity-50"
            aria-label="Function of x"
            aria-invalid={Boolean(error)}
          />
        </label>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onDir(1)}
            className={`rounded-lg px-3 py-2 text-sm transition-opacity disabled:opacity-40 ${
              dir === 1 ? "bg-sky-500 text-white" : "bg-white/10 text-white/70"
            }`}
          >
            +x
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onDir(-1)}
            className={`rounded-lg px-3 py-2 text-sm transition-opacity disabled:opacity-40 ${
              dir === -1 ? "bg-orange-500 text-white" : "bg-white/10 text-white/70"
            }`}
          >
            −x
          </button>
          <button
            type="submit"
            disabled={disabled}
            className="rounded-lg bg-amber-300 px-4 py-2 text-sm font-medium text-neutral-900 disabled:opacity-40"
          >
            Fire
          </button>
        </div>
      </form>

      {error ? (
        <p className="m-0 text-xs text-rose-300" role="status">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-1.5">
        {FUNCTION_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            disabled={disabled}
            onClick={() => onChange(chip)}
            className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white/70 transition-opacity hover:bg-white/15 disabled:opacity-40"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
