import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PhotoBomb() {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  return (
    <article className="max-w-3xl mx-auto bg-slate-100 rounded-xl space-y-8 dark:bg-neutral-900 dark:text-neutral-400">
      {/* Project image */}
      <div className="w-full flex justify-center mb-8">
        {isVideoLoading && (
          <Skeleton className="w-[600px] h-[330px] rounded-lg bg-gray-300 dark:bg-neutral-700 "  />
        )}
        <motion.video
          src="./video/photobomb.mp4"
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
        <div>Similar to cards against humanity its a party game app for sharing fun photos with friends</div>

        <div className="font-semibold text-gray-50 dark:text-neutral-400">Tools</div>
        <div>React Native, Expo, Supabase</div>
      </div>

      <div className="pt-6 pb-20">
        <p className="leading-loose">
          AI Slop real one coming soon

          <br/>
          PhotoBomb is a mobile party game that lets friends challenge each other to take themed photos in real time. 
          The app was inspired by classic party games and built to encourage creativity and laughter. 
          My main focus was on seamless user experience, fast photo uploads, and a fun, vibrant interface. 
          The project taught me a lot about mobile development, real-time data, and the importance of user feedback in shaping a product.
        </p>
      </div>
    </article>
  );
}