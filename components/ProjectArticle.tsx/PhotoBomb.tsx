

export default function PhotoBomb() {
  return (
    <article className="max-w-3xl mx-auto bg-slate-50 rounded-xl space-y-8">
      {/* Project image */}
      <div className="w-full flex justify-center mb-8">
        <video
            src="./video/photobomb.mp4" 
            width={1600}
            height={20}
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
        <div>Similar to cards against humanity its a party game app for sharing fun photos with friends</div>

        <div className="font-semibold text-gray-500">Tools</div>
        <div>React Native, Expo, Supabase</div>
      </div>

      <div className="pt-6 pb-20">
        <p>
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