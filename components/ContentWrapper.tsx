"use client";

import { useAIChat } from "@/contexts/AIChatContext";
import { cn } from "@/lib/utils";

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen } = useAIChat();
  return (
    <div
      className={cn(
        "transition-[margin] duration-200",
        isOpen && "sm:mr-[376px]"
      )}
    >
      {children}
    </div>
  );
}
