import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import Image from "next/image";


export type Hackathon = {
  id: string;
  title: string;
  date: string;
  icon?: string;
  tags?: Array<string | null>;
  description?: string;
  article?: React.ReactNode;
};

type HackathonTimelineProps = {
  projects: Hackathon[];
};

export function HackathonTimeline({ projects }: HackathonTimelineProps) {
  const [openProject, setOpenProject] = useState<Hackathon | null>(null);
  return (
    <div className="relative bg-slate-50 dark:bg-neutral-900 dark:text-neutral-400 pt-8 pr-8 pb-8">
      <div className="space-y-4 w-[600px] h-max[1500px] bg-slate-50 dark:bg-neutral-900 dark:text-neutral-400 rounded-xl pr-4 mr-4 overflow-hidden my-8">
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
      <AnimatePresence mode="wait">
        {openProject && (
          <motion.article
            key={openProject.id} 
            initial={{ x: '100%', opacity: 0, scale: 0.96 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 40, opacity: 0, scale: 0.96 }}  
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-full sm:w-1/2 bg-slate-50 dark:bg-neutral-900 dark:text-neutral-400 shadow-md"
      >
            <header className="flex justify-between items-center p-6 gap-r-6 ">
              <div className="flex items-center gap-4">
                {openProject.icon ? (
                  <Image
                    src={openProject.icon}
                    alt={`${openProject.title} icon`}
                    width={160}
                    height={160}
                    className="w-40 h-40 rounded-lg object-contain flex-shrink-0"
                    priority
                  />
                ) : (
                  <div className="w-40 h-40 rounded-lg flex-shrink-0" />
                )}
                <h3 className="text-2xl source-serif-4 dark:text-neutral-400">{openProject.title}</h3>
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
  project: Hackathon;
};

function ProjectEntry({ project }: ProjectEntryProps) {

  return (
    <div className="relative pl-4 group hover:bg-gray-100 hover:dark:bg-neutral-700 transition-colors duration-200 min-h-[200px] rounded-lg"> 
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            {project.icon ? (
              <Image
                src={project.icon}
                alt={`${project.title} icon`}
                width={128}
                height={128}
                className="w-32 h-32 rounded-lg object-contain flex-shrink-0"
                loading="lazy"
              />
            ) : (
              <div className="w-32 h-32 rounded-lg flex-shrink-0" />
            )}
            <h3 className="text-2xl source-serif-4 dark:text-neutral-400">{project.title}</h3>
          </div>
        </div>
        {project.tags && (
          <div className="flex gap-2 mb-4 ml-16">
            {project.tags.filter(Boolean).map((tag, idx) => (
              <Badge className="text-gray-600 rounded-2xl bg-gray-200 dark:bg-zinc-800 dark:text-neutral-400" key={idx}>{tag}</Badge>
            ))}
          </div>
        )}
    </div>
  );
}
