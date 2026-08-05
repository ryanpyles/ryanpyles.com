import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import CurrentWorkCard from "@/components/CurrentWorkCard";
import FieldNoteCard from "@/components/FieldNoteCard";
import EcosystemScene from "@/components/EcosystemScene";
import RotateHint from "@/components/RotateHint";
import HomepageFiction from "@/components/HomepageFiction";
import VoigtProject from "@/components/VoigtProject";
import VoigtEssay from "@/components/VoigtEssay";
import ContinuityAtlasScene from "@/components/ContinuityAtlasScene";
import Reveal from "@/components/Reveal";
import { currentWork } from "@/content/currentWork";
import { fieldNotes } from "@/content/fieldNotes";
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
  title: "Ryan Pyles — Author, Engineer, Linguist",
  description:
    "Ryan Pyles writes experimental fiction as Elian Voigt, runs FORMÆTRIX as a design and systems studio, and studies twelve languages. The personal archive behind all three.",
  keywords: [
    "Ryan Pyles",
    "Elian Voigt",
    "FORMÆTRIX",
    "experimental fiction",
    "software engineer Chicago",
    "literary fiction",
    "linguist",
  ],
};

export default function HomePage() {
  const jsonLd = buildPersonJsonLd();
  // Show only the 2 most recent field notes on the homepage
  const homepageNotes = fieldNotes.slice(0, 2);

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
              aria-label="Work with Ryan — get in touch"
            >
              Work with me →
            </Link>
            <a
              href="https://www.elianvoigt.com"
              className={styles.heroCtaSecondary}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the fiction — ElianVoigt.com"
            >
              Read the fiction
            </a>
            <a href="#ecosystem" className={styles.heroCtaTertiary}>
              Explore the archive ↓
            </a>
          </div>

          {/* Mobile-only CTAs — primary: work with Ryan directly */}
          <div className={`${styles.heroCtasMobile} ${styles.heroEnter} ${styles.heroEnter5}`}>
            <Link
              href="/contact"
              className={styles.heroCta}
              aria-label="Work with Ryan — get in touch"
            >
              Work with me →
            </Link>
            <a
              href="https://www.elianvoigt.com"
              className={styles.heroCtaWork}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the fiction — ElianVoigt.com"
            >
              Read the fiction →
            </a>
            <a href="#ecosystem" className={styles.heroCtaTertiary}>
              Explore the archive ↓
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
            Work with me →
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

      {/* ── Fiction / Books (3 featured + forthcoming) ─────────── */}
      <HomepageFiction />

      {/* ── Living Archive: Field Notes ───────────────────────── */}
      <Section id="field-notes">
        <header className={styles.sectionHeader}>
          <div>
            <Reveal><span className={styles.sectionKicker}>Notes</span></Reveal>
            <Reveal delay={80} slow><h2>Field Notes</h2></Reveal>
            <Reveal delay={200}>
              <p className={styles.sectionIntro}>
                Short fragments written close to the moment — observations,
                structural curiosities, and language notes before they settle
                into something more considered.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Link href="/field-notes" className={styles.sectionLink}>
              Notes archive →
            </Link>
          </Reveal>
        </header>
        <div className={styles.fieldNoteGrid}>
          {homepageNotes.map((note, i) => (
            <Reveal key={note.slug} delay={160 + i * 140}>
              <FieldNoteCard note={note} />
            </Reveal>
          ))}
        </div>
      </Section>

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
