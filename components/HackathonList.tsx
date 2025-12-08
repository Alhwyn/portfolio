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
    <div className="relative bg-slate-50 dark:bg-neutral-900 dark:text-neutral-400 pt-4 pr-8 pb-4">
      <div className="space-y-2 w-[600px] bg-slate-50 dark:bg-neutral-900 dark:text-neutral-400 rounded-xl">
        <AnimatePresence>
          {projects.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
            >
              <TimelineEntry
                item={item}
                iconSize={40}
                iconClassName="w-10 h-10 rounded-md object-contain"
                showConnector={false}
                isLast={idx === projects.length - 1}
                minHeight="auto"
                iconContainerWidth="w-12"
                basePath="hackathons"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
