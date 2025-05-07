import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Reeflog() {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  return (
    <article className="max-w-3xl mx-auto bg-slate-100 rounded-xl space-y-8 dark:bg-neutral-900 dark:text-neutral-400">
      {/* Project video */}
      <div className="w-full flex justify-center mb-8">
        {isVideoLoading && (
          <Skeleton className="w-[600px] h-[330px] rounded-lg bg-gray-300 dark:bg-neutral-700" />
        )}
        <motion.video
          src="./video/reeflog_demo_simple.mp4"
          width={600}
          height={340}
          className={`rounded-lg object-cover ${isVideoLoading ? "hidden" : "block"}`}
          autoPlay
          muted
          loop
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoLoading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          onLoadedData={() => setIsVideoLoading(false)}
        />
      </div>

      {/* Project info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-gray-800 dark:text-neutral-400">
        <div className="font-semibold text-gray-500 dark:text-neutral-400">Project</div>
        <div>A scuba diving log book classifying your scuba photos</div>

        <div className="font-semibold text-gray-500 dark:text-neutral-400">Tools</div>
        <div>SwiftUI Machine Laarning</div>
      </div>

      <div className="pt-6 pb-20">
        <p className="leading-loose">

          When I come back home to the Philippines (where I was born) I love to go scuba diving. 
          Especially I love taking ocean photography. So I built an app for a Swift Student Challenge<br/> (didnt win) to 
          log my scuba sessions and classify my photos using MAchine Image classification.
        </p>
      </div>
    </article>
  );
}