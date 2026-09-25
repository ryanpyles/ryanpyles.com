import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocaleShell from "@/components/LocaleShell";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import EssaysSection from "@/components/EssaysSection";
import { showcaseProjects } from "@/content/projects/showcase";
import { subpagesContent } from "@/content/locales/subpages";
import {
  isLocale,
  defaultLocale,
  landingLocales,
  localeTags,
  localizedPath,
  subpageLanguageAlternates,
  siteUrl,
  type Locale,
} from "@/lib/i18n";

const SECTION = "/projects";

interface Params {
  params: { lang: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return landingLocales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: Params): Metadata {
  const { lang } = params;
  if (!isLocale(lang) || lang === defaultLocale) return {};
  const c = subpagesContent[lang as Locale].projects;
  const url = `${siteUrl}${localizedPath(lang as Locale, SECTION)}`;
  const ogLocale = localeTags[lang as Locale];

  return {
    title: { absolute: `${c.masthead.title} — Ryan Pyles` },
    description: c.masthead.intro,
    alternates: {
      canonical: url,
      languages: subpageLanguageAlternates(SECTION),
      types: { "application/rss+xml": `${siteUrl}/feed.xml` },
    },
    openGraph: {
      title: `${c.masthead.title} — Ryan Pyles`,
      description: c.masthead.intro,
      url,
      siteName: "Ryan J. Pyles",
      ...(ogLocale ? { locale: ogLocale } : {}),
      type: "website",
      images: [{ url: "/og/ryan-default.jpg", width: 1200, height: 630, alt: "Ryan Pyles" }],
    },
    robots: { index: true, follow: true },
  };
}

export default function LocalizedProjects({ params }: Params) {
  const { lang } = params;
  if (!isLocale(lang) || lang === defaultLocale) notFound();
  const c = subpagesContent[lang as Locale].projects;

  return (
    <LocaleShell lang={lang as Locale}>
      <ProjectsShowcase projects={showcaseProjects} masthead={c.masthead} />
      <EssaysSection
        kicker={c.essaysKicker}
        heading={c.essaysHeading}
        intro={c.essaysIntro}
      />
    </LocaleShell>
  );
}
