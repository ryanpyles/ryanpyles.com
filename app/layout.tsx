import React from "react";
import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/LanguageContext";
import { buildPersonJsonLd } from "@/lib/metadata";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ryanpyles.com"),
  title: {
    default: "Ryan Pyles — Software Engineer & AI Systems Architect",
    template: "%s | Ryan Pyles",
  },
  description:
    "Ryan Pyles is a software engineer and AI systems architect in Chicago building AI, publishing, and multilingual web systems with React, Next.js, and TypeScript. He runs the FORMÆTRIX studio and writes fiction as Elian Voigt.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400;500;600&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Sitewide Person entity — one canonical identity graph on every page. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildPersonJsonLd() }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
