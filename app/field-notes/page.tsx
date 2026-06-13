import React from "react";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import FieldNotesGrid from "@/components/FieldNotesGrid";
import { fieldNotes } from "@/content/fieldNotes";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Notebook fragments from Ryan Pyles — short entries on language, writing, software, and design, written as the ideas occur rather than after they're settled.",
  keywords: [
    "Ryan Pyles notebook",
    "field notes",
    "writing process notes",
    "language notes",
    "design notes",
  ],
};

export default function FieldNotesPage() {
  return (
    <SiteLayout background="field-notes">
      <Section>
        <header className={styles.header}>
          <h1>Field Notes</h1>
          <p className={styles.intro}>
            Short entries — on language, writing, software, and design —
            written close to the moment they occurred to me, before they had
            the chance to settle into something more polished.
          </p>
          <p className={styles.notice}>
            Essays and fragments, released as they&rsquo;re ready.
          </p>
        </header>

        <FieldNotesGrid notes={fieldNotes} />
      </Section>
    </SiteLayout>
  );
}
