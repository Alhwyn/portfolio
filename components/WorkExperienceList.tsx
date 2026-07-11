type Experience = {
  year: string;
  role: string;
  company?: string;
  href?: string;
};

/** Reverse-chronological by end / event date (newest first). */
const experiences: Experience[] = [
  {
    year: "2026",
    role: "Ambassador",
    company: "GMI Cloud",
    href: "https://www.gmicloud.ai",
  },
  {
    year: "2026",
    role: "Jr SDE",
    company: "Gist",
    href: "https://gist-apps.com",
  },
  {
    year: "2025",
    role: "Ambassador",
    company: "Cursor",
    href: "https://cursor.com",
  },
  {
    year: "2025",
    role: "Intern",
    company: "Folly Partners",
    href: "https://follypartners.com",
  },
];

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function WorkExperienceList() {
  return (
    <div className="w-full max-w-[13.125rem]">
      <ul className="m-0 list-none border-t border-neutral-900/20 p-0">
        {experiences.map((item) => {
          const content = (
            <>
              <span className="tabular-nums">{item.year}</span>
              <span className="min-w-0">
                {item.role}
                {item.company ? (
                  <span className="text-neutral-900/55"> {item.company}</span>
                ) : null}
              </span>
            </>
          );

          return (
            <li
              key={`${item.year}-${item.role}-${item.company ?? ""}`}
              className="border-b border-neutral-900/20 text-xs leading-tight text-neutral-900"
            >
              {item.href ? (
                <a
                  href={item.href}
                  {...(isExternalHref(item.href)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-1.5 text-inherit no-underline hover:opacity-60 transition-opacity"
                >
                  {content}
                </a>
              ) : (
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-1.5">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
