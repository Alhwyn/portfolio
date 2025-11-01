import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimelineEntry, TimelineItem } from "./TimelineEntry";

type TimelineContainerProps<T extends TimelineItem> = {
  items: T[];
  backgroundClassName?: string;
  entryIconSize?: number;
  entryIconClassName?: string;
  showConnector?: boolean;
};

export function TimelineContainer<T extends TimelineItem>({
  items,
  backgroundClassName = "bg-slate-100 dark:bg-neutral-900 dark:text-gray-100",
  entryIconSize = 48,
  entryIconClassName = "w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100 shadow-md",
  showConnector = false,
}: TimelineContainerProps<T>) {
  return (
    <div className={`relative ${backgroundClassName} pt-8 pr-8 pb-8`}>
      <div className={`space-y-4 w-[600px] h-max[1500px] ${backgroundClassName} rounded-xl pr-4 mr-4 overflow-hidden my-8`}>
        <AnimatePresence>
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
            >
              <TimelineEntry
                item={item}
                iconSize={entryIconSize}
                iconClassName={entryIconClassName}
                showConnector={showConnector}
                isLast={idx === items.length - 1}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Animated social media bar */}
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
        className="absolute top-4 right-0"
      />
    </div>
  );
}

