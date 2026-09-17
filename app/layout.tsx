import React from "react";
import { fontVariables } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/LanguageContext";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ryanpyles.com"),
  title: {
    default: "Ryan J. Pyles — Author & Developer",
    template: "%s | Ryan J. Pyles",
  },
  description:
    "Ryan J. Pyles — author of experimental fiction, web developer, and brand designer based in Chicago. Writing that holds up under scrutiny.",
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
    <html lang="en" className={fontVariables}>

      <body>
        <LanguageProvider>{children}</LanguageProvider>
        {/* Cookieless, no consent banner required. Both are no-ops off Vercel. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
