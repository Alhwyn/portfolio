export default function Reeflog() {
  return (
    <article className="max-w-3xl mx-auto bg-slate-50 rounded-xl space-y-8">
      {/* Project video */}
      <div className="w-full flex justify-center mb-8">
        <video
          src="./video/reeflog_demo_simple.mp4" 
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
        <div>A scuba diving log book classifying your scuba photos</div>

        <div className="font-semibold text-gray-500">Tools</div>
        <div>SwiftUI Machine Laarning</div>
      </div>

      <div className="pt-6 pb-20">
        <p className="leading-loose">

          ReefLog is a mobile app built with SwiftUI that allows scuba divers to easily log and visualize their dives. 
          The app features a clean, modern interface for recording dive locations, depths, times, and notes, as well as a map view to see all logged dives geographically. 
          Core Data is used for offline storage and fast retrieval, while MapKit powers the interactive dive map. 
          This project helped me deepen my understanding of SwiftUI, data persistence, and building user-friendly tools for niche communities. 
          ReefLog was inspired by my own diving experiences and the need for a simple, beautiful digital logbook.
        </p>
      </div>
    </article>
  );
}