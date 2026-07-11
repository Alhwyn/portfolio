import Link from "next/link";

const navLinkClass =
  "font-normal text-[15px] leading-snug text-neutral-900 hover:opacity-60 transition-opacity";

const nameClass =
  "font-normal text-[15px] leading-snug text-neutral-900 hover:opacity-60 transition-opacity";

export function SiteHeader() {
  return (
    <header className="px-6 sm:px-10 lg:px-16 pt-8 pb-6">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className={nameClass}>
            alhwyn.com
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <Link href="/events" className={navLinkClass}>
            Events
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <a href="/#work" className={navLinkClass}>
            Work
          </a>
          <span className={navLinkClass}>Github</span>
        </div>

        <div className="flex flex-col gap-1 sm:items-end">
          <span className={navLinkClass}>Linkedin</span>
          <span className={navLinkClass}>X</span>
        </div>
      </div>
    </header>
  );
}
