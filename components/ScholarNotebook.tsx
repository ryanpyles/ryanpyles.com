import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { scholarNotes } from "@/content/scholarNotes";
import styles from "./ScholarNotebook.module.css";

export default function ScholarNotebook() {
  const preview = scholarNotes.slice(0, 5);

  return (
    <section className={styles.section} id="archive">
      <div className={styles.inner}>
        <Reveal>
          <header className={styles.header}>
            <span className={styles.kicker}>§ 01</span>
            <h2 className={styles.heading}>Scholar&rsquo;s Notebook</h2>
            <p className={styles.sub}>
              Thinking in progress. Fragments, observations, and structural curiosities —
              residue that feeds the fiction and the systems work.
            </p>
          </header>
        </Reveal>

        <div className={styles.grid}>
          {preview.map((note, i) => (
            <Reveal key={note.id} delay={i * 60}>
              <article className={styles.card}>
                <span className={styles.number}>{note.number}</span>
                <p className={styles.text}>{note.text}</p>
                <span className={styles.category}>{note.category}</span>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320}>
          <div className={styles.footer}>
            <Link href="/archive" className={styles.archiveLink}>
              Browse Archive →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
