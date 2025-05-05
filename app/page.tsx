"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Project, ProjectTimeline } from "../components/ProjectTimeline";


const sampleProjects: Project[] = [
  {
    id: "reeflog",
    title: "ReefLog",
    images: [null, null, null],
    tags: ["Mobile", "SSC"],
    year: "2025",
  },
  {
    id: "photobomb",
    title: "PhotoBomb",
    images: [null, null, null],
    tags: ["Mobile", "Photo Party Game"],
    year: "2025",
  },
  {
    id: "dockbot",
    title: "DockBot",
    images: [null, null, null],
    tags: ["AI", "Chatbot"],
    year: "2024",
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
        <ProjectTimeline projects={sampleProjects} />
      </div>
    </>
  );
}
