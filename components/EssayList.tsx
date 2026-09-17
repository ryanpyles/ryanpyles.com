import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { articles } from "@/content/writing";
import { articleMinutes } from "@/content/writing/utils";
import styles from "./EssayList.module.css";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * The long-form engineering essays, listed under Systems.
 *
 * These used to be a top-level "Writing" section, which read as a blog
 * next to the fiction. They are technical write-ups of shipped work, so
 * they belong with the systems they describe. Their URLs are unchanged —
 * only where they are surfaced from has moved.
 */
export default function EssayList() {
  const published = articles.filter((a) => a.status === "published");
  if (published.length === 0) return null;

  return (
    <ol className={styles.list}>
      {published.map((a, i) => (
        <Reveal key={a.slug} as="li" delay={i * 80} className={styles.item}>
          <Link href={`/writing/${a.slug}`} className={styles.link}>
            <div className={styles.itemMeta}>
              <span className={styles.category}>{a.category}</span>
              <span className={styles.dot} aria-hidden="true">
                ·
              </span>
              <time dateTime={a.date}>{formatDate(a.date)}</time>
              <span className={styles.dot} aria-hidden="true">
                ·
              </span>
              <span>{articleMinutes(a)} min</span>
            </div>
            <h3 className={styles.itemTitle}>{a.title}</h3>
            <p className={styles.itemSub}>{a.subtitle}</p>
            <span className={styles.itemArrow} aria-hidden="true">
              Read →
            </span>
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}
