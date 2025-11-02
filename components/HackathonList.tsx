import { motion, AnimatePresence } from "framer-motion";
import { TimelineEntry, TimelineItem } from "./timeline/TimelineEntry";

export type Hackathon = TimelineItem & {
  date: string;
};

type HackathonTimelineProps = {
  projects: Hackathon[];
};

export function HackathonTimeline({ projects }: HackathonTimelineProps) {
  return (
    <div className="relative bg-slate-100 dark:bg-slate-900 dark:text-neutral-400 pt-8 pr-8 pb-8">
      <div className="space-y-8 w-[600px] bg-slate-100 dark:bg-slate-900 dark:text-neutral-400 rounded-xl">
        <AnimatePresence>
          {projects.map((item, idx) => {
            // Use smaller icon size for cursor-hackathon
            const isCursorHackathon = item.id === "cursor-hackathon";
            const iconSize = isCursorHackathon ? 64 : 128;
            const iconClassName = isCursorHackathon 
              ? "w-16 h-16 rounded-lg object-contain"
              : "w-32 h-32 rounded-lg object-contain";
            
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
                  minHeight="auto"
                  iconContainerWidth="w-32"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
