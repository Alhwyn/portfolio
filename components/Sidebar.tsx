"use client";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 hidden lg:flex flex-col p-8 border-r border-border bg-slate-50 dark:bg-neutral-900 z-40">
      <div>
        <h1 className="text-2xl instrument-serif-regular text-gray-700 dark:text-neutral-300">
          alhwyn
        </h1>
        <div className="mt-3 space-y-2 text-gray-700 dark:text-neutral-400 text-sm">
          <a href="https://x.com/alhwyn" target="_blank" rel="noopener noreferrer" className="block hover:underline">
            x.com/alhwyn
          </a>
          <a href="https://github.com/Alhwyn" target="_blank" rel="noopener noreferrer" className="block hover:underline">
            github.com/alhwyn
          </a>
          <a href="https://www.linkedin.com/in/alhwyn" target="_blank" rel="noopener noreferrer" className="block hover:underline">
            linkedin.com/alhwyn
          </a>
          <a href="mailto:alhwyn@alhwyn.com" className="block hover:underline">
            alhwyn@alhwyn.com
          </a>
        </div>
      </div>
    </aside>
  );
}
