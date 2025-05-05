"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Project, ProjectTimeline } from "../components/ProjectTimeline";


const sampleProjects: Project[] = [
  {
    id: "reeflog",
    title: "ReefLog (Swift Student Challenge)",
    category: "Mobile",
    images: [null, null, null],
  },
  {
    id: "photobomb",
    title: "PhotoBomb",
    category: "Mobile",
    images: [null, null, null],
  },
  {
    id: "dockbot",
    title: "DockBot",
    category: "AI",
    images: [null, null, null],
  },
];

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="min-h-screen px-8 flex items-center justify-between bg-white  text-black">
        <div>
          <h1 className="text-6xl font-bold">Alhwyn Geonzon</h1>
          <p className="mt-4 text-lg">building in Victoria rn</p>
        </div>
      </section>

      <h3 className="text-2xl font-serif pl-8">What i’ve been up too...</h3>
      <div className="p-8">
        <ProjectTimeline projects={sampleProjects} />
      </div>
    </>
  );
}
