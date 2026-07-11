import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AIChatProvider } from "@/contexts/AIChatContext";
import { SiteHeader } from "@/components/SiteHeader";
import { AISidebarProvider } from "@/components/AISidebarProvider";
import { ContentWrapper } from "@/components/ContentWrapper";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

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
      <body
        className={`${sourceSerif.variable} ${sourceSerif.className} antialiased bg-[#f4f4f2] text-neutral-900`}
      >
        <AIChatProvider>
          <SiteHeader />
          <AISidebarProvider />
          <ContentWrapper>{children}</ContentWrapper>
        </AIChatProvider>
        <Analytics />
      </body>
    </html>
  );
}
