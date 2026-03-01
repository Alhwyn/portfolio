"use client";

import { ChatToggle } from "@/components/ChatToggle";
import { ThemeToggle } from "@/components/HomeClient";
import { AISidebar } from "@/components/AISidebar";
import { useAIChat } from "@/contexts/AIChatContext";

export function AISidebarProvider() {
  const { isOpen, setIsOpen } = useAIChat();

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <ThemeToggle />
        <ChatToggle
          onClick={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
      </div>

      <AISidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
