import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import CurrentWorkCard from "@/components/CurrentWorkCard";
import WritingArtifactCard from "@/components/WritingArtifactCard";
import FieldNoteCard from "@/components/FieldNoteCard";
import Reveal from "@/components/Reveal";
import { ryanBooks } from "@/content/books";
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
    <SiteLayout domain="ryan">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Hero */}
      <section className={styles.hero}>
        <LivingManuscript />

        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Ryan Pyles</h1>
          <p className={styles.heroSub}>Author. Software Engineer. Linguist.</p>
          <p className={styles.heroCopy}>
            I write experimental fiction, build web systems, study languages,
            and collect strange structures.
          </p>

          <div className={styles.currently}>
            <span className={styles.currentlyLabel}>Currently:</span>
            <ul className={styles.currentlyList}>
              <li>
                <Link href="#current-work" className={styles.currentlyLink}>
                  → Babel Threshold
                </Link>
              </li>
              <li>
                <Link href="#current-work" className={styles.currentlyLink}>
                  → Liminal 6:17
                </Link>
              </li>
              <li>
                <Link href="#current-work" className={styles.currentlyLink}>
                  → FORMÆTRIX
                </Link>
              </li>
              <li>
                <Link href="#current-work" className={styles.currentlyLink}>
                  → Language Research
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.langWrap}>
          <LanguageSwitcher />
        </div>
      </section>

      <LanguageOrrery />

      {/* Current Work */}
      <Section id="current-work">
        <Reveal>
          <header className={styles.sectionHeader}>
            <h2>Current Work</h2>
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

      <NetworkOfSelves />

      {/* Writing */}
      <Section id="writing">
        <Reveal>
          <header className={styles.sectionHeader}>
            <h2>Writing</h2>
            <Link href="/books" className={styles.sectionLink}>
              All titles →
            </Link>
          </header>
        </Reveal>
        <div className={styles.writingList}>
          {ryanBooks.map((book, i) => (
            <Reveal key={book.slug} delay={i * 70}>
              <WritingArtifactCard book={book} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Field Notes */}
      <Section id="field-notes">
        <Reveal>
          <header className={styles.sectionHeader}>
            <h2>Field Notes</h2>
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

      {/* Selected Projects */}
      <Section id="projects">
        <Reveal>
          <header className={[styles.sectionHeader, styles.sectionHeaderQuiet].join(" ")}>
            <h2>Selected Projects</h2>
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
    </SiteLayout>
  );
}
