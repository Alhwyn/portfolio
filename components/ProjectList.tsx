import Link from "next/link";

export type ProjectListItem = {
  id: string;
  title: string;
  year: string;
};

type ProjectListProps = {
  projects: ProjectListItem[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="w-full max-w-[13.125rem]">
      <ul className="m-0 list-none border-t border-neutral-900/20 p-0">
        {projects.map((project) => (
          <li
            key={project.id}
            className="border-b border-neutral-900/20 text-xs leading-tight text-neutral-900"
          >
            <Link
              href={`/projects/${project.id}`}
              className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-1.5 text-inherit no-underline hover:opacity-60 transition-opacity"
            >
              <span className="tabular-nums text-neutral-900/55">{project.year}</span>
              <span className="min-w-0">{project.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
