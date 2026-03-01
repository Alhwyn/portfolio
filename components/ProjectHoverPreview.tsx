"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { TimelineItem } from "./timeline/TimelineEntry";

type ProjectHoverPreviewProps = {
  item: TimelineItem;
  visible: boolean;
};

type PreviewType = "video" | "image" | "tip" | "fallback";

function getPreviewType(item: TimelineItem): PreviewType {
  if (item.previewVideo) return "video";
  if (item.previewImage ?? item.icon) return "image";
  if (item.previewTip) return "tip";
  return "fallback";
}

export function ProjectHoverPreview({ item, visible }: ProjectHoverPreviewProps) {
  const [canHover, setCanHover] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    setVideoLoaded(false);
  }, [item.id]);

  if (!canHover) return null;

  const previewType = getPreviewType(item);
  const imageSrc = item.previewImage ?? item.icon;

  const renderPreviewContent = () => {
    switch (previewType) {
      case "video":
        return (
          <>
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-neutral-600">
                <span className="text-slate-400 dark:text-neutral-500 text-sm">Loading...</span>
              </div>
            )}
            <video
              src={item.previewVideo}
              className={`h-full w-full object-cover ${!videoLoaded ? "opacity-0" : "opacity-100"}`}
              muted
              autoPlay
              loop
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
            />
          </>
        );
      case "image":
        return (
          <Image
            src={imageSrc!}
            alt={`${item.title} preview`}
            width={240}
            height={135}
            className="h-full w-full object-cover"
          />
        );
      case "tip":
        return (
          <div className="flex h-full w-full items-center justify-center p-4">
            <p className="line-clamp-4 text-sm text-slate-600 dark:text-neutral-300 text-center">
              {item.previewTip}
            </p>
          </div>
        );
      default:
        return (
          <div className="flex h-full w-full items-center justify-center text-slate-400 dark:text-neutral-500">
            {item.title}
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed left-1/2 top-1/2 z-50 hidden w-[min(240px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200/80 bg-white shadow-xl dark:border-neutral-600/80 dark:bg-neutral-800 sm:block"
          style={{ pointerEvents: "none" }}
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-slate-100 dark:bg-neutral-700">
            {renderPreviewContent()}
          </div>
          {item.description && (
            <div className="border-t border-slate-200/80 px-3 py-2 dark:border-neutral-600/80">
              <p className="line-clamp-2 text-xs text-slate-500 dark:text-neutral-400">
                {item.description}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
