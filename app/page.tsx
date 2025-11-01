"use client";

import React, { useState, useEffect} from "react";
import { Project, ProjectTimeline } from "../components/ProjectTimeline";
import { Hackathon, HackathonTimeline } from "../components/HackathonList";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";



const ProjectsList: Project[] = [
  {
    id: "photobomb",
    title: "PhotoBomb",
    year: "2025",
    tags: ["Mobile", "Photo Party Game", "Coming soon 👀"],
    icon: "/image/icon/photobob_icon.jpeg",
  },
  {
    id: "canlii-mcp",
    title: "CanLII MCP",
    year: "2025",
    tags: ["AI", "MCP", "Legal"],
    icon: "/image/icon/canlii.jpg",
  },
  {
    id: "reeflog",
    title: "ReefLog",
    year: "2025",
    tags: ["Mobile", "SwiftUI", "Machine Learning"],
    icon: "/image/icon/Reeflog_icon.png",
  },
  {
    id: "dockbot",
    title: "DockBot",
    year: "2024",
    tags: ["AI",  "RAG", "Chatbot"],
    icon: "/image/icon/the_dock_victoria_logo.jpeg",
  },
];


const HackathonList: Hackathon[] = [
  {
    id: "scrapyard",
    title: "Scrapyard Victoria",
    date: "March 2025",
    tags: ["March 2025", "HighSchool Hackathon"],
    icon: "/image/scrapyardvictoria.png",
  }
];

export default function Home() {
  const [theme, setTheme] = useState<"light"|"dark">("light");

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    const stored = localStorage.getItem("theme") as "light"|"dark"|null;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  // Whenever theme changes, update <html> and persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };
  return (
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative min-h-screen bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400"
    >

      {/* Theme toggle button in the top-right corner */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          aria-label="Toggle light/dark mode"
          className="p-2 rounded-full bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 hover:scale-110 transition-all shadow-md"
        >
          {theme === "dark" ? (
            <Sun className="w-6 h-6 text-yellow-300" />
          ) : (
            <Moon className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Hero section */}
      <section className="relative min-h-screen w-full px-8 flex items-center justify-between bg-slate-100 text-black dark:bg-neutral-900 dark:text-neutral-400">
          <div>
            <h1 className="text-7xl instrument-serif-regular gradient-text pb-2">Alhwyn Geonzon</h1>
            <p className="text-gray-700 text-md dark:text-neutral-400">18 year-old building Victoria, Canada 🇨🇦</p>
          </div>

          <div className="absolute bottom-8 right-8 text-right space-y-2 text-gray-700 dark:text-neutral-400">
            <a href="https://x.com/alhwynn" target="_blank" rel="noopener noreferrer" className="block hover:underline">
              x.com/alhwynn
            </a>
            <a href="https://github.com/Alhwyn" target="_blank" rel="noopener noreferrer" className="block hover:underline">
              github.com/alhwyn
            </a>
            <a href="https://www.linkedin.com/in/alhwyn" target="_blank" rel="noopener noreferrer" className="block hover:underline">
              linkedin.com/alhwyn
            </a>
            <a href="mailto:alhwyn@alhwyn.com" className="block hover:underline">alhwyn@alhwyn.com</a>
        </div>
        <div className="absolute bottom-5 left-8 flex items-center gap-x-2">
          <h3 className="text-2xl instrument-serif-regular-italic">What i’ve been up too</h3>
          <span className="pl-5 text-3xl  slow-bounce">↓</span>
        </div>
      </section>
      {/* Projects section */}
      <div className="pl-4">
        <ProjectTimeline projects={ProjectsList} />
      </div>
      <section className="pl-8 bg-slate-100 text-black dark:bg-neutral-900 dark:text-neutral-400">
        <div className="flex items-center gap-x-2">
          <h3 className="text-2xl instrument-serif-regular-italic">Hackathon Maxxing</h3>
          <span className="pl-5 text-3xl  slow-bounce">↓</span>
        </div>
      </section>

      <div className="pl-4">
        <HackathonTimeline projects={HackathonList} />
      </div>
    </motion.div>
  );
}
