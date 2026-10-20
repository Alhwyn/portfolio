export type MathWarsStats = {
  wins: number;
  games: number;
  bestCombo: number;
};

const KEY = "alhwyn-math-wars-stats";

const EMPTY: MathWarsStats = {
  wins: 0,
  games: 0,
  bestCombo: 0,
};

export function loadStats(): MathWarsStats {
  if (typeof window === "undefined") return { ...EMPTY };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<MathWarsStats>;
    return {
      wins: Number(parsed.wins) || 0,
      games: Number(parsed.games) || 0,
      bestCombo: Number(parsed.bestCombo) || 0,
    };
  } catch {
    return { ...EMPTY };
  }
}

export function saveStats(stats: MathWarsStats): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(stats));
}

export function recordMatch(
  stats: MathWarsStats,
  won: boolean,
  combo: number,
): MathWarsStats {
  const next = {
    wins: stats.wins + (won ? 1 : 0),
    games: stats.games + 1,
    bestCombo: Math.max(stats.bestCombo, combo),
  };
  saveStats(next);
  return next;
}

export function titleFor(stats: MathWarsStats): string {
  if (stats.wins >= 25) return "Curve Ace";
  if (stats.wins >= 10) return "Grapher";
  if (stats.wins >= 3) return "Shooter";
  if (stats.games >= 1) return "Rookie";
  return "New Challenger";
}
