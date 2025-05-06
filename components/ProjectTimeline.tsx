import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import Image from "next/image";


export type Project = {
  id: string;
  title: string;
  icon?: string;
  tags?: Array<string | null>;
  description?: string;
  article?: React.ReactNode;
};

type ProjectTimelineProps = {
  projects: Project[];
};

export function ProjectTimeline({ projects }: ProjectTimelineProps) {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  return (
    <div className="relative bg-slate-50">
      <div className="space-y-4 w-[600px] h-max[1500px] bg-slate-50 rounded-xl pr-4 mr-4 overflow-hidden my-8">
        <AnimatePresence>
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              onClick={() => 
                setOpenProject(project)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
            >
              <ProjectEntry project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Animated social media bar */}
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
        className="absolute top-4 right-0"
      >
      </motion.div>
      {/* Sliding detail panel */}
      <AnimatePresence>
        {openProject && (
          <motion.article
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-full sm:w-1/2 bg-slate-50 shadow-md"
          >
            <header className="flex justify-between items-center p-6 gap-r-6 ">
              <div className="flex items-center gap-4">
                {openProject.icon ? (
                  <img
                    src={openProject.icon}
                    alt={`${openProject.title} icon`}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100 shadow-md"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0" />
                )}
                <h3 className="text-2xl source-serif-4">{openProject.title}</h3>
              </div>
              <button
                onClick={() => setOpenProject(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </header>
            <div className="p-6 overflow-y-auto h-[calc(100%-4rem)]">
              {openProject.article}
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}

type ProjectEntryProps = {
  project: Project;
};

function ProjectEntry({ project }: ProjectEntryProps) {

  return (
    <div className="relative pl-4 group hover:bg-gray-100 transition-colors duration-200 min-h-[440px] rounded-lg">
      <div className="absolute left-10 top-16 h-[calc(100%-3.5rem)] w-px bg-slate-200 z-0" />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 py-2">
            {project.icon ? (
              <img
                src={project.icon}
                alt={`${project.title} icon`}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100 shadow-xl"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 shadow-md" />
            )}
            <h3 className="text-2xl source-serif-4">{project.title}</h3>
          </div>
        </div>
        {project.tags && (
          <div className="flex gap-2 mb-4 ml-16">
            {project.tags.filter(Boolean).map((tag, idx) => (
              <Badge className="text-gray-600 rounded-2xl bg-gray-200" key={idx}>{tag}</Badge>
            ))}
          </div>
        )}
    </div>
  );
}
