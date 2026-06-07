"use client";

import React, { useState } from "react";
import styles from "./FieldNoteCard.module.css";
import type { FieldNote } from "@/content/fieldNotes/types";

interface FieldNoteCardProps {
  note: FieldNote;
}

const STATUS_LABEL: Record<FieldNote["status"], string> = {
  draft: "Draft",
  published: "Published",
  fragment: "Fragment",
};

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function FieldNoteCard({ note }: FieldNoteCardProps) {
  const [expanded, setExpanded] = useState(false);
  const canExpand = Boolean(note.body);

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.date}>{formatDate(note.date)}</span>
        <span className={styles.category}>{note.category}</span>
        <span className={styles.status}>{STATUS_LABEL[note.status]}</span>
      </header>

      <h3 className={styles.title}>{note.title}</h3>
      <p className={styles.excerpt}>{note.excerpt}</p>

      {canExpand && (
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? "− Collapse" : "+ Read more"}
        </button>
      )}

      {expanded && note.body && (
        <div className={styles.body}>
          <p>{note.body}</p>
          {note.relatedWork && note.relatedWork.length > 0 && (
            <p className={styles.related}>
              Related: {note.relatedWork.join(" · ")}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
