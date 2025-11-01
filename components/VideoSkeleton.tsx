"use client";

import { Skeleton } from "./ui/skeleton";

interface VideoSkeletonProps {
  className?: string;
}

export default function VideoSkeleton({ className = "" }: VideoSkeletonProps) {
  return (
    <Skeleton 
      className={`w-[600px] h-[330px] rounded-lg bg-gray-300 dark:bg-neutral-700 ${className}`} 
    />
  );
}

