"use client";

import React, { useState, useMemo } from "react";
import { scholarNotes, type ScholarNote } from "@/content/scholarNotes";
import styles from "./ScholarArchiveGrid.module.css";

const ALL = "All";

const CATEGORY_LABELS: Record<ScholarNote["category"] | "All", string> = {
  All: "All",
  language: "Language",
  narrative: "Narrative",
  software: "Software",
  architecture: "Architecture",
  research: "Research",
};

export default function ScholarArchiveGrid() {
  const [active, setActive] = useState<ScholarNote["category"] | "All">(ALL);

  const categories = useMemo<(ScholarNote["category"] | "All")[]>(() => {
    const seen = new Set<ScholarNote["category"]>();
    scholarNotes.forEach((n) => seen.add(n.category));
    return [ALL, ...Array.from(seen)];
  }, []);

  const visible = useMemo(
    () =>
      active === ALL
        ? scholarNotes
        : scholarNotes.filter((n) => n.category === active),
    [active]
  );

  return (
    <div className={styles.root}>
      <nav className={styles.filters} aria-label="Filter notes by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={styles.filter}
            data-active={active === cat || undefined}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
        <span className={styles.count} aria-live="polite" aria-atomic="true">
          {visible.length === scholarNotes.length
            ? `${scholarNotes.length} entries`
            : `${visible.length} of ${scholarNotes.length}`}
        </span>
      </nav>

      <ol className={styles.grid} aria-label="Scholar's notebook entries">
        {visible.map((note) => (
          <li key={note.id} className={styles.card}>
            <span className={styles.number}>{note.number}</span>
            <p className={styles.text}>{note.text}</p>
            <span className={styles.category}>{CATEGORY_LABELS[note.category]}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
