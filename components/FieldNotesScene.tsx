"use client";

import React from "react";
import Link from "next/link";
import ScrollScene, { mapRange } from "./ScrollScene";
import { fieldNotes } from "@/content/fieldNotes";
import { readingMinutes } from "@/content/fieldNotes/utils";
import styles from "./FieldNotesScene.module.css";

const notes = fieldNotes.slice(0, 4);

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

const intro =
  "Short fragments written close to the moment — observations, structural curiosities, and language notes before they settle into something more considered.";

function NoteCard({
  note,
  interactive,
}: {
  note: (typeof notes)[number];
  interactive?: boolean;
}) {
  return (
    <article className={styles.card}>
      <span className={styles.cardTab}>{note.category}</span>
      <div className={styles.cardMeta}>
        <time dateTime={note.date}>{formatDate(note.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{readingMinutes(note)} min</span>
      </div>
      <h3 className={styles.cardTitle}>{note.title}</h3>
      <p className={styles.cardExcerpt}>{note.excerpt}</p>
      {interactive && (
        <Link href={`/field-notes/${note.slug}`} className={styles.cardLink}>
          Read the note →
        </Link>
      )}
    </article>
  );
}

function StaticView() {
  return (
    <div className={styles.staticScene}>
      <header className={styles.staticHeader}>
        <span className={styles.kicker}>Notes</span>
        <h2 className={styles.wordmark}>Field Notes</h2>
        <p className={styles.introSub}>{intro}</p>
      </header>
      <ul className={styles.staticList}>
        {notes.map((note) => (
          <li key={note.slug}>
            <Link href={`/field-notes/${note.slug}`} className={styles.staticCardLink}>
              <NoteCard note={note} />
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/field-notes" className={styles.archive}>
        Notes archive →
      </Link>
    </div>
  );
}

export default function FieldNotesScene() {
  return (
    <ScrollScene
      id="field-notes"
      ariaLabel="Field Notes"
      heightVh={460}
      heightVhMobile={420}
      pinOnMobile
      className={styles.root}
      contentClassName={styles.sticky}
    >
      {(progress, isStatic) => {
        if (isStatic) return <StaticView />;

        const introOpacity = 1 - mapRange(progress, 0.05, 0.13);
        const step = (0.92 - 0.14) / notes.length;
        const cardIn = notes.map((_, i) =>
          mapRange(progress, 0.14 + i * step, 0.14 + i * step + step * 0.66)
        );
        const revealed = cardIn.filter((c) => c > 0.5).length;
        const activeIndex = Math.max(0, revealed - 1);

        return (
          <div className={styles.scene}>
            <div className={styles.top}>
              <span className={styles.kicker}>Notes</span>
              <span className={styles.wordmarkSmall}>Field Notes</span>
            </div>

            <div className={styles.center}>
              <div
                className={styles.intro}
                style={{ opacity: introOpacity, pointerEvents: introOpacity > 0.5 ? "auto" : "none" }}
              >
                <h2 className={styles.introHeading}>Notes from close to the moment.</h2>
                <p className={styles.introSub}>{intro}</p>
              </div>

              {/* Card pile */}
              <div className={styles.pile} style={{ opacity: 1 - introOpacity }}>
                {notes.map((note, i) => {
                  const entrance = cardIn[i];
                  const offset = Math.max(0, activeIndex - i);
                  const isTop = i === activeIndex;
                  const rot = -offset * 3.2 + (isTop ? 0 : 0);
                  const tx = offset * 8;
                  const ty = offset * -10 + (1 - entrance) * 44;
                  const sc = (1 - offset * 0.04) * (0.94 + entrance * 0.06);
                  return (
                    <div
                      key={note.slug}
                      className={styles.pileItem}
                      style={{
                        opacity: entrance * (isTop ? 1 : 0.5),
                        transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${sc})`,
                        zIndex: i + 1,
                      }}
                      aria-hidden={!isTop}
                    >
                      <NoteCard note={note} interactive={isTop && entrance > 0.6} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.bottom}>
              <span className={styles.counter}>
                {String(Math.min(revealed, notes.length)).padStart(2, "0")} /{" "}
                {String(notes.length).padStart(2, "0")}
              </span>
              <Link href="/field-notes" className={styles.archive}>
                Notes archive →
              </Link>
            </div>
          </div>
        );
      }}
    </ScrollScene>
  );
}
