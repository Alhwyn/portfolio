import React from "react";
import { TimelineContainer } from "./timeline/TimelineContainer";
import { TimelineItem } from "./timeline/TimelineEntry";

export type Project = TimelineItem & {
  year: string;
};

type ProjectTimelineProps = {
  projects: Project[];
};

export function ProjectTimeline({ projects }: ProjectTimelineProps) {
  return (
    <TimelineContainer
      items={projects}
      backgroundClassName="bg-slate-100 dark:bg-neutral-900 dark:text-gray-100"
      entryIconSize={48}
      entryIconClassName="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100 shadow-md"
      showConnector={true}
    />
  );
}
