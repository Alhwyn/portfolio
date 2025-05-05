"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const projects = [
  { id: "reeflog", title: "ReefLog (Swift Student Challenge)", description: "A mobile app for tracking reef health and wildlife.", markdown: "Detailed write‑up for ReefLog goes here." },
  { id: "photobomb", title: "PhotoBomb", description: "A fun mobile app that adds surprises to your photo stream.", markdown: "Detailed write‑up for PhotoBomb goes here." },
  { id: "dockbot", title: "DockBot", description: "An AI chatbot for volunteer onboarding at the co‑working space.", markdown: "Detailed write‑up for DockBot goes here. - dsfsd" },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <>
      {/* Hero section */}
      <section className="min-h-screen px-8 flex items-center justify-between bg-white text-black">
        <div>
          <h1 className="text-6xl font-bold">Alhwyn Geonzon</h1>
          <p className="mt-4 text-lg">builder in Victoria BC.</p>
        </div>
      </section>

      {/* Projects section */}
      <section id="projects" className="grid grid-cols-1 sm:grid-cols-3 gap-8 min-h-screen p-8">
        {/* Sidebar: project list */}
        <aside className="col-span-1 space-y-4 overflow-y-auto h-screen hide-scrollbar">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`w-full text-left p-4 rounded-full transition-colors duration-200 ${
                selectedProject.id === project.id ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </button>
          ))}
        </aside>

        {/* Detail view: selected project */}
        <article className="col-span-2 p-6 border rounded overflow-y-auto h-screen hide-scrollbar">
          <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
          <div className="prose mb-6">
            <ReactMarkdown>{selectedProject.markdown}</ReactMarkdown>
          </div>
          {/* You can add images or additional components here */}
        </article>
      </section>
    </>
  );
}
