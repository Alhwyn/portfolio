"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light/dark mode"
      className="inline-flex items-center justify-center gap-1.5 h-8 px-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" strokeWidth={1} />
      ) : (
        <Moon className="w-4 h-4" strokeWidth={1} />
      )}
    </button>
  );
}
