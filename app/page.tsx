import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import FieldNotesScene from "@/components/FieldNotesScene";
import EcosystemScene from "@/components/EcosystemScene";
import WhatIBuild from "@/components/WhatIBuild";
import Disciplines from "@/components/Disciplines";
import HeroOrrery from "@/components/HeroOrrery";
import { Ae } from "@/components/Ae";
import RotateHint from "@/components/RotateHint";
import BooksScene from "@/components/BooksScene";
import VoigtIdentityBand from "@/components/VoigtIdentityBand";
import ContinuityAtlasScene from "@/components/ContinuityAtlasScene";
import InProgressScene from "@/components/InProgressScene";
import Reveal from "@/components/Reveal";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import DeferMount from "@/components/DeferMount";
import { buildPageMetadata, buildPersonJsonLd, buildOrganizationJsonLd } from "@/lib/metadata";
import { siteUrl, landingLanguageAlternates } from "@/lib/i18n";
import styles from "./page.module.css";

// SiteProgressObject: fixed morphing constellation — scroll wayfinding (desktop)
const SiteProgressObject = dynamic(
  () => import("@/components/SiteProgressObject"),
  { ssr: false }
);

// LanguageOrrery: 100 vh section — show an archival placeholder while WebGL initialises
function OrreryLoader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        background: "var(--color-black)",
        color: "var(--color-muted)",
      }}
      aria-hidden="true"
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          opacity: 0.45,
        }}
      >
        Language Orrery
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          opacity: 0.28,
        }}
      >
        Initialising chart…
      </span>
    </div>
  );
}

const LanguageOrreryScene = dynamic(
  () => import("@/components/LanguageOrreryScene"),
  {
    ssr: false,
    loading: OrreryLoader,
  }
);

export const metadata: Metadata = buildPageMetadata({
  title: "Ryan Pyles — Software Engineer, AI Architect & Multidisciplinary Technologist",
  description:
    "Ryan Pyles is a Chicago technologist working across software engineering, AI systems, design, and language — building AI, publishing, and multilingual web systems with React, Next.js, and TypeScript. He runs the FORMÆTRIX studio and writes fiction as Elian Voigt.",
  path: "",
  keywords: [
    "Ryan Pyles",
    "software engineer Chicago",
    "AI systems architect",
    "full-stack developer",
    "Next.js developer",
    "React",
    "TypeScript",
    "AI narrative tooling",
    "publishing infrastructure",
    "FORMÆTRIX",
    "Elian Voigt",
  ],
  titleIsComplete: true,
});

// hreflang across the localized landing surface (en canonical at root).
metadata.alternates = {
  canonical: `${siteUrl}/`,
  languages: landingLanguageAlternates(),
  types: { "application/rss+xml": `${siteUrl}/feed.xml` },
};

export default function HomePage() {
  const jsonLd = buildPersonJsonLd();

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildOrganizationJsonLd() }}
      />

      <DeferMount strategy="idle">
        <SiteProgressObject />
      </DeferMount>
      <RotateHint />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className={styles.hero} id="hero">
        <HeroOrrery />

        {/* Archival corner metadata — the figure is a plate, not a banner. */}
        <div className={`${styles.heroMeta} ${styles.heroEnter} ${styles.heroEnter1}`} aria-hidden="true">
          <span className={styles.heroFig}>Fig. 01</span>
          <span className={styles.heroColophon}>
            FORM<Ae />TRIX · RYAN PYLES · MMXXV
          </span>
        </div>

        <div className={styles.heroInner}>
          {/* Mobile-only orientation — name, role, one sharp line */}
          <div className={`${styles.heroMobileIntro} ${styles.heroEnter} ${styles.heroEnter2}`}>
            <span className={styles.heroMobileName}>Ryan J. Pyles</span>
            <span className={styles.heroMobileRoles}>Software · AI · Design · Language</span>
            <span className={styles.heroMobilePlace}>Chicago</span>
            <p className={styles.heroMobileLine}>
              I work across software, AI, design, and language — through
              FORMÆTRIX, and write fiction as Elian Voigt.
            </p>
          </div>

          <p className={`${styles.heroAttribution} ${styles.heroEnter} ${styles.heroEnter1}`}>
            Ryan Pyles — Chicago · Software · AI · Design · Language
          </p>

          {/* The offer, as the H1 — broadened from "narrative systems" to the
              multidisciplinary proposition. The line search and answer engines
              weight, and the one that sets the site's aperture. */}
          <h1 className={`${styles.heroStatement} ${styles.heroEnter} ${styles.heroEnter2}`}>
            I build systems for problems that refuse to stay in one discipline.
          </h1>

          {/* The thesis of the whole site — four disciplines, one orbit. */}
          <p className={`${styles.heroDeck} ${styles.heroEnter} ${styles.heroEnter3}`}>
            Software. AI. Design. Language. The interesting work happens
            between them.
          </p>

          <p className={`${styles.heroClarity} ${styles.heroEnter} ${styles.heroEnter4}`}>
            Software engineering, AI systems, product design, and language —
            brought to problems that cross all four, through FORMÆTRIX.
          </p>

          {/* Two visually equal paths — hire, or read — then a quiet third. */}
          <div className={`${styles.heroCtas} ${styles.heroEnter} ${styles.heroEnter5}`}>
            <Link
              href="/contact"
              className={styles.heroCta}
              aria-label="Discuss a project — get in touch"
            >
              Discuss a project →
            </Link>
            <a
              href="https://www.elianvoigt.com"
              className={styles.heroCtaOutline}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the fiction — ElianVoigt.com"
            >
              Read the fiction →
            </a>
            <Link
              href="/projects"
              className={styles.heroCtaSecondary}
              aria-label="View engineering work — projects and case studies"
            >
              View engineering work →
            </Link>
          </div>

        </div>

        <p className={`${styles.heroProcess} ${styles.heroEnter} ${styles.heroEnter5}`} aria-hidden="true">
          <span>Ideas</span>
          <span>Systems</span>
          <span>Tools</span>
          <span>People</span>
          <span>A brighter tomorrow</span>
        </p>

        <div className={styles.langWrap}>
          <LocaleSwitcher current="en" />
        </div>
      </section>

      {/* ── The four disciplines — the multidisciplinary proposition,
           visible immediately. Software, AI, design, language as one
           practice before any single flagship. ─────────────────── */}
      <Disciplines />

      {/* ── Highlights: credibility at a glance ──────────────── */}
      <section className={styles.highlights} aria-label="At a glance">
        <div className={styles.highlightsInner}>
          <div className={styles.highlight}>
            <span className={styles.highlightValue}>AI &amp; web systems</span>
            <span className={styles.highlightLabel}>shipped end to end</span>
          </div>
          <div className={styles.highlight}>
            <span className={styles.highlightValue}>Six published novels</span>
            <span className={styles.highlightLabel}>as Elian Voigt</span>
          </div>
          <div className={styles.highlight}>
            <span className={styles.highlightValue}>Twelve languages</span>
            <span className={styles.highlightLabel}>in active study</span>
          </div>
        </div>
      </section>

      {/* ── What I build for clients (commercial legibility) ───── */}
      <WhatIBuild />

      {/* ── Proof first: the flagship system, then work currently in flight.
           A client or hiring manager gets the pitch, then evidence, then
           a way to act — before the literary half of the site begins. ─ */}
      {/* ── Featured Work: Continuity Atlas — pinned product scene ─ */}
      <ContinuityAtlasScene />

      {/* ── In Progress — pinned research-ledger scene ──────────── */}
      <InProgressScene />

      {/* ── Mid-page CTA — the conversion moment, after the pitch and the
           proof. Previously mobile-only, which left desktop with no way
           to act between the hero and the footer, 28 screens apart. ─── */}
      <section className={styles.midCta} aria-label="Work with Ryan">
        <p className={styles.midCtaBody}>
          Selected engagements through FORMÆTRIX: author sites, publishing
          systems, editorial interfaces, and narrative tools.
        </p>
        <div className={styles.midCtaLinks}>
          <Link href="/contact" className={styles.heroCtaWork}>
            Discuss your project →
          </Link>
          <a
            href="https://www.formaetrix.com"
            className={styles.heroCtaTertiary}
            target="_blank"
            rel="noopener noreferrer"
          >
            View FORMÆTRIX →
          </a>
        </div>
      </section>

      {/* ── The pivot: from what he builds to why there are three names. ─── */}
      {/* ── Ecosystem — pinned scroll scene: three doors reveal in turn ──── */}
      <EcosystemScene />

      {/* ── The Voigt Project — short identity module (full case study at /voigt-project) ─ */}
      <VoigtIdentityBand />

      {/* ── The literary arc, for readers who keep going. ─────────────── */}
      {/* ── Fiction / Books — pinned shelf scene ───────────────── */}
      <BooksScene />

      {/* ── Living Archive: Field Notes — pinned card-pile scene ─ */}
      <FieldNotesScene />

      {/* ── Language Orrery — pinned zoom-and-annotate scene ──── */}
      <div id="orrery" aria-hidden="true" />
      <DeferMount minHeight="100vh">
        <LanguageOrreryScene />
      </DeferMount>

      {/* ── Contact CTA ────────────────────────────────────────── */}
      <section className={styles.contactCta} id="contact" aria-label="Get in touch">
        <div className={styles.contactCtaInner}>
          <Reveal>
            <p className={styles.contactCtaHeading}>Work with Ryan</p>
          </Reveal>
          <Reveal delay={120}>
            <p className={styles.contactCtaBody}>
              FORMÆTRIX takes selected engagements for publishers, authors, and
              organizations where language and form are load-bearing.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className={styles.contactCtaLinks}>
              <a href="mailto:me@ryanpyles.com" className={styles.contactCtaEmail}>
                me@ryanpyles.com
              </a>
              <a
                href="https://www.formaetrix.com"
                className={styles.contactCtaStudio}
                target="_blank"
                rel="noopener noreferrer"
              >
                FORMÆTRIX →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
