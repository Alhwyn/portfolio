import Link from "next/link";

const navLinkClass =
  "font-normal text-[15px] leading-snug text-neutral-900 hover:opacity-60 transition-opacity";

const nameClass =
  "font-normal text-[15px] leading-snug text-neutral-900 hover:opacity-60 transition-opacity";

const externalLinkClass = `${navLinkClass} inline-block`;

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
          <Link href="/#work" className={navLinkClass}>
            Work
          </Link>
          <a
            href="https://github.com/alhwyn"
            target="_blank"
            rel="noopener noreferrer"
            className={externalLinkClass}
          >
            Github
          </a>
        </div>

        <div className="flex flex-col gap-1 sm:items-end">
          <a
            href="https://www.linkedin.com/in/alhwyn"
            target="_blank"
            rel="noopener noreferrer"
            className={externalLinkClass}
          >
            Linkedin
          </a>
          <a
            href="https://x.com/alhwynn"
            target="_blank"
            rel="noopener noreferrer"
            className={externalLinkClass}
          >
            X
          </a>
        </div>
      </div>
    </header>
  );
}
