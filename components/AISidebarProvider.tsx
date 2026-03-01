"use client";

import { ChatToggle } from "@/components/ChatToggle";
import { AISidebar } from "@/components/AISidebar";
import { useAIChat } from "@/contexts/AIChatContext";
// import { useTheme } from "@/hooks/use-theme";
// import { Sun, Moon } from "lucide-react";

export function AISidebarProvider() {
  const { isOpen, setIsOpen } = useAIChat();
  // const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Top-right toolbar: chat button */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <ChatToggle
          onClick={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
        {/* <button
          onClick={toggleTheme}
          aria-label="Toggle light/dark mode"
          className="flex items-center justify-center h-8 w-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-neutral-300" strokeWidth={1} />
          ) : (
            <Moon className="w-4 h-4 text-neutral-600" strokeWidth={1} />
          )}
        </button> */}
      </div>

      <AISidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
