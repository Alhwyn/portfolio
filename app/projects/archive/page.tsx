"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArchiveGrid, ArchiveProject } from "@/components/ArchiveGrid";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// Archive projects - these will be displayed in a 4x4 grid
const ArchiveProjects: ArchiveProject[] = [
  {
    id: "canlii-mcp",
    title: "CanLII MCP",
    year: "2025",
    icon: "/image/icon/canlii.jpg",
  },
  {
    id: "reeflog",
    title: "ReefLog",
    year: "2025",
    icon: "/image/icon/Reeflog_icon.png",
  },
  {
    id: "dockbot",
    title: "DockBot",
    year: "2024",
    icon: "/image/icon/the_dock_victoria_logo.jpeg",
  },
];

export default function ArchivePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      {/* Archive header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-8 pb-8"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 instrument-serif-regular text-gray-900 dark:text-neutral-100">
          Archive
        </h1>
        <p className="text-gray-600 dark:text-neutral-500 text-lg">
          A collection of past projects and experiments
        </p>
      </motion.div>

      {/* Archive grid */}
      <ArchiveGrid projects={ArchiveProjects} />
    </div>
  );
}

