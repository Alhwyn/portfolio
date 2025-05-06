"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Project, ProjectTimeline } from "../components/ProjectTimeline";
import PhotoBomb from "@/components/ProjectArticle.tsx/PhotoBomb";


const ProjectsList: Project[] = [
  {
    id: "photobomb",
    title: "PhotoBomb",
    tags: ["Mobile", "Photo Party Game", "2025", "coming soon 👀"],
    icon: "./image/icon/photobob_icon.jpeg",
    article: <PhotoBomb />,
  },
  {
    id: "AI Lawyer Assistant",
    title: "BC Lawyer Agent",
    tags: ["AI Agent", "MCP", "2025"],
    icon: "./image/icon/bc_icon.png",
    article: <PhotoBomb />,
  },
  {
    id: "reeflog",
    title: "ReefLog",
    tags: ["Mobile", "SwiftUI", "2025"],
    icon: "./image/icon/Reeflog_icon.png",
    article: <PhotoBomb />,
  },
  {
    id: "dockbot",
    title: "DockBot",
    tags: ["AI",  "RAG", "Chatbot", "2024"],
    icon: "./image/icon/the_dock_victoria_logo.jpeg",
    article: <PhotoBomb />,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="min-h-screen px-8 flex items-center justify-between bg-white  text-black">
        <div>
        <h1 className="text-6xl instrument-serif-regular">Alhwyn Geonzon</h1>
          <p className="text-gray-700 text-md">18yr in highschool building in Victoria, Canada</p>
        </div>

        <div className="absolute bottom-8 right-8 text-right space-y-2 text-gray-700">
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
      </section>

      <h3 className="text-2xl instrument-serif-regular-italic pl-8">What i’ve been up too...</h3>
      <div className="p-8">
        <ProjectTimeline projects={ProjectsList} />
      </div>
    </>
  );
}
