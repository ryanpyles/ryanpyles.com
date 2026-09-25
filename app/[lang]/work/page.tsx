import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LocaleShell from "@/components/LocaleShell";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import ProcessTrack from "@/components/ProcessTrack";
import Reveal from "@/components/Reveal";
import { subpagesContent, workProofLinks } from "@/content/locales/subpages";
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
import styles from "@/app/work/page.module.css";

const SECTION = "/work";

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
  const c = subpagesContent[lang as Locale].work;
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

export default function LocalizedWork({ params }: Params) {
  const { lang } = params;
  if (!isLocale(lang) || lang === defaultLocale) notFound();
  const loc = lang as Locale;
  const c = subpagesContent[loc].work;
  const contactHref = localizedHref(loc, "/contact");
  const projectsHref = localizedHref(loc, "/projects");

  return (
    <LocaleShell lang={loc}>
      <Section>
        <PageHeader kicker={c.kicker} title={c.title} intro={c.intro} />

        <div className={styles.heroLede}>
          <Reveal>
            <p className={styles.intro}>{c.lede}</p>
          </Reveal>
          <Reveal delay={80}>
            <div className={styles.heroCtas}>
              <Link href={contactHref} className={styles.ctaPrimary}>
                {c.ctaPrimary}
              </Link>
              <Link href={projectsHref} className={styles.ctaSecondary}>
                {c.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ── Services ─────────────────────────────────────────────── */}
        <section className={styles.block} aria-label={c.servicesLabel}>
          <Reveal>
            <p className={styles.blockLabel}>{c.servicesLabel}</p>
          </Reveal>
          <div className={styles.services}>
            {c.services.map((s, i) => (
              <Reveal key={s.name} delay={i * 80}>
                <article className={styles.service}>
                  <h2 className={styles.serviceName}>{s.name}</h2>
                  <p className={styles.serviceBody}>{s.body}</p>
                  <Link href={workProofLinks[i].href} className={styles.serviceProof}>
                    {c.proofPrefix} {workProofLinks[i].label} →
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Engagements ──────────────────────────────────────────── */}
        <section className={styles.block} aria-label={c.engagementsLabel}>
          <Reveal>
            <p className={styles.blockLabel}>{c.engagementsLabel}</p>
          </Reveal>
          <div className={styles.engagements}>
            {c.engagements.map((e, i) => (
              <Reveal key={e.name} delay={i * 80}>
                <div className={styles.engagement}>
                  <span className={styles.engagementNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.engagementName}>{e.name}</h3>
                  <p className={styles.engagementBody}>{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────────── */}
        <section className={styles.block} aria-label={c.processLabel}>
          <Reveal>
            <p className={styles.blockLabel}>{c.processLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <ProcessTrack steps={c.process} />
          </Reveal>
        </section>

        {/* ── Outcomes + CTA ───────────────────────────────────────── */}
        <section className={styles.block} aria-label={c.outcomesLabel}>
          <Reveal>
            <p className={styles.blockLabel}>{c.outcomesLabel}</p>
          </Reveal>
          <ul className={styles.outcomes}>
            {c.outcomes.map((o, i) => (
              <Reveal key={o} delay={i * 70}>
                <li className={styles.outcome}>
                  <span className={styles.outcomeMark} aria-hidden="true" />
                  {o}
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        <Reveal>
          <div className={styles.finalCta}>
            <p className={styles.finalCtaText}>{c.finalCtaText}</p>
            <div className={styles.finalCtaLinks}>
              <Link href={contactHref} className={styles.ctaPrimary}>
                {c.finalCtaPrimary}
              </Link>
              <a href="mailto:me@ryanpyles.com" className={styles.ctaSecondary}>
                me@ryanpyles.com
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </LocaleShell>
  );
}
