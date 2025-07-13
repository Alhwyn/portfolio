import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LawyerAgent() {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  return (
    <article className="max-w-3xl mx-auto bg-slate-100 rounded-xl space-y-8 dark:bg-neutral-900 dark:text-neutral-400">
      {/* Project image */}
      <div className="w-full flex justify-center mb-8">
        {isVideoLoading && (
          <Skeleton className="w-[600px] h-[330px] rounded-lg bg-gray-300 dark:bg-neutral-700 "  />
        )}
        <motion.video
          src="./video/law_demo.mp4"
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
        <div>A Model Context Protocol (MCP) server for Canadian legal research using the CanLii database</div>

        <div className="font-semibold text-gray-50 dark:text-neutral-400">Tools</div>
        <div>TypeScript, Cloudflare Workers, CanLii API, MCP Protocol</div>
      </div>

      <div className="pt-6 pb-20">
        <p className="leading-loose">
          This project is a Model Context Protocol (MCP) server built specifically for Canadian legal research. 
          It integrates with the CanLii database to provide AI assistants with access to Canadian case law, 
          statutes, and legal resources. Built with TypeScript and deployed on Cloudflare Workers for fast, 
          global access, the MCP server enables seamless legal research capabilities for AI applications. 
          The project demonstrates how to build robust API integrations with legal databases while maintaining 
          performance and reliability at scale.
        </p>
      </div>
    </article>
  );
}