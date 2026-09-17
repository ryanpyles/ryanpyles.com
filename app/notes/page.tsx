import React from "react";
import { buildPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import FieldNotesGrid from "@/components/FieldNotesGrid";
import ScholarArchiveGrid from "@/components/ScholarArchiveGrid";
import { fieldNotes } from "@/content/fieldNotes";
import styles from "./page.module.css";

export const metadata: Metadata = buildPageMetadata({
  title: "Notes",
  description:
    "Notebook fragments from Ryan Pyles — short entries on language, writing, software, and design, alongside a scholar's notebook of structural observations and unfinished thoughts.",
  path: "/notes",
  keywords: [
    "Ryan Pyles notebook",
    "field notes",
    "scholar's notebook",
    "language notes",
    "narrative theory",
    "design notes",
  ],
});

/**
 * Field Notes and the Scholar's Notebook were two separate sections doing
 * the same job — short, unfinished thinking. They share one page now, kept
 * as distinct registers rather than interleaved: the notes are written to
 * be read, the notebook entries are working material.
 */
export default function NotesPage() {
  return (
    <SiteLayout>
      <Section>
        <header className={styles.header}>
          <h1>Notes</h1>
          <p className={styles.intro}>
            Short entries — on language, writing, software, and design —
            written close to the moment they occurred to me, before they had
            the chance to settle into something more polished.
          </p>
        </header>

        <FieldNotesGrid notes={fieldNotes} />

        <div className={styles.notebook}>
          <header className={styles.notebookHeader}>
            <span className={styles.kicker}>§ notebook</span>
            <h2 className={styles.notebookHeading}>Scholar&rsquo;s Notebook</h2>
            <p className={styles.notebookIntro}>
              Fragments, observations, structural curiosities, and unfinished
              thoughts — on language, narrative, software, and architecture.
            </p>
          </header>

          <ScholarArchiveGrid />
        </div>

        <div className={styles.updates}>
          <p className={styles.updatesText}>
            Notes go out when they&rsquo;re ready — no schedule, no filler.
            If you&rsquo;d like to hear when something new appears, send a
            note to{" "}
            <a href="mailto:me@ryanpyles.com?subject=Notes updates" className={styles.updatesLink}>
              me@ryanpyles.com
            </a>{" "}
            with the subject &ldquo;Notes updates&rdquo; and I&rsquo;ll add
            you to the list.
          </p>
        </div>
      </Section>
    </SiteLayout>
  );
}
