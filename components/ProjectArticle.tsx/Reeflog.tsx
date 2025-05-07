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

          When I come back home to the Philippines (where I was born) I love to go scuba diving. 
          Especially I love tkaing ocean photography. So I built an app for a Swift Student Challenge<br/> (didnt win) to 
          log my scuba sessions and classify my photos using MAchine Image classification.
        </p>
      </div>
    </article>
  );
}