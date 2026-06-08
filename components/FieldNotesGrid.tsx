"use client";

import React, { useState, useMemo } from "react";
import FieldNoteCard from "./FieldNoteCard";
import type { FieldNote } from "@/content/fieldNotes/types";
import styles from "./FieldNotesGrid.module.css";

const ALL = "All";

interface FieldNotesGridProps {
  notes: FieldNote[];
}

export default function FieldNotesGrid({ notes }: FieldNotesGridProps) {
  const [active, setActive] = useState<string>(ALL);

  const categories = useMemo<string[]>(() => {
    const seen = new Set<string>();
    notes.forEach((n) => seen.add(n.category));
    return [ALL, ...Array.from(seen)];
  }, [notes]);

  const visible = useMemo(
    () => (active === ALL ? notes : notes.filter((n) => n.category === active)),
    [notes, active]
  );

  return (
    <div className={styles.root}>
      <nav className={styles.filters} aria-label="Filter field notes by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={styles.filter}
            data-active={active === cat || undefined}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
          >
            {cat}
          </button>
        ))}
        <span className={styles.count} aria-live="polite" aria-atomic="true">
          {visible.length === notes.length
            ? `${notes.length} entries`
            : `${visible.length} of ${notes.length}`}
        </span>
      </nav>

      <div className={styles.grid} role="list">
        {visible.map((note) => (
          <div key={note.slug} role="listitem">
            <FieldNoteCard note={note} />
          </div>
        ))}
      </div>
    </div>
  );
}
