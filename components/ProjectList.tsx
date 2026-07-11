"use client";

import { useRef, useState } from "react";
import { ProjectHoverPreview } from "@/components/ProjectHoverPreview";

export type ProjectListItem = {
  id: string;
  title: string;
  year: string;
  previewSrc?: string;
  previewType?: "video" | "image" | "carousel";
  previewWidth?: number;
  previewHeight?: number;
  previewFrame?: "phone" | "flat";
  previewImages?: Array<{ src: string; alt: string; type?: "image" | "video" }>;
  blurb?: string;
  stack?: string;
  href?: string;
};

type ProjectListProps = {
  projects: ProjectListItem[];
  activeId?: string | null;
  onProjectEnter?: (project: ProjectListItem) => void;
  onProjectLeave?: () => void;
  onProjectSelect?: (project: ProjectListItem) => void;
};

const HOVER_LEAVE_MS = 100;

export function ProjectList({
  projects,
  activeId = null,
  onProjectEnter,
  onProjectLeave,
  onProjectSelect,
}: ProjectListProps) {
  const [hoverPreviewId, setHoverPreviewId] = useState<string | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLeaveTimer = () => {
    if (leaveTimerRef.current !== null) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const handleEnter = (project: ProjectListItem) => {
    clearLeaveTimer();
    setHoverPreviewId(project.id);
    onProjectEnter?.(project);
  };

  const handleLeave = () => {
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      setHoverPreviewId(null);
      onProjectLeave?.();
      leaveTimerRef.current = null;
    }, HOVER_LEAVE_MS);
  };

  return (
    <div className="w-full max-w-[18rem]">
      <ul className="m-0 list-none border-t border-neutral-900/20 p-0">
        {projects.map((project) => (
          <li
            key={project.id}
            className="relative border-b border-neutral-900/20 text-xs leading-tight text-neutral-900"
          >
            <button
              type="button"
              onClick={() => onProjectSelect?.(project)}
              onMouseEnter={() => handleEnter(project)}
              onMouseLeave={handleLeave}
              onFocus={() => handleEnter(project)}
              onBlur={handleLeave}
              className={`flex w-full cursor-pointer items-center gap-2 border-0 bg-transparent p-0 py-1.5 text-left text-inherit transition-opacity hover:opacity-60 ${
                activeId === project.id
                  ? "opacity-100"
                  : activeId
                    ? "opacity-40"
                    : ""
              }`}
            >
              <span className="min-w-0">{project.title}</span>
              <span className="ml-auto shrink-0 tabular-nums text-neutral-900/55">
                {project.year}
              </span>
            </button>
            {hoverPreviewId === project.id ? (
              <ProjectHoverPreview project={project} />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
