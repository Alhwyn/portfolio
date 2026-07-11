import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

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
