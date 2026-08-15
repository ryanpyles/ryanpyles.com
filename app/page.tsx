import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import CurrentWorkCard from "@/components/CurrentWorkCard";
import FieldNotesScene from "@/components/FieldNotesScene";
import EcosystemScene from "@/components/EcosystemScene";
import WhatIBuild from "@/components/WhatIBuild";
import RotateHint from "@/components/RotateHint";
import BooksScene from "@/components/BooksScene";
import VoigtProject from "@/components/VoigtProject";
import VoigtEssay from "@/components/VoigtEssay";
import ContinuityAtlasScene from "@/components/ContinuityAtlasScene";
import Reveal from "@/components/Reveal";
import { currentWork } from "@/content/currentWork";
import { buildPersonJsonLd } from "@/lib/metadata";
import styles from "./page.module.css";

const LanguageSwitcher = dynamic(() => import("@/components/LanguageSwitcher"), {
  ssr: false,
});

// SiteProgressObject: fixed morphing constellation — scroll wayfinding (desktop)
const SiteProgressObject = dynamic(
  () => import("@/components/SiteProgressObject"),
  { ssr: false }
);

// LivingManuscript: hero background — hero text renders immediately; canvas loads silently
const LivingManuscript = dynamic(() => import("@/components/LivingManuscript"), {
  ssr: false,
  loading: () => null,
});

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

export const metadata: Metadata = {
  title: "Ryan Pyles — Software Engineer & AI Systems Architect",
  description:
    "Ryan Pyles is a software engineer and AI systems architect in Chicago building AI, publishing, and multilingual web systems with React, Next.js, and TypeScript. He runs the FORMÆTRIX studio and writes fiction as Elian Voigt.",
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
};

export default function HomePage() {
  const jsonLd = buildPersonJsonLd();

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <SiteProgressObject />
      <RotateHint />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className={styles.hero} id="hero">
        <LivingManuscript />

        <div className={styles.heroInner}>
          <div className={`${styles.heroAnnotations} ${styles.heroEnter} ${styles.heroEnter1}`} aria-hidden="true">
            <span className={styles.heroAnnotation}>64°08′ N, 21°56′ W</span>
            <span className={styles.heroAnnotation}>fn. 14 — see Voigt, 2024</span>
            <span className={styles.heroAnnotation}>declension</span>
            <span className={styles.heroAnnotation}>halló · halloo · salut</span>
            <span className={styles.heroAnnotation}>§ 04 · identity</span>
          </div>

          {/* Mobile-only orientation — name, role, one sharp line */}
          <div className={`${styles.heroMobileIntro} ${styles.heroEnter} ${styles.heroEnter2}`}>
            <span className={styles.heroMobileName}>Ryan J. Pyles</span>
            <span className={styles.heroMobileRoles}>Author · Engineer · Linguist</span>
            <span className={styles.heroMobilePlace}>Chicago</span>
            <p className={styles.heroMobileLine}>
              I write experimental fiction as Elian Voigt and build narrative
              systems through FORMÆTRIX.
            </p>
          </div>

          <h1 className={`${styles.heroStatement} ${styles.heroEnter} ${styles.heroEnter2}`}>
            The distance between a manuscript, a language, and a software system
            is smaller than it first appears.
          </h1>

          <p className={`${styles.heroClarity} ${styles.heroEnter} ${styles.heroEnter3}`}>
            I design narrative systems for publishing, software, and fiction.
          </p>

          <p className={`${styles.heroAttribution} ${styles.heroEnter} ${styles.heroEnter3}`}>Ryan Pyles — Chicago</p>

          <p className={`${styles.heroSummary} ${styles.heroEnter} ${styles.heroEnter4}`}>
            The personal archive behind all three — the fiction of Elian Voigt,
            the FORMÆTRIX studio, and the language work.
          </p>

          {/* Desktop / tablet CTAs — primary: work with Ryan directly.
              The studio and fiction have their own sites (formaetrix.com,
              elianvoigt.com); this hub's job is the direct relationship. */}
          <div className={`${styles.heroCtas} ${styles.heroEnter} ${styles.heroEnter5}`}>
            <Link
              href="/contact"
              className={styles.heroCta}
              aria-label="Discuss your project — get in touch"
            >
              Discuss your project →
            </Link>
            <Link
              href="/projects"
              className={styles.heroCtaSecondary}
              aria-label="View engineering work — projects and case studies"
            >
              View engineering work →
            </Link>
            <a
              href="https://www.elianvoigt.com"
              className={styles.heroCtaTertiary}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the fiction — ElianVoigt.com"
            >
              Read the fiction →
            </a>
          </div>

          {/* Mobile-only CTAs — primary: work with Ryan directly */}
          <div className={`${styles.heroCtasMobile} ${styles.heroEnter} ${styles.heroEnter5}`}>
            <Link
              href="/contact"
              className={styles.heroCta}
              aria-label="Discuss your project — get in touch"
            >
              Discuss your project →
            </Link>
            <Link
              href="/projects"
              className={styles.heroCtaWork}
              aria-label="View engineering work — projects and case studies"
            >
              View engineering work →
            </Link>
            <a
              href="https://www.elianvoigt.com"
              className={styles.heroCtaTertiary}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the fiction — ElianVoigt.com"
            >
              Read the fiction →
            </a>
          </div>
        </div>

        <div className={styles.langWrap}>
          <LanguageSwitcher />
        </div>
      </section>

      {/* ── Highlights: credibility at a glance ──────────────── */}
      <section className={styles.highlights} aria-label="At a glance">
        <div className={styles.highlightsInner}>
          <div className={styles.highlight}>
            <span className={styles.highlightValue}>Narrative systems</span>
            <span className={styles.highlightLabel}>for authors &amp; publishers</span>
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

      {/* ── Ecosystem — pinned scroll scene: three doors reveal in turn ──── */}
      <EcosystemScene />

      {/* ── Mobile-only mid-page CTA — surface "work with me" early ──── */}
      <section className={styles.mobileMidCta} aria-label="Work with Ryan">
        <p className={styles.mobileMidCtaBody}>
          Selected engagements through FORMÆTRIX: author sites, publishing
          systems, editorial interfaces, and narrative tools.
        </p>
        <div className={styles.mobileMidCtaLinks}>
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

      {/* ── Featured Work: Continuity Atlas — pinned product scene ─ */}
      <ContinuityAtlasScene />

      {/* ── Fiction / Books — pinned shelf scene ───────────────── */}
      <BooksScene />

      {/* ── Living Archive: Field Notes — pinned card-pile scene ─ */}
      <FieldNotesScene />

      {/* ── The Voigt Project (deep scroll narrative + documentary essay) ─ */}
      <VoigtProject />
      <VoigtEssay />

      {/* ── Language Orrery — pinned zoom-and-annotate scene ──── */}
      <div id="orrery" aria-hidden="true" />
      <LanguageOrreryScene />

      {/* ── In Progress (condensed Research Log) ──────────────── */}
      <Section id="in-progress">
        <header className={[styles.sectionHeader, styles.sectionHeaderQuiet].join(" ")}>
          <div>
            <Reveal><span className={styles.sectionKicker}>Research</span></Reveal>
            <Reveal delay={80} slow><h2>In Progress</h2></Reveal>
            <Reveal delay={200}><p className={styles.sectionIntro}>Longer-form work before it closes — language studies, narrative systems, ongoing manuscripts.</p></Reveal>
          </div>
          <Reveal delay={120}>
            <Link href="/archive" className={styles.sectionLink}>
              Research archive →
            </Link>
          </Reveal>
        </header>
        <div className={styles.currentWorkList}>
          {currentWork.map((item, i) => (
            <Reveal key={item.slug} delay={i * 100}>
              <CurrentWorkCard item={item} />
            </Reveal>
          ))}
        </div>
      </Section>

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
