export type PortfolioEvent = {
  id: string;
  title: string;
  /** Short one-line blurb under the cover caption */
  description?: string;
  image?: string;
  /** Solid cover when no image — muted, intentional palette */
  coverColor: string;
  coverTextColor?: string;
  /** ISO date (YYYY-MM-DD) for sorting / tooling */
  date: string;
  /** Short display label, e.g. "Mar 2025" or "Aug 22, 2026" */
  dateLabel: string;
  status: "hosted" | "upcoming";
};

export const events: PortfolioEvent[] = [
  {
    id: "cursor-codechella-hackathon",
    title: "Cursor Codechella Hackathon",
    description: "Cursor hackathon in Victoria with partners & builders",
    image: "/image/events/cursor-codechella.png",
    coverColor: "#F2F2EE",
    coverTextColor: "#1c1814",
    date: "2026-08-22",
    dateLabel: "Aug 22, 2026",
    status: "upcoming",
  },
  {
    id: "planetscale-boards-game-night",
    title: "Planetscale Boards Game Night",
    description:
      "Board games night with the PlanetScale crew. Victoria carried me and only brought mahjong.",
    image: "/image/events/planetscale-game-night.png",
    coverColor: "#0a0a0a",
    coverTextColor: "#c8f542",
    date: "2026-06-22",
    dateLabel: "Jun 22, 2026",
    status: "hosted",
  },
  {
    id: "cursor-cafe",
    title: "Cursor Cafe",
    description: "Casual Cursor hangout and cafe meetup in Victoria",
    image: "/image/events/cursor-cafe.png",
    coverColor: "#3d2c24",
    coverTextColor: "#f0e6dc",
    date: "2025-12-13",
    dateLabel: "Dec 13, 2025",
    status: "hosted",
  },
  {
    id: "cursor-victoria-hackathon",
    title: "Cursor Victoria Hackathon",
    description: "Local Cursor hackathon bringing Victoria builders together",
    image: "/image/events/cursor-victoria.png",
    coverColor: "#111111",
    coverTextColor: "#f4f4f2",
    date: "2025-09-26",
    dateLabel: "Sep 26, 2025",
    status: "hosted",
  },
  {
    id: "scrapyard-victoria",
    title: "Scrapyard Victoria",
    description: "Hardware scrapyard hackathon with Hack Club Victoria",
    image: "/image/scrapyardvictoria.png",
    coverColor: "#327e79",
    coverTextColor: "#f4f4f2",
    date: "2025-03-16",
    dateLabel: "Mar 16, 2025",
    status: "hosted",
  },
];
