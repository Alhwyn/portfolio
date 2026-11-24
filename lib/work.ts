export type WorkExperience = {
  company: string;
  role?: string;
  dates: string;
  href?: string;
};

/** Reverse-chronological (newest first). */
export const workExperiences: WorkExperience[] = [
  {
    company: "FlipLabs",
    role: "SWE intern",
    dates: "2026",
    href: "https://www.fliplabs.co",
  },
  {
    company: "Bot Ambassador for SpaceXSI",
    dates: "2026",
    href: "https://luma.com/spacexsi-community",
  },
  {
    company: "GMI Cloud",
    role: "Ambassador",
    dates: "2026",
    href: "https://www.gmicloud.ai",
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
