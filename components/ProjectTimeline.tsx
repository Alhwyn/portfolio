import React, { useMemo } from "react";
import { Badge } from "./ui/badge";

export type Project = {
  id: string;
  title: string;
  icon?: string;
  tags?: Array<string | null>;
  images: Array<string | null>; // null → black placeholder
  year: string;
};

type ProjectTimelineProps = {
  projects: Project[];
};

export function ProjectTimeline({ projects }: ProjectTimelineProps) {
  return (
    <div className="relative">
        
      <div className="space-y-4 w-[600px] h-[800px]">
        {projects.map((project, idx) => (
          <ProjectEntry 
            key={project.id} 
            project={project}
            isLast={idx === projects.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

type ProjectEntryProps = {
  project: Project;
  isLast?: boolean;
};

function ProjectEntry({ project, isLast }: ProjectEntryProps) {

  const rotations = useMemo(
    () => project.images.map(() => (Math.random() * 10 - 5).toFixed(2)),
    [project.images]
  );

  return (
    <div className="relative pl-4 group hover:bg-gray-100 transition-colors duration-200 min-h-[440px] rounded-lg">

        {!isLast && (
            <div className="absolute left-10 top-14 h-[calc(100%-4.5rem)] w-px bg-gray-300 z-0" />
        )}

        <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0" />
            <h3 className="text-2xl source-serif-4">{project.title}</h3>
        </div>


{/*     <div className="mt-6 flex pl-10 items-center">
        {project.images.map((img, idx) => (
            <div
            key={idx}
            className={`${
                idx > 0 ? "-ml-8" : ""
            } flex-shrink-0 rounded-lg bg-gray-200 ${img === null ? "bg-black" : ""}`}
            style={{
                width: "10rem",
                height: "1rem",
                transform: `rotate(${rotations[idx]}deg)`,
            }}
            >
            {img && (
                <img
                src={img}
                alt={`${project.title} screenshot ${idx + 1}`}
                className="w-full h-full object-cover rounded-lg"
                />
            )}
            </div>
        ))}
        </div> */}
    </div>
  );
}

// Sample usage:

