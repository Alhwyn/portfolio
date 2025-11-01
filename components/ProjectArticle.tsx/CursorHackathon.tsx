"use client";

import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CursorHackathon() {
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  return (
    <article className="max-w-3xl mx-auto bg-slate-100 dark:bg-neutral-900 dark:text-neutral-400 rounded-xl space-y-8">
      {/* Project image */}
      <div className="w-full flex justify-center mb-8">
        <div className="relative">
          {isImageLoading && (
            <Skeleton className="w-[700px] h-[385px] rounded-lg bg-gray-300 dark:bg-neutral-700" />
          )}
          <motion.div
            className={`${isImageLoading ? "hidden" : "block"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoading ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-[700px] h-[385px] overflow-hidden rounded-lg">
              <Image
                src="/image/icon/cursor.png"
                alt="Cursor Hackathon Victoria"
                width={700}
                height={385}
                className="w-full h-full object-cover"
                onLoad={() => setIsImageLoading(false)}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Project info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-gray-800 dark:bg-neutral-900 dark:text-neutral-400">
        <div className="font-semibold text-gray-500 dark:text-neutral-400">Event</div>
        <div>Cursor Hackathon</div>

        <div className="font-semibold text-gray-500 dark:text-neutral-400">Location</div>
        <div>Victoria, BC</div>

        <div className="font-semibold text-gray-500 dark:text-neutral-400">Date</div>
        <div>September 2025</div>
      </div>

      <div className="pt-6 pb-32 dark:bg-neutral-900 dark:text-neutral-400">
        <p className="leading-loose">
          Participating in the Cursor Hackathon Victoria - an exciting opportunity to explore AI-powered development 
          and build innovative solutions using Cursor's cutting-edge tools.
        </p>
        <br />
        <p className="leading-loose">
          This hackathon focuses on leveraging AI to enhance the development process, creating more efficient 
          workflows, and pushing the boundaries of what's possible when human creativity meets artificial intelligence.
        </p>
        <br />
        <p className="leading-loose">
          Stay tuned for updates on the projects and innovations that emerge from this event!
        </p>
      </div>
    </article>
  );
}