import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBackground from "@/components/PageBackground";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import HtmlLang from "@/components/HtmlLang";
import {
  isLocale,
  defaultLocale,
  landingLocales,
  localeTags,
  landingPath,
  landingLanguageAlternates,
  siteUrl,
  type Locale,
} from "@/lib/i18n";
import { landingContent } from "@/content/locales/landing";
import styles from "./page.module.css";

interface Params {
  params: { lang: string };
}

// Only the known landing locales are valid; any other top-level segment 404s
// (so /about etc. still resolve, and /nonsense returns a real 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return landingLocales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: Params): Metadata {
  const { lang } = params;
  if (!isLocale(lang) || lang === defaultLocale) return {};
  const c = landingContent[lang as Locale];
  const url = `${siteUrl}${landingPath(lang as Locale)}`;

  return {
    title: { absolute: `Ryan Pyles — ${c.descriptor.split(" · ")[0]}` },
    description: c.hero.statement,
    alternates: {
      canonical: url,
      languages: landingLanguageAlternates(),
    },
    openGraph: {
      title: "Ryan Pyles",
      description: c.hero.statement,
      url,
      siteName: "Ryan J. Pyles",
      locale: localeTags[lang as Locale],
      type: "website",
      images: [{ url: "/og/ryan-default.jpg", width: 1200, height: 630, alt: "Ryan Pyles" }],
    },
    robots: { index: true, follow: true },
  };
}

export default function LocaleLanding({ params }: Params) {
  const { lang } = params;
  // English lives at the root; unknown segments are not locales.
  if (!isLocale(lang) || lang === defaultLocale) notFound();

  const c = landingContent[lang as Locale];

  return (
    <div className={styles.root} data-domain="ryan" lang={c.lang}>
      <HtmlLang lang={c.lang} />
      <PageBackground />

      <header className={styles.top}>
        <Link href="/" className={styles.wordmark}>
          Ryan J. Pyles
        </Link>
        <LocaleSwitcher current={lang as Locale} />
      </header>

      <main className={styles.main}>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <p className={styles.eyebrow}>{c.emphasis}</p>
        <h1 className={styles.statement}>{c.hero.statement}</h1>
        <p className={styles.descriptor}>{c.descriptor}</p>
        <p className={styles.summary}>{c.hero.summary}</p>

        <div className={styles.ctas}>
          <Link href={c.ctas.primary.href} className={styles.ctaPrimary}>
            {c.ctas.primary.label}
          </Link>
          <Link href={c.ctas.secondary.href} className={styles.ctaSecondary}>
            {c.ctas.secondary.label}
          </Link>
        </div>

        <ul className={styles.highlights}>
          {c.highlights.map((h) => (
            <li key={h.value} className={styles.highlight}>
              <span className={styles.highlightValue}>{h.value}</span>
              <span className={styles.highlightLabel}>{h.label}</span>
            </li>
          ))}
        </ul>

        {/* ── Section index, prefaced by the localized question ── */}
        <section className={styles.index} aria-label={c.lookingFor}>
          <p className={styles.lookingFor}>{c.lookingFor}</p>
          <nav className={styles.indexNav}>
            {c.nav.map((item) => (
              <Link key={item.href} href={item.href} className={styles.indexItem}>
                <span>{item.label}</span>
                <span className={styles.indexArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </nav>
        </section>

        {/* ── Locale signature device ──────────────────────────── */}
        <Signature c={c} />

        {/* ── FORMÆTRIX voice ──────────────────────────────────── */}
        <section className={styles.imprint}>
          <span className={styles.imprintLabel}>{c.formaetrix.label}</span>
          <p className={styles.imprintBody}>{c.formaetrix.body}</p>
          <a
            href={c.formaetrix.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.imprintLink}
          >
            formaetrix.com →
          </a>
        </section>

        <details className={styles.locNote}>
          <summary className={styles.locNoteSummary}>{c.localizationNote.label}</summary>
          <p className={styles.locNoteBody}>{c.localizationNote.body}</p>
        </details>
      </main>

      <footer className={styles.footer}>
        <p className={styles.artifact}>{c.footerArtifact}</p>
        <p className={styles.footerMeta}>
          © {new Date().getFullYear()} Ryan J. Pyles · {c.rights}
        </p>
      </footer>
    </div>
  );
}

/** Renders whichever signature device the locale defines. */
function Signature({ c }: { c: (typeof landingContent)[Locale] }) {
  const s = c.signature;
  if (s.kind === "pullQuote") {
    return (
      <blockquote className={styles.pullQuote}>
        <span className={styles.pullQuoteMark} aria-hidden="true">
          —
        </span>
        {s.quote}
      </blockquote>
    );
  }
  if (s.kind === "systemStatus") {
    return (
      <div className={styles.status} role="status">
        <span className={styles.statusTitle}>{s.title}</span>
        <span className={styles.statusState}>
          <span className={styles.statusDot} aria-hidden="true" />
          {s.state}
        </span>
        <ul className={styles.statusRows}>
          {s.rows.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    );
  }
  // vertical — each glyph stacked as its own block, so spacing never depends on
  // a fallback font's (often broken) vertical metrics.
  return (
    <div className={styles.vertical}>
      <span className={styles.verticalCaption}>{s.caption}</span>
      <div className={styles.verticalText} aria-label={s.text}>
        {Array.from(s.text).map((ch, i) => (
          <span key={i} className={styles.verticalChar} aria-hidden="true">
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}
