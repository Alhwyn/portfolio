import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Dockbot() {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  return (
    <article className="max-w-3xl mx-auto bg-slate-100 dark:bg-neutral-900 dark:text-neutral-400 rounded-xl space-y-8">
      {/* Project video */}
      <div className="w-full flex justify-center mb-8">
        {isVideoLoading && (
          <Skeleton className="w-[600px] h-[330px] rounded-lg bg-gray-300 dark:bg-neutral-700 " />
        )}
        <motion.video
          src="./video/dockbot_demo_1.mp4"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-gray-800 dark:bg-neutral-900 dark:text-neutral-400">
        <div className="font-semibold text-gray-500 dark:text-neutral-400">Project</div>
        <div> AI chatbot in Slack</div>

        <div className="font-semibold text-gray-500 dark:text-neutral-400">Tools</div>
        <div>Python, GCP, Railway</div>
      </div>

      <div className="pt-6 pb-20 dark:bg-neutral-900 dark:text-neutral-400">
        <p className="leading-loose">
          My Programing Journey started when I Volunteering in a co-working space called
          <a
            href="https://thedockvictoria.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 underline font-semibold dark:text-neutral-400 hover:text-blue-500 ml-1"
          >
            theDock
          </a>.
          I used a Python script to process and split PDF documents (theDock Manual), extract their text using Google Document AI, 
          and then chunk and clean the text for embeddings. Each chunk is converted into a vector using Google Cloud’s 
          Vertex AI text embedding model. These vectors are stored in a pandas dataFrame, which acts as a vector database. 
          When a user asks a question in Slack, the bot embeds the question, finds the most relevant document chunks 
          using dot product search, 
          and uses Gemini Pro to generate a helpful answer based on the retrieved augmented generation (RAG).

        </p>
      </div>
      <h2 className="font-semibold text-gray-500 dark:text-neutral-400">Poll Command</h2>
      {/* Project video */}
      <div className="w-full flex justify-center mb-8">
        {isVideoLoading && (
          <Skeleton className="w-[600px] h-[330px] rounded-lg bg-gray-300" />
        )}
        <motion.video
          src="./video/dockbot_demo_2.mp4"
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

      <div className="pt-6 pb-20">
        <p>
          A simple command to create a poll in Slack.
        </p>
      </div>
      <h3 className="font-semibold text-gray-500 dark:text-neutral-400">Dockbot creating a poem about the organization</h3>
      <div className="w-full flex justify-center mb-8">
        {isVideoLoading && (
          <Skeleton className="w-[600px] h-[330px] rounded-lg bg-gray-300" />
        )}
        <motion.video
          src="./video/dockbot_demo_3.mp4"
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

      <div className="pt-6 pb-20">
        <p>
          Some fun prompt for Dockbot "create a poem about theDock." 
        </p>
      </div>
    </article>
  );
}