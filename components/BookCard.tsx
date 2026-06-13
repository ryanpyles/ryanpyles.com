import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Book } from "@/content/books/types";
import styles from "./BookCard.module.css";

interface BookCardProps {
  book: Book;
  buyLabel?: string;
  byLabel?: string;
}

export default function BookCard({
  book,
  buyLabel = "View book",
  byLabel = "by",
}: BookCardProps) {
  return (
    <article className={[styles.card, styles[book.theme]].join(" ")}>
      <Link href={`/books/${book.slug}`} className={styles.coverLink} tabIndex={-1} aria-hidden>
        <div className={styles.coverWrap}>
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
                href={`mailto:ryan@ryanpyles.com?subject=Notify me: ${book.title}`}
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
