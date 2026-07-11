import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alhwyn.com"),
  title: {
    default: "Alhwyn Geonzon",
    template: "%s | Alhwyn Geonzon",
  },
  description:
    "Portfolio showing my projects and hackathons. Mix of games, AI stuff, and random builds—mostly things I shipped for fun or events around Victoria. I host events and hackathons.",
  keywords: ["Alhwyn Geonzon", "Alhwyn"],
  authors: [{ name: "Alhwyn Geonzon" }],
  creator: "Alhwyn Geonzon",
  publisher: "Alhwyn Geonzon",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alhwyn.com",
    siteName: "Alhwyn Geonzon Portfolio",
    title: "Alhwyn Geonzon - Portfolio",
    description:
      "Portfolio showing my projects and hackathons. Mix of games, AI stuff, and random builds—mostly things I shipped for fun or events around Victoria. I host events and hackathons.",
    images: [
      {
        url: "/image/icon/photobob_icon.jpeg",
        width: 1200,
        height: 630,
        alt: "Alhwyn Geonzon Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alhwyn Geonzon - Portfolio",
    description:
      "Portfolio showing my projects and hackathons. Mix of games, AI stuff, and random builds—mostly things I shipped for fun or events around Victoria. I host events and hackathons.",
    site: "@alhwyn",
    creator: "@alhwyn",
    images: ["/image/icon/photobob_icon.jpeg"],
  },
  alternates: {
    canonical: "https://alhwyn.com",
  },
  category: "Technology",
  classification: "Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f4f4f2] text-neutral-900">
        <SiteHeader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
