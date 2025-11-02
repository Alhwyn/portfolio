"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export type ArchiveProject = {
  id: string;
  title: string;
  year?: string;
  tags?: string[];
  icon?: string;
  description?: string;
  image?: string;
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

  // Ensure we have at least 9 items to fill the 3x3 grid, pad with empty slots
  const paddedProjects: (ArchiveProject | null)[] = [...projects];
  while (paddedProjects.length < 9) {
    paddedProjects.push(null);
  }

  return (
    <div className="w-full px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {paddedProjects.slice(0, 9).map((project, idx) => {
            if (!project) {
              return <div key={`empty-${idx}`} className="w-full" />;
            }

            const imageSrc = project.image || project.icon;

            return (
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
                  <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full overflow-hidden border border-gray-100 dark:border-neutral-700">
                    <div className="flex gap-4 p-6 h-full">
                      {imageSrc && (
                        <div className="flex-shrink-0 w-28 h-28 bg-gray-100 dark:bg-neutral-700 rounded-lg overflow-hidden">
                          <Image
                            src={imageSrc}
                            alt={`${project.title} image`}
                            width={112}
                            height={112}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="text-base font-bold text-gray-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
                          {project.title}
                        </h3>
                        {project.description && (
                          <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed font-normal">
                            {project.description}
                          </p>
                        )}
                        {!project.description && project.year && (
                          <p className="text-sm text-gray-500 dark:text-neutral-500">
                            {project.year}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

