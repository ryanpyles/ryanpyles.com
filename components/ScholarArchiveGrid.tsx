"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
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

function formatDate(iso: string): string {
  const [year, month] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

function formatDateLong(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function ScholarArchiveGrid() {
  const [active, setActive] = useState<ScholarNote["category"] | "All">(ALL);
  const [selected, setSelected] = useState<ScholarNote | null>(null);

  const categories = useMemo<(ScholarNote["category"] | "All")[]>(() => {
    const seen = new Set<ScholarNote["category"]>();
    scholarNotes.forEach((n) => seen.add(n.category));
    return [ALL, ...Array.from(seen)];
  }, []);

  const counts = useMemo(() => {
    const map: Partial<Record<ScholarNote["category"] | "All", number>> = { All: scholarNotes.length };
    scholarNotes.forEach((n) => { map[n.category] = (map[n.category] ?? 0) + 1; });
    return map;
  }, []);

  const visible = useMemo(
    () => active === ALL ? scholarNotes : scholarNotes.filter((n) => n.category === active),
    [active]
  );

  const openNote = useCallback((note: ScholarNote) => setSelected(note), []);
  const closeModal = useCallback(() => {
    document.body.style.overflow = "";
    setSelected(null);
  }, []);

  const openRef = useCallback((id: string) => {
    const note = scholarNotes.find((n) => n.id === id);
    if (note) setSelected(note);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, closeModal]);

  // Failsafe: always restore scroll when the component unmounts (e.g. navigating away)
  useEffect(() => {
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
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
              <span className={styles.filterCount}>{counts[cat]}</span>
            </button>
          ))}
        </nav>

        <ol className={styles.grid} aria-label="Scholar's notebook entries">
          {visible.map((note) => (
            <li key={note.id} className={styles.card}>
              <button
                className={styles.cardBtn}
                onClick={() => openNote(note)}
                aria-label={`Open fragment ${note.number}`}
              >
                <span className={styles.cardMeta}>
                  <span className={styles.number}>{note.number}</span>
                  <span className={styles.date}>{formatDate(note.date)}</span>
                </span>
                <p className={styles.text}>{note.text}</p>
                <span className={styles.category}>{CATEGORY_LABELS[note.category]}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {selected && (
        <div
          className={styles.overlay}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Fragment ${selected.number}`}
        >
          <article className={styles.panel} onClick={(e) => e.stopPropagation()}>
            <header className={styles.panelHeader}>
              <div className={styles.panelMeta}>
                <span className={styles.panelNumber}>{selected.number}</span>
                <span className={styles.panelSep}>·</span>
                <span className={styles.panelDate}>{formatDateLong(selected.date)}</span>
                <span className={styles.panelSep}>·</span>
                <span className={styles.panelCategory}>{CATEGORY_LABELS[selected.category]}</span>
              </div>
              <button
                className={styles.closeBtn}
                onClick={closeModal}
                aria-label="Close fragment"
              >
                ×
              </button>
            </header>

            <blockquote className={styles.panelQuote}>{selected.text}</blockquote>

            <div className={styles.panelBody}>
              {selected.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {selected.refs && selected.refs.length > 0 && (
              <footer className={styles.panelRefs}>
                <span className={styles.refsLabel}>See also</span>
                <ul className={styles.refsList}>
                  {selected.refs.map((id) => {
                    const ref = scholarNotes.find((n) => n.id === id);
                    if (!ref) return null;
                    return (
                      <li key={id}>
                        <button
                          className={styles.refLink}
                          onClick={() => openRef(id)}
                        >
                          {ref.number} — <em>{ref.text}</em>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </footer>
            )}
          </article>
        </div>
      )}
    </>
  );
}
