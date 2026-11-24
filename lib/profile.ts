export const siteUrl = "https://alhwyn.com";

export const personName = "Alhwyn Geonzon";

export const personLine = "I'm 19. I like building software and doing events.";

export const personWorkSummary =
  "Portfolio showing my projects and hackathons. Mix of games, AI stuff, and random builds—mostly things I shipped for fun or events around Victoria. I host events and hackathons.";

export const mathWarsLine =
  "Grew a game to 110,000+ users with 18M views in a month (Math Wars).";

export const personFacts = [
  personLine,
  "I've hosted a SpaceXSI event.",
  mathWarsLine,
  "Currently finding an exoplanet and making a game with a friend.",
  "I'm based in Victoria, BC on Vancouver Island, Canada.",
] as const;

export const publicProfiles = [
  { label: "Github", href: "https://github.com/alhwyn" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/alhwyn" },
  { label: "X", href: "https://x.com/alhwyn" },
] as const;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personName,
  url: siteUrl,
  sameAs: publicProfiles.map((profile) => profile.href),
};
