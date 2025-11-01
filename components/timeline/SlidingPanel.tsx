import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type SlidingPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  iconSize?: number;
  iconClassName?: string;
  children: React.ReactNode;
  backgroundClassName?: string;
};

export function SlidingPanel({
  isOpen,
  onClose,
  title,
  icon,
  iconSize = 48,
  iconClassName = "w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 shadow-md",
  children,
  backgroundClassName = "bg-slate-100 dark:bg-neutral-900 dark:text-gray-100",
}: SlidingPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.article
          initial={{ x: '100%', opacity: 0, scale: 0.96 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 40, opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`fixed inset-y-0 right-0 w-full sm:w-1/2 ${backgroundClassName} shadow-md z-50`}
        >
          <header className="flex justify-between items-center p-6 gap-r-6">
            <div className="flex items-center gap-4">
              {icon ? (
                <Image
                  src={icon}
                  alt={`${title} icon`}
                  width={iconSize}
                  height={iconSize}
                  className={iconClassName}
                  priority={iconSize > 48}
                />
              ) : (
                <div className={iconClassName} />
              )}
              <h3 className="text-2xl source-serif-4 dark:text-neutral-400">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </header>
          <div className="p-6 overflow-y-auto h-[calc(100%-4rem)] relative z-10">
            {children}
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
}

