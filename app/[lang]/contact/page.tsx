import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LocaleShell from "@/components/LocaleShell";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import InquiryForm from "@/components/InquiryForm";
import { subpagesContent } from "@/content/locales/subpages";
import {
  isLocale,
  defaultLocale,
  landingLocales,
  localeTags,
  localizedPath,
  localizedHref,
  subpageLanguageAlternates,
  siteUrl,
  type Locale,
} from "@/lib/i18n";
import styles from "@/app/contact/page.module.css";

const SECTION = "/contact";

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
  const c = subpagesContent[lang as Locale].contact;
  const url = `${siteUrl}${localizedPath(lang as Locale, SECTION)}`;
  const ogLocale = localeTags[lang as Locale];

  return {
    title: { absolute: `${c.title} — Ryan Pyles / FORMÆTRIX` },
    description: c.intro,
    alternates: {
      canonical: url,
      languages: subpageLanguageAlternates(SECTION),
      types: { "application/rss+xml": `${siteUrl}/feed.xml` },
    },
    openGraph: {
      title: `${c.title} — FORMÆTRIX`,
      description: c.intro,
      url,
      siteName: "Ryan J. Pyles",
      ...(ogLocale ? { locale: ogLocale } : {}),
      type: "website",
      images: [{ url: "/og/ryan-default.jpg", width: 1200, height: 630, alt: "FORMÆTRIX" }],
    },
    robots: { index: true, follow: true },
  };
}

/** Splits a "{link}" template into before/after around an anchor. */
function around(template: string): [string, string] {
  const [before, after = ""] = template.split("{link}");
  return [before, after];
}

export default function LocalizedContact({ params }: Params) {
  const { lang } = params;
  if (!isLocale(lang) || lang === defaultLocale) notFound();
  const loc = lang as Locale;
  const c = subpagesContent[loc].contact;
  const [howBefore, howAfter] = around(c.howText);
  const [noteBefore, noteAfter] = around(c.note);

  return (
    <LocaleShell lang={loc}>
      <Section narrow>
        <PageHeader kicker={c.kicker} title={c.title} intro={c.intro} />

        <div className={styles.accepting}>
          <p className={styles.acceptingLabel}>
            <span className={styles.acceptingDot} aria-hidden="true" />
            {c.acceptingLabel}
          </p>
          <ul className={styles.acceptingList}>
            {c.acceptingList.map((item) => (
              <li key={item} className={styles.acceptingItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.formLabel}>{c.formLabel}</h2>
          <InquiryForm labels={c.form} />
        </div>

        <div className={styles.options}>
          <div className={styles.option}>
            <h2 className={styles.optionLabel}>{c.preferEmailLabel}</h2>
            <a href="mailto:me@ryanpyles.com" className={styles.optionLink}>
              me@ryanpyles.com
            </a>
          </div>

          <div className={styles.option}>
            <h2 className={styles.optionLabel}>{c.howLabel}</h2>
            <p className={styles.optionText}>
              {howBefore}
              <Link href={localizedHref(loc, "/work")} className={styles.noteLink}>
                {c.howLinkLabel}
              </Link>
              {howAfter}
            </p>
          </div>

          <div className={styles.fitGrid}>
            <div className={styles.option}>
              <h2 className={styles.optionLabel}>{c.goodFitLabel}</h2>
              <ul className={styles.fitList}>
                {c.goodFit.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className={styles.option}>
              <h2 className={styles.optionLabel}>{c.notFitLabel}</h2>
              <ul className={styles.fitList}>
                {c.notFit.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className={styles.note}>
          {noteBefore}
          <Link href="/press" className={styles.noteLink}>
            {c.pressLinkLabel}
          </Link>
          {noteAfter}
        </p>
      </Section>
    </LocaleShell>
  );
}
