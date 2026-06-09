import React from "react";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import ScholarArchiveGrid from "@/components/ScholarArchiveGrid";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Archive — Ryan Pyles",
  description:
    "A scholar's notebook: fragments, observations, structural curiosities, and unfinished thoughts on language, narrative, software, and architecture.",
  keywords: [
    "Ryan Pyles archive",
    "scholar's notebook",
    "language notes",
    "narrative theory",
    "software observations",
  ],
};

export default function ArchivePage() {
  return (
    <SiteLayout>
      <Section>
        <header className={styles.header}>
          <span className={styles.kicker}>Archive</span>
          <h1 className={styles.heading}>Scholar&rsquo;s Notebook</h1>
          <p className={styles.intro}>
            Fragments, observations, structural curiosities, and unfinished thoughts —
            on language, narrative, software, and architecture. Written when the idea
            arrives, not when it&rsquo;s ready.
          </p>
        </header>

        <ScholarArchiveGrid />
      </Section>
    </SiteLayout>
  );
}
