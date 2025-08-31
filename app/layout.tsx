import type { Metadata } from "next";
import { Instrument_Serif, Geist_Mono } from "next/font/google";
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
  title: {
    default: "Alhwyn Geonzon - Full Stack Developer & AI Engineer",
    template: "%s | Alhwyn Geonzon"
  },
  description: "18-year-old full stack developer and AI engineer from Victoria, Canada. Building innovative mobile apps, AI-powered solutions, and web applications. Featured projects include PhotoBomb, CanLII MCP, ReefLog, and DockBot.",
  keywords: [
    "Alhwyn Geonzon",
    "Full Stack Developer",
    "AI Engineer", 
    "Mobile App Developer",
    "React Developer",
    "Next.js Developer",
    "SwiftUI Developer",
    "Machine Learning",
    "Victoria Canada",
    "Software Engineer",
    "Portfolio",
    "PhotoBomb",
    "CanLII MCP",
    "ReefLog",
    "DockBot",
    "Hackathon",
    "RAG",
    "Chatbot Development"
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
    title: "Alhwyn Geonzon - Full Stack Developer & AI Engineer",
    description: "18-year-old full stack developer and AI engineer from Victoria, Canada. Building innovative mobile apps, AI-powered solutions, and web applications.",
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
    site: "@alhwynn",
    creator: "@alhwynn",
    images: ["/image/icon/photobob_icon.jpeg"],
  },
  alternates: {
    canonical: "https://alhwyn.com",
  },
  category: "Technology",
  classification: "Portfolio Website",
  other: {
    "google-site-verification": "your-google-verification-code-here"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://alhwyn.com" />
        <meta name="geo.region" content="CA-BC" />
        <meta name="geo.placename" content="Victoria" />
        <meta name="geo.position" content="48.4284;-123.3656" />
        <meta name="ICBM" content="48.4284, -123.3656" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-neutral-900`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Alhwyn Geonzon",
              "url": "https://alhwyn.com",
              "sameAs": [
                "https://x.com/alhwynn",
                "https://github.com/Alhwyn",
                "https://www.linkedin.com/in/alhwyn"
              ],
              "jobTitle": "Full Stack Developer & AI Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Independent Developer"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Victoria",
                "addressRegion": "BC",
                "addressCountry": "CA"
              },
              "email": "alhwyn@alhwyn.com",
              "knowsAbout": [
                "Full Stack Development",
                "AI Engineering",
                "Mobile App Development",
                "React",
                "Next.js",
                "SwiftUI",
                "Machine Learning",
                "RAG Systems",
                "Chatbot Development"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
