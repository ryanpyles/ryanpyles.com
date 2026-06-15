import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import CurrentWorkCard from "@/components/CurrentWorkCard";
import FieldNoteCard from "@/components/FieldNoteCard";
import IdentityBridge from "@/components/IdentityBridge";
import HomepageFiction from "@/components/HomepageFiction";
import StartHere from "@/components/StartHere";
import VoigtProject from "@/components/VoigtProject";
import ContinuityAtlasFeatured from "@/components/ContinuityAtlasFeatured";
import Reveal from "@/components/Reveal";
import { currentWork } from "@/content/currentWork";
import { fieldNotes } from "@/content/fieldNotes";
import { buildPersonJsonLd } from "@/lib/metadata";
import styles from "./page.module.css";

const LanguageSwitcher = dynamic(() => import("@/components/LanguageSwitcher"), {
  ssr: false,
});

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

const LanguageOrrery = dynamic(() => import("@/components/LanguageOrrery"), {
  ssr: false,
  loading: OrreryLoader,
});

export const metadata: Metadata = {
  title: "Ryan Pyles — Author, Software Engineer, Linguist",
  description:
    "Ryan Pyles writes experimental fiction, builds web systems, studies languages, and collects strange structures. A personal archive of work in progress.",
  keywords: [
    "Ryan Pyles author",
    "experimental fiction",
    "software engineer Chicago",
    "linguist",
    "literary fiction",
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

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <LivingManuscript />

        <div className={styles.heroInner}>
          <div className={styles.heroAnnotations} aria-hidden="true">
            <span className={styles.heroAnnotation}>64°08′ N, 21°56′ W</span>
            <span className={styles.heroAnnotation}>fn. 14 — see Voigt, 2019</span>
            <span className={styles.heroAnnotation}>syntax</span>
            <span className={styles.heroAnnotation}>halló</span>
            <span className={styles.heroAnnotation}>你好</span>
          </div>

          <h1 className={styles.heroStatement}>
            The distance between a manuscript, a language, and a software system
            is smaller than it first appears.
          </h1>

          <p className={styles.heroAttribution}>Ryan Pyles — Chicago</p>

          <p className={styles.heroSummary}>
            Author of literary fiction, software engineer, and linguist. Nine novels
            published as Elian Voigt. Systems built for narrative intelligence.
            Twelve languages under active study.
          </p>

          <div className={styles.heroCtas}>
            <a href="/books" className={styles.heroCta}>
              Read the Fiction →
            </a>
            <a href="/projects" className={styles.heroCtaSecondary}>
              Explore the Systems
            </a>
          </div>
        </div>

        <div className={styles.langWrap}>
          <LanguageSwitcher />
        </div>
      </section>

      {/* ── Identity Bridge ────────────────────────────────────── */}
      <IdentityBridge />

      {/* ── Start Here (guided entry — early, before content) ──── */}
      <StartHere />

      {/* ── Fiction / Books (3 featured + forthcoming) ─────────── */}
      <HomepageFiction />

      {/* ── Featured Work: Continuity Atlas ───────────────────── */}
      <ContinuityAtlasFeatured />

      {/* ── Language Orrery (reward section) ──────────────────── */}
      <div id="orrery" aria-hidden="true" />
      <LanguageOrrery />

      {/* ── Field Notes (2 entries) ────────────────────────────── */}
      <Section id="field-notes">
        <Reveal>
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionKicker}>Notes</span>
              <h2>Field Notes</h2>
              <p className={styles.sectionIntro}>
                Thinking before it becomes work. Observations, structural
                curiosities, and fragments that may eventually appear somewhere
                else — or may not.
              </p>
            </div>
            <Link href="/field-notes" className={styles.sectionLink}>
              Notes archive →
            </Link>
          </header>
        </Reveal>
        <div className={styles.fieldNoteGrid}>
          {homepageNotes.map((note, i) => (
            <Reveal key={note.slug} delay={i * 80}>
              <FieldNoteCard note={note} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── The Voigt Project ─────────────────────────────────── */}
      <VoigtProject />

      {/* ── In Progress (condensed Research Log) ──────────────── */}
      <Section id="in-progress">
        <Reveal>
          <header className={[styles.sectionHeader, styles.sectionHeaderQuiet].join(" ")}>
            <div>
              <span className={styles.sectionKicker}>Research</span>
              <h2>In Progress</h2>
              <p className={styles.sectionIntro}>What is currently unfinished.</p>
            </div>
          </header>
        </Reveal>
        <div className={styles.currentWorkList}>
          {currentWork.map((item, i) => (
            <Reveal key={item.slug} delay={i * 60}>
              <CurrentWorkCard item={item} />
            </Reveal>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
