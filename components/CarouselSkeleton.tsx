"use client";

import { Skeleton } from "./ui/skeleton";

interface CarouselSkeletonProps {
  className?: string;
}

export default function CarouselSkeleton({ className = "" }: CarouselSkeletonProps) {
  return (
    <Skeleton 
      className={`w-[700px] h-[385px] rounded-lg bg-gray-300 dark:bg-neutral-700 ${className}`} 
    />
  );
}

