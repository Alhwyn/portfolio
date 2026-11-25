import {
  events,
  eventsPageDescription,
  type PortfolioEvent,
} from "@/lib/events";
import {
  mathWarsLine,
  personFacts,
  personLine,
  personName,
  personWorkSummary,
  publicProfiles,
  siteUrl,
} from "@/lib/profile";
import { PROJECTS } from "@/lib/projects";
import { workExperiences } from "@/lib/work";

function markdownLink(label: string, href: string) {
  return `[${label}](${href})`;
}

function eventWhen(event: PortfolioEvent) {
  switch (event.status) {
    case "upcoming":
      return `Hosting soon · ${event.dateLabel}`;
    case "hosted":
      return `Hosted · ${event.dateLabel}`;
    default: {
      const exhaustive: never = event.status;
      return exhaustive;
    }
  }
}

function joinSentences(parts: string[]) {
  return parts.reduce((combined, part) => {
    if (!combined) return part;
    const separator = /[.!?]$/.test(combined) ? " " : ". ";
    return `${combined}${separator}${part}`;
  }, "");
}

function projectSummary(
  slug: string,
  blurb?: string,
  stack?: string,
  description?: string,
) {
  if (slug === "math-wars") return mathWarsLine;
  const parts = [blurb, stack].filter((part): part is string => Boolean(part));
  if (parts.length > 0) return joinSentences(parts);
  return description ?? "";
}

export function buildLlmsTxt() {
  const lines: string[] = [
    `# ${personName}`,
    "",
    `> ${personLine}`,
    "",
    personWorkSummary,
    "",
    ...personFacts.slice(1).map((fact) => `- ${fact}`),
    "",
    "## Work",
    "",
  ];

  for (const item of workExperiences) {
    const label = item.role ? `${item.company} ${item.role}` : item.company;
    lines.push(
      item.href
        ? `- ${markdownLink(label, item.href)}: ${item.dates}`
        : `- ${label}: ${item.dates}`,
    );
  }

  lines.push("", "## Projects", "");

  for (const project of PROJECTS) {
    const summary = projectSummary(
      project.slug,
      project.blurb,
      project.stack,
      project.description,
    );
    lines.push(
      project.url
        ? `- ${markdownLink(project.title, project.url)}: ${summary}`
        : `- ${project.title}: ${summary}`,
    );
  }

  lines.push(
    "",
    "## Events",
    "",
    `- ${markdownLink("Events I've hosted", `${siteUrl}/events`)}: ${eventsPageDescription}`,
  );

  for (const event of events) {
    const detail = event.description
      ? joinSentences([event.description, eventWhen(event)])
      : eventWhen(event);
    lines.push(`- ${event.title}: ${detail}`);
  }

  lines.push("", "## Contact", "", `- ${markdownLink("alhwyn.com", siteUrl)}`);

  for (const profile of publicProfiles) {
    lines.push(`- ${markdownLink(profile.label, profile.href)}`);
  }

  lines.push("");
  return lines.join("\n");
}
