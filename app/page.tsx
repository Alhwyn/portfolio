"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Project, ProjectTimeline } from "../components/ProjectTimeline";


const ProjectsList: Project[] = [
  {
    id: "photobomb",
    title: "PhotoBomb",
    images: [null, null, null],
    tags: ["Mobile", "Photo Party Game", "2025"],
    icon: "./public/image/icon/the_dock_victoria_logo.jpeg"
  },
  {
    id: "AI BC lawyer",
    title: "AI BC lawyer Agent",
    images: [null, null, null],
    tags: ["AI Agent", "MCP", "2025"],
  },
  {
    id: "reeflog",
    title: "ReefLog",
    images: [null, null, null],
    tags: ["Mobile", "SSC", "2025"],
    icon: "./public/image/icon/Reeflog_icon.png"
  },
  {
    id: "dockbot",
    title: "DockBot",
    images: [null, null, null],
    tags: ["AI", "Chatbot", "2024"],
    icon: "./public/image/icon/the_dock_victoria_logo.jpeg"
  },
];

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="min-h-screen px-8 flex items-center justify-between bg-white  text-black">
        <div>
        <h1 className="text-6xl instrument-serif-regular">Alhwyn Geonzon</h1>
          <p className="text-gray-500 text-md source-serif-4">building in Victoria rn</p>
        </div>
      </section>

      <h3 className="text-2xl instrument-serif-regular-italic pl-8">What i’ve been up too...</h3>
      <div className="p-8">
        <ProjectTimeline projects={ProjectsList} />
      </div>
    </>
  );
}
