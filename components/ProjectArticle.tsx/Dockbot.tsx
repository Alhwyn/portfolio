export default function Dockbot() {
  return (
    <article className="max-w-3xl mx-auto bg-slate-50 rounded-xl space-y-8">
      {/* Project video */}
      <div className="w-full flex justify-center mb-8">
        <video
          src="./video/dockbot-demo.mp4"
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
        <div className="font-semibold text-gray-500">PROJECT</div>
        <div>DockBot – a Slack bot powered by Retrieval-Augmented Generation (RAG) for instant knowledge sharing</div>

        <div className="font-semibold text-gray-500">Tools</div>
        <div>Python, GCP, Railway</div>
      </div>

      <div className="pt-6 pb-20">
        <p>
          DockBot is a Slack bot designed to help teams quickly access and share knowledge using Retrieval-Augmented Generation (RAG). 
          Built with Python, it leverages Google Cloud Platform’s text embedding model to understand and retrieve relevant information from internal documentation and resources. 
          The bot integrates seamlessly with Slack, allowing users to ask questions and receive context-aware answers directly in their workspace. 
          Deployment and scaling are handled via Railway, making updates and maintenance fast and reliable. 
          This project deepened my experience with NLP, cloud AI services, and building production-ready bots for real-world team workflows.
        </p>
      </div>
    </article>
  );
}