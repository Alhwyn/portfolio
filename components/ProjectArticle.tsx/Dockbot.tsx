export default function Dockbot() {
  return (
    <article className="max-w-3xl mx-auto bg-slate-50 rounded-xl space-y-8">
      {/* Project video */}
      <div className="w-full flex justify-center mb-8">
        <video
          src="./video/dockbot_demo_1.mp4"
          width={600}
          height={340}
          className="rounded-lg object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Project info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-gray-800">
        <div className="font-semibold text-gray-500">Project</div>
        <div>DockBot – a Slack bot powered by Retrieval-Augmented Generation (RAG) for instant knowledge sharing</div>

        <div className="font-semibold text-gray-500">Tools</div>
        <div>Python, GCP, Railway</div>
      </div>

      <div className="pt-6 pb-20">
        <p className="leading-loose">
          My Programing Journey started when I Volunteering in a co-working space called
          <a
            href="https://thedockvictoria.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 underline hover:text-gray-500 ml-1"
          >
            theDock
          </a>.
          I used a Python script to process and split PDF documents (theDock Manual), extract their text using Google Document AI, 
          and then chunk and clean the text for embeddings. Each chunk is converted into a vector using Google Cloud’s 
          Vertex AI text embedding model. These vectors are stored in a DataFrame, which acts as a vector database. 
          When a user asks a question in Slack, the bot embeds the question, finds the most relevant document chunks 
          using dot product search, 
          and uses Gemini Pro to generate a helpful answer based on the retrieved augmented generation (RAG).

        </p>
      </div>
      <h2 className="font-semibold text-gray-500">Poll Command</h2>
      {/* Project video */}
      <div className="w-full flex justify-center mb-8">
        <video
          src="./video/dockbot_demo_2.mp4"
          width={600}
          height={340}
          className="rounded-lg object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="pt-6 pb-20">
        <p>
          A simple command to create a poll in Slack.
        </p>
      </div>
    </article>
  );
}