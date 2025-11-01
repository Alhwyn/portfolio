"use client";

import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function VideoPlayer({ src, width, height, className = "" }: VideoPlayerProps) {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  return (
    <>
      {isVideoLoading && (
        <Skeleton className="w-[600px] h-[330px] rounded-lg bg-gray-300 dark:bg-neutral-700" />
      )}
      <motion.video
        src={src}
        width={width}
        height={height}
        className={`rounded-lg object-cover ${isVideoLoading ? "hidden" : "block"} ${className}`}
        autoPlay
        muted
        loop
        playsInline
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        onLoadedData={() => setIsVideoLoading(false)}
      />
    </>
  );
}
