"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

export type ArchiveProject = {
  id: string;
  title: string;
  year?: string;
  tags?: string[];
  icon?: string;
  description?: string;
};

type ArchiveGridProps = {
  projects: ArchiveProject[];
};

export function ArchiveGrid({ projects }: ArchiveGridProps) {
  if (projects.length === 0) {
    return (
      <div className="w-full px-8 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 dark:text-neutral-500">No archived projects yet. Add projects to the ArchiveProjects array to see them here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="block group h-full"
              >
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    {project.icon && (
                      <Image
                        src={project.icon}
                        alt={`${project.title} icon`}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100 dark:bg-neutral-700"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold instrument-serif-regular text-gray-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.year && (
                        <p className="text-sm text-gray-500 dark:text-neutral-500 mt-1">
                          {project.year}
                        </p>
                      )}
                    </div>
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.filter(Boolean).slice(0, 3).map((tag, tagIdx) => (
                        <Badge
                          key={tagIdx}
                          className="text-xs text-gray-600 rounded-2xl bg-gray-200 dark:bg-zinc-800 dark:text-neutral-400"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

