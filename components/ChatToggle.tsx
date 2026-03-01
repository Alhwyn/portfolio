"use client";

import { cn } from "@/lib/utils";
import { BicycleWheelIcon } from "./BicycleWheelIcon";

interface ChatToggleProps {
  onClick: () => void;
  isOpen?: boolean;
  className?: string;
}

export function ChatToggle({ onClick, isOpen, className }: ChatToggleProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Open AI chat"
      aria-expanded={isOpen}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 h-8 px-2.5 rounded-lg",
        "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700",
        "text-neutral-700 dark:text-neutral-200 transition-colors",
        className
      )}
    >
      <BicycleWheelIcon className="w-4 h-4" />
    </button>
  );
}
