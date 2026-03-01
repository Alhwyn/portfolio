"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        aria-label="Toggle light/dark mode"
        className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 hover:scale-110 transition-all shadow-md"
      >
        {theme === "dark" ? (
          <Sun className="w-6 h-6 text-yellow-300" strokeWidth={1} />
        ) : (
          <Moon className="w-6 h-6 text-gray-800" strokeWidth={1} />
        )}
      </button>
    </div>
  );
}
