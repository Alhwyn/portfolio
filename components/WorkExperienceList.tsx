type Experience = {
  company: string;
  role: string;
  dates: string;
  href?: string;
};

/** Reverse-chronological (newest first). */
const experiences: Experience[] = [
  {
    company: "GMI Cloud",
    role: "Ambassador",
    dates: "Present",
    href: "https://www.gmicloud.ai",
  },
  {
    company: "Cursor",
    role: "Ambassador",
    dates: "Present",
    href: "https://cursor.com",
  },
  {
    company: "Gist",
    role: "Jr SDE",
    dates: "2026",
    href: "https://gist-apps.com",
  },
  {
    company: "Folly Partners",
    role: "Intern",
    dates: "2025",
    href: "https://follypartners.com",
  },
];

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function WorkExperienceList() {
  return (
    <div className="w-full max-w-[18rem]">
      <ul className="m-0 list-none border-t border-neutral-900/20 p-0">
        {experiences.map((item) => {
          const content = (
            <>
              <span className="min-w-0">
                {item.company} {item.role}
              </span>
              <span className="ml-auto shrink-0 pl-3 tabular-nums text-neutral-900/55">
                {item.dates}
              </span>
            </>
          );

          const rowClass =
            "flex items-center gap-2 py-1.5 text-inherit no-underline hover:opacity-60 transition-opacity";

          return (
            <li
              key={`${item.company}-${item.role}-${item.dates}`}
              className="border-b border-neutral-900/20 text-xs leading-tight text-neutral-900"
            >
              {item.href ? (
                <a
                  href={item.href}
                  {...(isExternalHref(item.href)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={rowClass}
                >
                  {content}
                </a>
              ) : (
                <div className={rowClass}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
