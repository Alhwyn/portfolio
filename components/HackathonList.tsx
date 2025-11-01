import React from "react";
import { TimelineContainer } from "./timeline/TimelineContainer";
import { TimelineItem } from "./timeline/TimelineEntry";

export type Hackathon = TimelineItem & {
  date: string;
};

type HackathonTimelineProps = {
  projects: Hackathon[];
};

export function HackathonTimeline({ projects }: HackathonTimelineProps) {
  return (
    <TimelineContainer
      items={projects}
      backgroundClassName="bg-slate-100 dark:bg-neutral-900 dark:text-neutral-400"
      entryIconSize={128}
      entryIconClassName="w-32 h-32 rounded-lg object-contain flex-shrink-0"
      showConnector={false}
    />
  );
}
