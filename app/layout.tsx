import type { Metadata } from "next";
import { Instrument_Serif, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AIChatProvider } from "@/contexts/AIChatContext";
import { Sidebar } from "@/components/Sidebar";
import { AISidebarProvider } from "@/components/AISidebarProvider";
import { ContentWrapper } from "@/components/ContentWrapper";
import { JsonLd } from "@/components/JsonLd";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Instrument_Serif({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Alhwyn Geonzon",
    "Alhwyn",
    "software developer",
    "Victoria BC",
    "hackathon organizer",
    "portfolio",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
    url: SITE_URL,
    siteName: `${SITE_NAME} Portfolio`,
    title: `${SITE_NAME} - Portfolio`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: DEFAULT_OG_IMAGE_WIDTH,
        height: DEFAULT_OG_IMAGE_HEIGHT,
        alt: `${SITE_NAME} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Portfolio`,
    description: DEFAULT_DESCRIPTION,
    site: "@alhwyn",
    creator: "@alhwyn",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-neutral-900`}
      >
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
        <AIChatProvider>
          <Sidebar />
          <AISidebarProvider />
          <ContentWrapper>{children}</ContentWrapper>
        </AIChatProvider>
        <Analytics />
      </body>
    </html>
  );
}
