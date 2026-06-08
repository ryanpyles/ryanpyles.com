import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import CurrentWorkCard from "@/components/CurrentWorkCard";
import FieldNoteCard from "@/components/FieldNoteCard";
import ScholarNotebook from "@/components/ScholarNotebook";
import VoigtProject from "@/components/VoigtProject";
import BooksArchive from "@/components/BooksArchive";
import ContinuityAtlasFeatured from "@/components/ContinuityAtlasFeatured";
import Reveal from "@/components/Reveal";
import { currentWork } from "@/content/currentWork";
import { fieldNotes } from "@/content/fieldNotes";
import { buildPersonJsonLd } from "@/lib/metadata";
import styles from "./page.module.css";
import type { Project } from "@/components/ProjectCard";

const LanguageSwitcher = dynamic(() => import("@/components/LanguageSwitcher"), {
  ssr: false,
});
const LivingManuscript = dynamic(() => import("@/components/LivingManuscript"), {
  ssr: false,
  loading: () => null,
});
const LanguageOrrery = dynamic(() => import("@/components/LanguageOrrery"), {
  ssr: false,
  loading: () => null,
});
const NetworkOfSelves = dynamic(() => import("@/components/NetworkOfSelves"), {
  ssr: false,
  loading: () => null,
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

const featuredProjects: Project[] = [
  {
    slug: "dual-domain-system",
    title: "Dual-Domain Identity System",
    description:
      "A single Next.js codebase serving two distinct brand identities — ryanpyles.com and formaetrix.com — via domain-based rendering and shared design tokens.",
    tags: ["Next.js", "TypeScript", "CSS Modules"],
    year: "2025",
  },
  {
    slug: "language-typography-engine",
    title: "Multi-Language Typography Engine",
    description:
      "RTL support, CJK font stacks, and localized typography across eleven languages with localStorage persistence and browser detection.",
    tags: ["React", "i18n", "Typography"],
    year: "2025",
  },
  {
    slug: "blob-navigation",
    title: "3D Identity Navigation",
    description:
      "WebGL blob interface using Three.js and React Three Fiber. Cursor-reactive organic deformation with region-mapped navigation.",
    tags: ["Three.js", "R3F", "WebGL"],
    year: "2025",
  },
];

export default function HomePage() {
  const jsonLd = buildPersonJsonLd();

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Hero */}
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

          <Link href="#archive" className={styles.heroScroll}>
            Enter Archive ↓
          </Link>
        </div>

        <div className={styles.langWrap}>
          <LanguageSwitcher />
        </div>
      </section>

      {/* Scholar's Notebook — § 01 */}
      <ScholarNotebook />

      {/* Language Orrery — § 02 */}
      <LanguageOrrery />

      {/* Research Log — § 03 */}
      <Section id="research-log">
        <Reveal>
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionKicker}>§ 03</span>
              <h2>Research Log</h2>
            </div>
            <span className={styles.sectionNote}>Active inquiries</span>
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

      {/* Network of Selves */}
      <NetworkOfSelves />

      {/* The Voigt Project — § 04 */}
      <VoigtProject />

      {/* Books — § 05 */}
      <BooksArchive />

      {/* Continuity Atlas — § 06 */}
      <ContinuityAtlasFeatured />

      {/* Systems & Experiments — § 07 */}
      <Section id="systems">
        <Reveal>
          <header className={[styles.sectionHeader, styles.sectionHeaderQuiet].join(" ")}>
            <div>
              <span className={styles.sectionKicker}>§ 07</span>
              <h2>Systems &amp; Experiments</h2>
            </div>
            <Link href="/projects" className={styles.sectionLink}>
              All projects →
            </Link>
          </header>
        </Reveal>
        <div className={styles.projectGrid}>
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 60}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Field Notes — § 08 */}
      <Section id="field-notes">
        <Reveal>
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionKicker}>§ 08</span>
              <h2>Field Notes</h2>
            </div>
            <Link href="/field-notes" className={styles.sectionLink}>
              Archive →
            </Link>
          </header>
        </Reveal>
        <div className={styles.fieldNoteGrid}>
          {fieldNotes.map((note, i) => (
            <Reveal key={note.slug} delay={i * 80}>
              <FieldNoteCard note={note} />
            </Reveal>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
