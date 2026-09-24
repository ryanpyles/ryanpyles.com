import type { MetadataRoute } from "next";
import { articles } from "@/content/writing";
import { fieldNotes } from "@/content/fieldNotes";
import { projectCases } from "@/content/projectCases";
import { embeddedApps } from "@/content/embeddedApps";
import { ryanBooks } from "@/content/books";
import { landingLocales, landingLanguageAlternates, hreflangTag } from "@/lib/i18n";

const BASE = "https://ryanpyles.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const alternates = { languages: landingLanguageAlternates() };

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1, alternates },
    { url: `${BASE}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/books`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/notes`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/voigt-project`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/press`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  // Per-locale landing pages (English canonical lives at "/"). Only locales
  // with a valid hreflang carry the alternates cluster; Scandimix is a plain
  // entry (it is an experimental locale, not a standard language).
  const localeRoutes: MetadataRoute.Sitemap = landingLocales.map((lang) => ({
    url: `${BASE}/${lang}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
    ...(hreflangTag[lang] ? { alternates } : {}),
  }));

  const writingRoutes: MetadataRoute.Sitemap = articles
    .filter((a) => a.status === "published")
    .map((a) => ({
      url: `${BASE}/writing/${a.slug}`,
      lastModified: new Date(`${a.updated ?? a.date}T00:00:00`),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const projectRoutes: MetadataRoute.Sitemap = [
    ...projectCases.map((c) => c.slug),
    ...embeddedApps.map((a) => a.slug),
  ].map((slug) => ({
    url: `${BASE}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const bookRoutes: MetadataRoute.Sitemap = ryanBooks.map((b) => ({
    url: `${BASE}/books/${b.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const noteRoutes: MetadataRoute.Sitemap = fieldNotes.map((n) => ({
    url: `${BASE}/notes/${n.slug}`,
    lastModified: new Date(`${n.date}T00:00:00`),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...localeRoutes,
    ...writingRoutes,
    ...projectRoutes,
    ...bookRoutes,
    ...noteRoutes,
  ];
}
