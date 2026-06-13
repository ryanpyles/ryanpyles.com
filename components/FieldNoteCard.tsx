"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./FieldNoteCard.module.css";
import type { FieldNote } from "@/content/fieldNotes/types";
import { RELATED_HREFS } from "@/content/fieldNotes/relatedLinks";

interface FieldNoteCardProps {
  note: FieldNote;
}

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
  const bodyId = `field-note-body-${note.slug}`;

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.date}>{formatDate(note.date)}</span>
        <span className={styles.category}>{note.category}</span>
      </header>

      <h3 className={styles.title}>
        <Link href={`/field-notes/${note.slug}`} className={styles.titleLink}>{note.title}</Link>
      </h3>
      <p className={styles.excerpt}>{note.excerpt}</p>

      {canExpand && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={bodyId}
          >
            <span aria-hidden="true">{expanded ? "−" : "+"}</span>
            <span>{expanded ? "Collapse" : "Read more"}</span>
          </button>
        </div>
      )}

      {expanded && note.body && (
        <div id={bodyId} className={styles.body} role="region" aria-label={`Full text: ${note.title}`}>
          <p>{note.body}</p>
          {note.relatedWork && note.relatedWork.length > 0 && (
            <p className={styles.related}>
              Related:{" "}
              {note.relatedWork.map((item, i) => {
                const href = RELATED_HREFS[item];
                const isExternal = href?.startsWith("http");
                return (
                  <React.Fragment key={item}>
                    {i > 0 && <span aria-hidden="true"> · </span>}
                    {href ? (
                      <Link
                        href={href}
                        className={styles.relatedLink}
                        {...(isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {item}
                      </Link>
                    ) : (
                      <span>{item}</span>
                    )}
                  </React.Fragment>
                );
              })}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
