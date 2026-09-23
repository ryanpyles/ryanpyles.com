"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Book } from "@/content/books/types";
import styles from "./BookCard.module.css";

interface BookCardProps {
  book: Book;
  buyLabel?: string;
  byLabel?: string;
}

/** Max tilt in degrees at the cover's edges. Kept small so it reads as weight. */
const MAX_TILT = 7;

export default function BookCard({
  book,
  buyLabel = "View book",
  byLabel = "by",
}: BookCardProps) {
  const coverRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  React.useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  /**
   * Cover follows the cursor in 3D — like tilting a book in the hand to catch
   * the light. Written straight to CSS vars (no state) so it stays smooth.
   */
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = coverRef.current;
    if (!el || reduced.current) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0…1
    const py = (e.clientY - r.top) / r.height; // 0…1
    el.style.setProperty("--ry", `${(px - 0.5) * 2 * MAX_TILT}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 2 * MAX_TILT}deg`);
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--lit", "1");
  };

  const onLeave = () => {
    const el = coverRef.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--lit", "0");
  };

  return (
    <article className={[styles.card, styles[book.theme]].join(" ")}>
      <Link href={`/books/${book.slug}`} className={styles.coverLink} tabIndex={-1} aria-hidden>
        <div
          ref={coverRef}
          className={styles.coverWrap}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={`${book.title} — cover`}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 280px"
              className={styles.cover}
              priority={false}
            />
          ) : (
            <div className={styles.coverPlaceholder} aria-hidden>
              <span className={styles.coverPlaceholderLabel}>Forthcoming</span>
            </div>
          )}
          <span className={styles.sheen} aria-hidden="true" />
        </div>
      </Link>

      <div className={styles.body}>
        <header>
          <h3 className={styles.title}>
            <Link href={`/books/${book.slug}`}>{book.title}</Link>
          </h3>
          <p className={styles.author}>
            {byLabel} <span>{book.author}</span>
          </p>
        </header>

        <p className={styles.description}>{book.description}</p>

        <div className={styles.actions}>
          {book.status === "forthcoming" ? (
            <>
              <Link href={`/books/${book.slug}`} className={styles.ctaForthcoming}>
                Forthcoming
              </Link>
              <a
                href={`mailto:me@ryanpyles.com?subject=Notify me: ${book.title}`}
                className={styles.ctaNotify}
              >
                Get notified →
              </a>
            </>
          ) : (
            <Link href={`/books/${book.slug}`} className={styles.cta}>
              {buyLabel}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
