import { workExperiences } from "@/lib/work";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function WorkExperienceList() {
  return (
    <div className="w-full max-w-[18rem]">
      <ul className="m-0 list-none border-t border-neutral-900/20 p-0">
        {workExperiences.map((item) => {
          const content = (
            <>
              <span className="min-w-0">
                {item.role ? `${item.company} ${item.role}` : item.company}
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
              key={`${item.company}-${item.role ?? "none"}-${item.dates}`}
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
