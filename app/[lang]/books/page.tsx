import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocaleShell from "@/components/LocaleShell";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";
import { ryanBooks } from "@/content/books";
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
import styles from "@/app/books/page.module.css";

const SECTION = "/books";

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
  const c = subpagesContent[lang as Locale].books;
  const url = `${siteUrl}${localizedPath(lang as Locale, SECTION)}`;
  const ogLocale = localeTags[lang as Locale];

  return {
    title: { absolute: `${c.title} — Elian Voigt / FORMÆTRIX` },
    description: c.intro,
    alternates: {
      canonical: url,
      languages: subpageLanguageAlternates(SECTION),
      types: { "application/rss+xml": `${siteUrl}/feed.xml` },
    },
    openGraph: {
      title: `${c.title} — Elian Voigt`,
      description: c.intro,
      url,
      siteName: "Ryan J. Pyles",
      ...(ogLocale ? { locale: ogLocale } : {}),
      type: "website",
      images: [{ url: "/og/ryan-default.jpg", width: 1200, height: 630, alt: "Elian Voigt" }],
    },
    robots: { index: true, follow: true },
  };
}

export default function LocalizedBooks({ params }: Params) {
  const { lang } = params;
  if (!isLocale(lang) || lang === defaultLocale) notFound();
  const c = subpagesContent[lang as Locale].books;

  return (
    <LocaleShell lang={lang as Locale}>
      <Section>
        <PageHeader kicker={c.kicker} title={c.title} intro={c.intro} />
        <div className={styles.list}>
          {ryanBooks.map((book) => (
            <BookCard
              key={book.slug}
              book={book}
              byLabel={c.byLabel}
              buyLabel={c.viewLabel}
            />
          ))}
        </div>
      </Section>
    </LocaleShell>
  );
}
