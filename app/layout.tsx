import type { Metadata } from "next";
import { Instrument_Serif, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL('https://alhwyn.com'),
  title: {
    default: "Alhwyn Geonzon",
    template: "%s | Alhwyn Geonzon"
  },
  description: "Alhwyn Geonzon - Portfolio",
  keywords: [
    "Alhwyn Geonzon",
    "Alhwyn",
  ],
  authors: [{ name: "Alhwyn Geonzon" }],
  creator: "Alhwyn Geonzon",
  publisher: "Alhwyn Geonzon",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alhwyn.com",
    siteName: "Alhwyn Geonzon Portfolio",
    title: "Alhwyn Geonzon - Portfolio",
    description: "Portfolio ",
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
    description: "Portfolio ",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-neutral-900`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
