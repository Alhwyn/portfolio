import React, { useState } from "react";
import { TimelineContainer } from "./timeline/TimelineContainer";
import { TimelineItem } from "./timeline/TimelineEntry";

export type Hackathon = TimelineItem & {
  date: string;
};

type HackathonTimelineProps = {
  projects: Hackathon[];
};

export function HackathonTimeline({ projects }: HackathonTimelineProps) {
  const [openProject, setOpenProject] = useState<Hackathon | null>(null);
  
  return (
    <TimelineContainer
      items={projects}
      openItem={openProject}
      onItemClick={setOpenProject}
      onClose={() => setOpenProject(null)}
      backgroundClassName="bg-slate-100 dark:bg-neutral-900 dark:text-neutral-400"
      entryIconSize={128}
      entryIconClassName="w-32 h-32 rounded-lg object-contain flex-shrink-0"
      headerIconSize={160}
      headerIconClassName="w-40 h-40 rounded-lg object-contain flex-shrink-0"
      showConnector={false}
    />
  );
}
