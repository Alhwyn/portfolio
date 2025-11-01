"use client";

import VideoSkeleton from "./VideoSkeleton";
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
      {isVideoLoading && <VideoSkeleton />}
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
