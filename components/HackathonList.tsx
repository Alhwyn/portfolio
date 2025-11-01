import React from "react";
import { TimelineEntry, TimelineItem } from "./timeline/TimelineEntry";
import { motion, AnimatePresence } from "framer-motion";

export type Hackathon = TimelineItem & {
  date: string;
};

type HackathonTimelineProps = {
  projects: Hackathon[];
};

export function HackathonTimeline({ projects }: HackathonTimelineProps) {
  return (
    <div className="relative bg-slate-100 dark:bg-neutral-900 dark:text-neutral-400 pt-8 pr-8 pb-8">
      <div className="space-y-4 w-[600px] h-max[1500px] bg-slate-100 dark:bg-neutral-900 dark:text-neutral-400 rounded-xl pr-4 mr-4 overflow-hidden my-8">
        <AnimatePresence>
          {projects.map((item, idx) => {
            // Use smaller icon size for cursor-hackathon
            const isCursorHackathon = item.id === "cursor-hackathon";
            const iconSize = isCursorHackathon ? 64 : 128;
            const iconClassName = isCursorHackathon 
              ? "w-16 h-16 rounded-lg object-contain flex-shrink-0"
              : "w-32 h-32 rounded-lg object-contain flex-shrink-0";
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
              >
                <TimelineEntry
                  item={item}
                  iconSize={iconSize}
                  iconClassName={iconClassName}
                  showConnector={false}
                  isLast={idx === projects.length - 1}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
