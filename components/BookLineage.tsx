import React from "react";
import Link from "next/link";
import { getBookLineage } from "@/content/lineage";
import { getBookBySlug, type Book } from "@/content/books";
import { fieldNotes } from "@/content/fieldNotes";
import type { FieldNote } from "@/content/fieldNotes";
import styles from "./BookLineage.module.css";

/**
 * "This book touches" — surfaces a novel's thematic threads and its real
 * connections across the practice (field notes, companion novels, systems).
 */
export default function BookLineage({ slug }: { slug: string }) {
  const lineage = getBookLineage(slug);
  if (!lineage) return null;

  const notes = (lineage.noteSlugs ?? [])
    .map((s) => fieldNotes.find((n) => n.slug === s))
    .filter((n): n is FieldNote => Boolean(n));

  const companions = (lineage.companionSlugs ?? [])
    .map((s) => getBookBySlug(s))
    .filter((b): b is Book => Boolean(b));

  const systems = lineage.systems ?? [];
  const hasLinks = notes.length + companions.length + systems.length > 0;

  return (
    <section className={styles.root} aria-label="How this book connects">
      <div className={styles.inner}>
        <span className={styles.kicker}>This book touches</span>

        <ul className={styles.threads}>
          {lineage.threads.map((t) => (
            <li key={t} className={styles.thread}>
              {t}
            </li>
          ))}
        </ul>

        {hasLinks && (
          <div className={styles.links}>
            {systems.map((s) => (
              <Link key={s.slug} href={`/projects/${s.slug}`} className={styles.link}>
                <span className={styles.linkKind}>System</span>
                <span className={styles.linkLabel}>{s.label}</span>
                <span className={styles.linkArrow} aria-hidden="true">→</span>
              </Link>
            ))}
            {companions.map((b) => (
              <Link key={b.slug} href={`/books/${b.slug}`} className={styles.link}>
                <span className={styles.linkKind}>Novel</span>
                <span className={styles.linkLabel}>{b.title}</span>
                <span className={styles.linkArrow} aria-hidden="true">→</span>
              </Link>
            ))}
            {notes.map((n) => (
              <Link key={n.slug} href={`/field-notes/${n.slug}`} className={styles.link}>
                <span className={styles.linkKind}>Note</span>
                <span className={styles.linkLabel}>{n.title}</span>
                <span className={styles.linkArrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
