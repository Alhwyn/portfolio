import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MediaConfig {
  type: 'video' | 'carousel';
  src?: string;
  images?: Array<{ src: string; alt: string; title?: string; type?: 'image' | 'video' }>;
  width?: number;
  height?: number;
  frame?: 'phone' | 'flat';
}

export interface SectionConfig {
  title: string;
  headingLevel: 'h2' | 'h3';
  type?: string;
  src: string;
  width: number;
  height: number;
  description: string;
}

export interface ProjectFrontmatter {
  title: string;
  year?: string;
  date?: string;
  project?: string;
  event?: string;
  tools?: string;
  role?: string;
  url?: string;
  stack?: string;
  media?: MediaConfig;
  sections?: SectionConfig[];
  lumaEventId?: string;
}

export interface ContentData {
  frontmatter: ProjectFrontmatter;
  content: string;
  slug: string;
}

/**
 * Get all content files from a specific subdirectory
 */
export function getContentSlugs(subdir: 'projects'): string[] {
  const directory = path.join(contentDirectory, subdir);
  
  if (!fs.existsSync(directory)) {
    return [];
  }
  
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

/**
 * Get content data for a specific slug
 */
export function getContentBySlug(
  slug: string,
  subdir: 'projects'
): ContentData | null {
  const directory = path.join(contentDirectory, subdir);
  
  // Try .mdx first, then .md
  let filePath = path.join(directory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(directory, `${slug}.md`);
  }
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    frontmatter: data as ProjectFrontmatter,
    content: content.trim(),
    slug,
  };
}

/**
 * Get all content from a subdirectory
 */
export function getAllContent(subdir: 'projects'): ContentData[] {
  const slugs = getContentSlugs(subdir);
  return slugs
    .map((slug) => getContentBySlug(slug, subdir))
    .filter((data): data is ContentData => data !== null);
}

export interface ResumeData {
  content: string;
  frontmatter: Record<string, unknown>;
}

export interface ResumeFile {
  name: string;
  url: string;
}

/**
 * Get resume content from content/resume/resume.mdx
 */
export function getResume(): ResumeData | null {
  const filePath = path.join(contentDirectory, 'resume', 'resume.mdx');
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as Record<string, unknown>,
    content: content.trim(),
  };
}

/**
 * Get resume PDF files from content/resume/files.json
 */
export function getResumeFiles(): ResumeFile[] {
  const filePath = path.join(contentDirectory, 'resume', 'files.json');
  if (!fs.existsSync(filePath)) return [];

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw) as { files?: ResumeFile[] };
    return Array.isArray(parsed.files) ? parsed.files : [];
  } catch {
    return [];
  }
}
