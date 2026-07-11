import { streamText, convertToModelMessages, type UIMessage, tool, jsonSchema } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { getResume, getResumeFiles } from "@/lib/content";
import {
  getAllProjects,
  getProjectBySlug,
  HOME_PROJECT_SLUGS,
} from "@/lib/projects";

export const maxDuration = 30;

const VALID_PROJECT_SLUGS = [...HOME_PROJECT_SLUGS];

function getPageContext(pathname: string): string {
  if (pathname === "/events") {
    return `Current page context: Events cover flow — hosted events gallery (no article pages).`;
  }

  if (pathname === "/" || pathname === "") {
    return `Current page context: Portfolio home page (alhwyn.com)
This is Alhwyn Geonzon's portfolio with projects and events. Alhwyn works as a software developer based in Victoria, Canada.`;
  }

  return `Current page context: ${pathname || "Unknown page"}`;
}

type ReferencedItem = { type: "project"; slug: string };

function getReferencedContext(referencedItems: ReferencedItem[]): string {
  if (referencedItems.length === 0) return "";

  const sections = referencedItems
    .map(({ type, slug }) => {
      if (type !== "project") return null;
      const data = getProjectBySlug(slug);
      if (!data) return null;
      return `Project: "${data.title}" (slug: ${slug})
Year: ${data.year}
Tools: ${data.tools ?? "—"}
URL: ${data.url ?? "—"}
Description: ${data.description}`;
    })
    .filter(Boolean);

  if (sections.length === 0) return "";
  return `

Additional context - User is asking about these items they referenced with @:
${sections.join("\n\n---\n\n")}`;
}

function getProjectsContext(): string {
  const allProjects = getAllProjects();
  if (allProjects.length === 0) return "";
  const list = allProjects
    .map(
      (p) => `- ${p.title} (slug: ${p.slug})
  Year: ${p.year}
  Tools: ${p.tools ?? "—"}
  Description: ${p.description}`
    )
    .join("\n\n");
  return `

Projects list (use this when user asks to list projects, what projects you have, etc.):
${list}`;
}

export async function POST(req: Request) {
  const {
    messages,
    pathname = "/",
    referencedItems = [],
  }: {
    messages: UIMessage[];
    pathname?: string;
    referencedItems?: ReferencedItem[];
  } = await req.json();

  const pageContext = getPageContext(pathname);
  const referencedContext = getReferencedContext(referencedItems);
  const projectsContext = getProjectsContext();

  const systemPrompt = `You are Alhwyn. You're the AI on alhwyn.com - you're literally him. Answer like you're texting a friend. Blunt. Direct. No fluff.

Who you are:
- Victoria-based builder, into AI and fun projects
- Keeps things pretty chill, loves coffee shops
- Gets excited about shipping stuff that actually works
- Curious, always learning, mix of formal + self-taught
- Hackathons and local scene got you into tech
- Loves cafes, travel, exploring
- Ambivert, goes with the flow
- Favorite projects: games and fun stuff. Dream: hardware

Tone - BLUNT SMS STYLE:
- Text message energy. Short. Punchy. Say it and stop.
- One sentence when one sentence works. Two max for simple stuff.
- lowercase by default
- No filler words, no "great question!", no corporate speak
- Direct answers. If you don't know, say you don't know.
- Slightly witty when it fits, never forced
- Match their vibe - if they're casual, you're casual
- No emoji spam, no excessive punctuation
- Technical but accessible
- Never apologize excessively or kiss ass

You're texting back. Helpful, real, no bullshit. Like a competent friend who doesn't waste your time.

Playfully critical (only when it fits - not on straight portfolio questions):
- Honest roasts, good humor
- Ironic contradictions, amusing patterns
- Light exaggerated comparisons
- Undercurrent of fondness - roasts between friends
- Never actually mean

Never: emojis, buzzwords, sycophantic tone, long paragraphs, corny greetings. "who is alhwyn" = one sentence. That's it.

${pageContext}${referencedContext}${projectsContext}`;

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    tools: {
      fetch_resume: tool({
        description: "Fetch the user's resume content and PDF files. Use when user asks to show, view, or see their resume.",
        inputSchema: jsonSchema({
          type: "object",
          properties: {},
          required: [],
        }),
        execute: async () => {
          const resume = getResume();
          const files = getResumeFiles();
          if (!resume) {
            return { error: "Resume not found", openResumeModal: false };
          }
          return {
            content: resume.content,
            frontmatter: resume.frontmatter,
            files,
            openResumeModal: true,
          };
        },
      }),
      fetch_project: tool({
        description: "Fetch a single project by slug with its full description. Use when user asks about a specific project (e.g. Photobomb, CanLII MCP).",
        inputSchema: z.object({
          slug: z.string().describe("Project slug, e.g. photobomb, canlii-mcp"),
        }),
        execute: async ({ slug }) => {
          const normalizedSlug = slug.toLowerCase().replace(/\s+/g, "-");
          if (!(VALID_PROJECT_SLUGS as readonly string[]).includes(normalizedSlug)) {
            return {
              error: `Project "${slug}" not found. Valid slugs: ${VALID_PROJECT_SLUGS.join(", ")}`,
            };
          }
          const data = getProjectBySlug(normalizedSlug);
          if (!data) return { error: "Project not found" };
          return {
            slug: data.slug,
            title: data.title,
            year: data.year,
            tools: data.tools,
            description: data.description,
            url: data.url,
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
