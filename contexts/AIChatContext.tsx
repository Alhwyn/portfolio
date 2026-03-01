"use client";

import { createContext, useContext, useState } from "react";

type AIChatContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const AIChatContext = createContext<AIChatContextType | null>(null);

export function AIChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AIChatContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AIChatContext.Provider>
  );
}

export function useAIChat() {
  const ctx = useContext(AIChatContext);
  if (!ctx) throw new Error("useAIChat must be used within AIChatProvider");
  return ctx;
}
