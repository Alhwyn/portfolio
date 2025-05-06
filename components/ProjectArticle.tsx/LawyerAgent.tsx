

export default function LawyerAgent() {
  return (
    <article className="max-w-3xl mx-auto bg-slate-50 rounded-xl space-y-8">
      {/* Project image */}
      <div className="w-full flex justify-center mb-8">
        <video
          src="./video/lawyeragent-demo.mp4" 
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
        <div>BC Lawyer Agent – an AI-powered assistant for legal information and document drafting</div>

        <div className="font-semibold text-gray-500">Tools</div>
        <div>Gemini Pro, Python, FastAPI, LangChain, Vercel</div>
      </div>

      <div className="pt-6 pb-20">
        <p>

          AI Slop real one coming soon

          <br/>
          BC Lawyer Agent is an AI assistant designed to help users navigate legal information and generate draft legal documents. 
          Built using Gemini Pro for advanced language understanding and Python for backend logic, the agent can answer legal questions, summarize statutes, and assist with document creation. 
          The project leverages FastAPI and LangChain for robust API endpoints and prompt engineering, providing a seamless and secure user experience. 
          This project deepened my understanding of AI integration, prompt design, and the challenges of building trustworthy tools for sensitive domains like law.
        </p>
      </div>
    </article>
  );
}