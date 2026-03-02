import { getResume, getResumeFiles } from "@/lib/content";
import { NextResponse } from "next/server";

export async function GET() {
  const resume = getResume();
  const files = getResumeFiles();

  if (!resume) {
    return NextResponse.json(
      { error: "Resume not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    content: resume.content,
    frontmatter: resume.frontmatter,
    files,
  });
}
