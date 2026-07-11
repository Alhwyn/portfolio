import Link from "next/link";

/** System geometric sans — project `--font-sans` is Source Serif, so override here. */
const headerSans =
  "[font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]";

const navLinkClass =
  "font-normal text-[15px] leading-snug text-neutral-900 hover:opacity-60 transition-opacity";

const nameClass =
  "font-normal text-[15px] leading-snug text-neutral-900 hover:opacity-60 transition-opacity";

export function SiteHeader() {
  return (
    <header className={`px-6 sm:px-10 lg:px-16 pt-8 pb-6 ${headerSans}`}>
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className={nameClass}>
            Alhwyn Geonzon
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <a href="/#info" className={navLinkClass}>
            Info
          </a>
          <a href="/#work" className={navLinkClass}>
            Work
          </a>
        </div>

        <div>
          <a href="/#projects" className={navLinkClass}>
            Projects
          </a>
        </div>

        <div className="flex flex-col gap-1 sm:items-end">
          <span className={navLinkClass}>github.com/Alhwyn</span>
          <span className={navLinkClass}>linkedin.com/in/alhwyn</span>
          <span className={navLinkClass}>x.com/alhwyn</span>
        </div>
      </div>
    </header>
  );
}
