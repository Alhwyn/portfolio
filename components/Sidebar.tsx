"use client";

import { useState } from "react";
import { useAIChat } from "@/contexts/AIChatContext";
import { cn } from "@/lib/utils";

const EMAIL = "alhwyn@alhwyn.com";

export function Sidebar() {
  const { isOpen } = useAIChat();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen w-64 flex-col p-8 border-r border-border bg-slate-50 dark:bg-neutral-900 z-40",
        "hidden",
        isOpen ? "lg:hidden" : "lg:flex"
      )}
    >
      <div>
        <h1 className="text-2xl instrument-serif-regular text-gray-700 dark:text-neutral-300">
          alhwyn.com
        </h1>
        <div className="mt-3 space-y-2 text-gray-700 dark:text-neutral-400">
          <a href="https://x.com/alhwyn" target="_blank" rel="noopener noreferrer" className="block hover:underline">
            x.com/alhwyn
          </a>
          <a href="https://github.com/Alhwyn" target="_blank" rel="noopener noreferrer" className="block hover:underline">
            github.com/alhwyn
          </a>
          <a href="https://www.linkedin.com/in/alhwyn" target="_blank" rel="noopener noreferrer" className="block hover:underline">
            linkedin.com/alhwyn
          </a>
          <button
            type="button"
            onClick={handleCopy}
            title="Click to copy"
            aria-live="polite"
            className="block hover:underline cursor-pointer text-left bg-transparent border-none p-0 font-inherit text-gray-700 dark:text-neutral-400"
          >
            {copied ? "Copied!" : EMAIL}
          </button>
        </div>
      </div>
    </aside>
  );
}
