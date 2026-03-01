"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimelineEntry, TimelineItem } from "./TimelineEntry";
import { ProjectHoverPreview } from "../ProjectHoverPreview";

type TimelineContainerProps<T extends TimelineItem> = {
  items: T[];
  backgroundClassName?: string;
  entryIconSize?: number;
  entryIconClassName?: string;
  showConnector?: boolean;
  showHoverPreview?: boolean;
};

const HOVER_DELAY_MS = 200;

export function TimelineContainer<T extends TimelineItem>({
  items,
  backgroundClassName = "bg-slate-50 dark:bg-neutral-900 dark:text-gray-100",
  entryIconSize = 48,
  entryIconClassName = "w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100 shadow-md",
  showConnector = false,
  showHoverPreview = false,
}: TimelineContainerProps<T>) {
  const [hoveredItem, setHoveredItem] = useState<TimelineItem | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (item: TimelineItem) => {
    if (!showHoverPreview) return;
    hoverTimeoutRef.current = setTimeout(() => setHoveredItem(item), HOVER_DELAY_MS);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredItem(null);
  };

  return (
    <div className={`relative ${backgroundClassName} pt-2 pr-8 pb-2`}>
      {showHoverPreview && hoveredItem && (
        <ProjectHoverPreview item={hoveredItem} visible={!!hoveredItem} />
      )}
      <div className={`space-y-4 w-[600px] h-max[1500px] ${backgroundClassName} rounded-xl pr-4 mr-4 overflow-hidden my-8`}>
        <AnimatePresence>
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
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
    </div>
  );
}

