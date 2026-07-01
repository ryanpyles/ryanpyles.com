import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import BookLineage from "@/components/BookLineage";
import { getBookBySlug, getAllSlugs } from "@/content/books";
import { buildBookMetadata, buildBookJsonLd } from "@/lib/metadata";
import styles from "./page.module.css";

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const book = getBookBySlug(params.slug);
  if (!book) return {};
  return buildBookMetadata(book);
}

export default function BookPage({ params }: Params) {
  const book = getBookBySlug(params.slug);
  if (!book) notFound();

  const jsonLd = buildBookJsonLd(book);

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Section>
        <div className={styles.back}>
          <Link href="/books" className={styles.backLink}>
            ← All books
          </Link>
        </div>

        <article className={[styles.article, styles["ryan"]].join(" ")}>
          <div className={styles.coverCol}>
            <div className={styles.coverWrap}>
              {book.coverImage ? (
                <Image
                  src={book.coverImage}
                  alt={`${book.title} — cover`}
                  fill
                  sizes="(max-width: 640px) 80vw, 360px"
                  className={styles.cover}
                  priority
                />
              ) : (
                <div className={styles.coverPlaceholder} aria-hidden>
                  <span className={styles.coverPlaceholderLabel}>Cover forthcoming</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.textCol}>
            <header className={styles.header}>
              <h1 className={styles.title}>{book.title}</h1>
              <p className={styles.author}>
                by <span>{book.author}</span>
              </p>
              {book.status === "forthcoming" ? (
                <p className={styles.date}>Forthcoming</p>
              ) : book.publishDate ? (
                <p className={styles.date}>
                  <time dateTime={book.publishDate}>
                    {new Date(book.publishDate).getFullYear()}
                  </time>
                </p>
              ) : null}
            </header>

            <div className={styles.description}>
              {book.fullDescription.split("\n\n").map((para, i) => (
                <p key={i}>{para.replace(/\*/g, "")}</p>
              ))}
            </div>

            <div className={styles.actions}>
              {book.status === "forthcoming" ? (
                <p className={styles.forthcomingNote}>
                  In development — not yet available
                </p>
              ) : book.purchaseUrl ? (
                <a
                  href={book.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaPrimary}
                >
                  Buy now →
                </a>
              ) : (
                <a
                  href="/contact"
                  className={styles.ctaInquire}
                >
                  Inquire about this title →
                </a>
              )}
              <Link href="/books" className={styles.ctaSecondary}>
                Browse all titles
              </Link>
            </div>

            {book.isbn && (
              <p className={styles.isbn}>ISBN: {book.isbn}</p>
            )}

            {book.amazon?.blurbHTML && (
              <details className={styles.blurbDetails}>
                <summary className={styles.blurbSummary}>Publisher description</summary>
                <div
                  className={styles.blurbContent}
                  dangerouslySetInnerHTML={{ __html: book.amazon.blurbHTML }}
                />
              </details>
            )}
          </div>
        </article>
      </Section>

      <BookLineage slug={book.slug} />
    </SiteLayout>
  );
}
