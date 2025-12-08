"use client";

import { Project, ProjectTimeline } from "../components/ProjectTimeline";
import { Hackathon, HackathonTimeline } from "../components/HackathonList";
import CountdownBanner from "@/components/CountdownBanner";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/use-theme";



const ProjectsList: Project[] = [
  {
    id: "photobomb",
    title: "PhotoBomb",
    year: "2025",
    description: "A mobile party game for sharing fun photos with friends. Coming soon 👀",
    icon: "/image/icon/photobob_icon.jpeg",
  },
  {
    id: "archive",
    title: "Archive",
    year: "2024",
    description: "A collection of archived projects",
    icon: "/image/icon/archive.png",
  },
];


const HackathonList: Hackathon[] = [
  {
    id: "slate",
    title: "Cafe Cursor",
    date: "2025",
    description: "Come and join us from Victoria, BC Canada ",
    icon: "/image/icon/cursor.png",
  },
  {
    id: "cursor-hackathon",
    title: "Cursor Hackathon Victoria",
    date: "September 2025",
    description: "A hackathon event in Victoria focused on building innovative projects using Cursor and modern development tools.",
    icon: "/image/icon/cursor.png",
  },
  {
    id: "scrapyard",
    title: "Scrapyard Victoria",
    date: "March 2025",
    description: "A hackathon specifically designed for high school students. Co-organized with Kai Prairie.",
    icon: "/image/scrapyardvictoria.png",
  }
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const cafeCursorDate = "2025-12-14T09:00:00-08:00";

  return (
    <div className="relative min-h-screen bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400">
      <CountdownBanner 
        eventName="Cafe Cursor Victoria" 
        targetDate={cafeCursorDate}
        lumaUrl="https://lu.ma/7bx22l8b"
      />

      {/* Theme toggle button in the top-right corner */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          aria-label="Toggle light/dark mode"
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 hover:scale-110 transition-all shadow-md"
        >
          {theme === "dark" ? (
            <Sun className="w-6 h-6 text-yellow-300" />
          ) : (
            <Moon className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Hero section */}
      <section className="relative min-h-screen w-full px-4 sm:px-8 py-8 sm:py-12 flex flex-col justify-center items-start gap-8 bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400">
          <div className="w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl instrument-serif-regular text-gray-700 dark:text-neutral-300 pb-2">Alhwyn Geonzon</h1>
            <p className="text-gray-700 text-sm sm:text-md dark:text-neutral-400">18 year-old building Victoria, Canada</p>
          </div>

          <div className="mt-8 sm:mt-0 sm:absolute sm:bottom-8 sm:right-8 w-full sm:w-auto text-left sm:text-right space-y-2 text-gray-700 dark:text-neutral-400 text-sm sm:text-base">
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
          
          <div className="absolute bottom-5 left-4 sm:left-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-2 w-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl instrument-serif-regular-italic">What i&apos;ve been up too</h3>
            <span className="pl-0 sm:pl-5 text-2xl sm:text-3xl slow-bounce z-10 relative">↓</span>
          </div>
      </section>
      {/* Projects section */}
      <div className="pl-4">
        <ProjectTimeline projects={ProjectsList} />
      </div>
      
      <section className="pl-4 sm:pl-8 bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400">
        <h3 className="text-lg sm:text-xl md:text-2xl instrument-serif-regular-italic">Hackathon Maxxing (I organize hackathons)</h3>
      </section>

      <div className="pl-4">
        <HackathonTimeline projects={HackathonList} />
      </div>
    </div>
  );
}
