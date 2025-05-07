"use client";

import React, { useState, useEffect} from "react";
import { Project, ProjectTimeline } from "../components/ProjectTimeline";
import PhotoBomb from "@/components/ProjectArticle.tsx/PhotoBomb";
import LawyerAgent from "@/components/ProjectArticle.tsx/LawyerAgent";
import Reeflog from "@/components/ProjectArticle.tsx/Reeflog";
import Dockbot from "@/components/ProjectArticle.tsx/Dockbot";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";



const ProjectsList: Project[] = [
  {
    id: "photobomb",
    title: "PhotoBomb",
    year: "2025",
    tags: ["Mobile", "Photo Party Game", "Coming soon 👀"],
    icon: "/image/icon/photobob_icon.jpeg",
    article: <PhotoBomb />,
  },
  {
    id: "AI Lawyer Assistant",
    title: "BC Lawyer Agent",
    year: "2025",
    tags: ["AI Agent", "MCP", "Legal"],
    icon: "/image/icon/bc_icon.png",
    article: <LawyerAgent />,
  },
  {
    id: "reeflog",
    title: "ReefLog",
    year: "2025",
    tags: ["Mobile", "SwiftUI", "Machine Learning"],
    icon: "/image/icon/Reeflog_icon.png",
    article: <Reeflog />,
  },
  {
    id: "dockbot",
    title: "DockBot",
    year: "2024",
    tags: ["AI",  "RAG", "Chatbot"],
    icon: "/image/icon/the_dock_victoria_logo.jpeg",
    article: <Dockbot />,
  },
];

export default function Home() {
  const [theme, setTheme] = useState<"light"|"dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light"|"dark"|null;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  // Whenever theme changes, update <html> and persist
  useEffect(() => {
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
      className="bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400"
    >

      {/* Theme toggle button in the top-right corner */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle light/dark mode"
          className="p-2 rounded-full bg-gray-200 dark:bg-neutral-400 hover:scale-110 transition"
        >
          {theme === "dark" ? (
            <Sun className="w-6 h-6 text-stone-100" />
          ) : (
            <Moon className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Hero section */}
      <section className="min-h-screen w-full px-8 flex items-center justify-between bg-slate-100 text-black dark:bg-neutral-900 dark:text-neutral-400">
          <div>
            <h1 className="text-7xl instrument-serif-regular gradient-text pb-2">Alhwyn Geonzon</h1>
            <p className="text-gray-700 text-md dark:text-neutral-400">18 year-old in highschool building in Victoria, Canada 🇨🇦</p>
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
      
    </motion.div>
  );
}
