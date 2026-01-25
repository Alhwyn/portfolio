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
    icon: "/image/icon/archive.svg",
  },
];


const HackathonList: Hackathon[] = [
  {
    id: "slate",
    title: "Cafe Cursor Victoria",
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
  
  // Sample leaderboard data - replace with actual data from your API/database
  const leaderboardEntries = [
    { rank: 1, name: "Team Alpha", score: 950 },
    { rank: 2, name: "Team Beta", score: 875 },
    { rank: 3, name: "Team Gamma", score: 820 },
    { rank: 4, name: "Team Delta", score: 765 },
    { rank: 5, name: "Team Epsilon", score: 720 },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400 lg:ml-64">
      <CountdownBanner 
        eventName="Cafe Cursor Victoria" 
        targetDate={cafeCursorDate}
        lumaUrl="https://lu.ma/7bx22l8b"
        lumaModelUrl="https://luma.com/7bs63dew"
        leaderboardEntries={leaderboardEntries}
        showLeaderboard={true}
      />

      {/* Theme toggle button in the top-right corner */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          aria-label="Toggle light/dark mode"
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 hover:scale-110 transition-all shadow-md"
        >
          {theme === "dark" ? (
            <Sun className="w-6 h-6 text-yellow-300" strokeWidth={1} />
          ) : (
            <Moon className="w-6 h-6 text-gray-800" strokeWidth={1} />
          )}
        </button>
      </div>

      {/* Hero section */}
      <section className="relative min-h-screen w-full px-4 sm:px-8 py-8 sm:py-12 flex flex-col justify-center items-start gap-8 bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400">
          <div className="w-full max-w-3xl">
            <p className="text-base sm:text-lg text-gray-600 dark:text-neutral-400 leading-relaxed">
              I&apos;m a software developer based in Victoria, Canada. 
              I organize hackathons and build projects in my free time.
            </p>
          </div>
          
          <div className="absolute bottom-5 left-4 sm:left-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-2 w-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl instrument-serif-regular-italic">What i&apos;ve been up too</h3>
          </div>
      </section>
      {/* Projects section */}
      <div className="pl-4">
        <ProjectTimeline projects={ProjectsList} />
      </div>
      
      <section className="pl-4 sm:pl-8 bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400">
        <h3 className="text-lg sm:text-xl md:text-2xl instrument-serif-regular-italic">Hackathons I&apos;ve Organized</h3>
      </section>

      <div className="pl-4">
        <HackathonTimeline projects={HackathonList} />
      </div>
    </div>
  );
}
