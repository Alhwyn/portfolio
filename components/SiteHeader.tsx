import Link from "next/link";

const navLinkClass =
  "font-normal text-[15px] leading-snug text-neutral-900 hover:opacity-60 transition-opacity";

const nameClass =
  "font-normal text-[15px] leading-snug text-neutral-900 hover:opacity-60 transition-opacity";

const externalLinkClass = `${navLinkClass} inline-block`;

export function SiteHeader() {
  return (
    <header className="px-6 sm:px-10 lg:px-16 pt-8 pb-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-4 sm:gap-x-8 sm:gap-y-3">
          <Link href="/" className={nameClass}>
            alhwyn.com
          </Link>

          <nav
            aria-label="Site"
            className="flex flex-wrap gap-x-5 gap-y-2 sm:hidden"
          >
            <Link href="/events" className={navLinkClass}>
              Events
            </Link>
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
          </nav>

          <div className="hidden sm:flex sm:flex-col sm:gap-1">
            <Link href="/events" className={navLinkClass}>
              Events
            </Link>
          </div>

          <div className="hidden sm:flex sm:flex-col sm:gap-1">
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

          <div className="hidden sm:flex sm:flex-col sm:gap-1 sm:items-end">
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
      </div>
    </header>
  );
}
