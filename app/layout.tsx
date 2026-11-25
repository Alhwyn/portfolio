import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/SiteHeader";
import {
  personJsonLd,
  personName,
  personWorkSummary,
  siteUrl,
} from "@/lib/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: personName,
    template: `%s | ${personName}`,
  },
  description: personWorkSummary,
  keywords: [personName, "Alhwyn"],
  authors: [{ name: personName }],
  creator: personName,
  publisher: personName,
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
    url: siteUrl,
    siteName: `${personName} Portfolio`,
    title: `${personName} - Portfolio`,
    description: personWorkSummary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personName} - Portfolio`,
    description: personWorkSummary,
    site: "@alhwyn",
    creator: "@alhwyn",
  },
  alternates: {
    canonical: siteUrl,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SiteHeader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
