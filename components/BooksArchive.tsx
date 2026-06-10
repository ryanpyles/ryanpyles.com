import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { Ae } from "./Ae";
import styles from "./BooksArchive.module.css";

interface ArchiveBook {
  id: string;
  accession: string;
  title: string;
  author: string;
  tagline: string;
  artifacts: string[];
  status: "Published" | "Forthcoming";
  slug?: string;
  crossRef?: { label: string; href: string };
}

const books: ArchiveBook[] = [
  {
    id: "feast-of-the-broadcast-saints",
    accession: "I",
    title: "Feast of the Broadcast Saints",
    author: "Elian Voigt",
    tagline: "A system learns to monetize miraculous healing through broadcast viewership.",
    artifacts: ["Speculative", "Literary Fiction"],
    status: "Published",
    slug: "/books/feast-of-the-broadcast-saints",
  },
  {
    id: "what-survives-is-proof",
    accession: "II",
    title: "What Survives Is Proof",
    author: "Elian Voigt",
    tagline: "A doctor reconstructs her late husband's hidden life as a whistleblower, treating grief as an investigation.",
    artifacts: ["Literary Fiction", "Grief as Investigation"],
    status: "Published",
    slug: "/books/what-survives-is-proof",
  },
  {
    id: "declensions-of-dark-water",
    accession: "III",
    title: "Declensions of Dark Water",
    author: "Elian Voigt",
    tagline: "A grammar in which syntax shapes reality. He converts from observer to custodian.",
    artifacts: ["Folk Horror", "Language", "Sea"],
    status: "Published",
    slug: "/books/declensions-of-dark-water",
  },
  {
    id: "terms-of-unbeing",
    accession: "IV",
    title: "Terms of Unbeing",
    author: "Elian Voigt",
    tagline: "Every comfort carries a clause — for the ones who read the fine print and the ones who didn't.",
    artifacts: ["Faust Luxury Residences", "Literary Fiction"],
    status: "Published",
    slug: "/books/terms-of-unbeing",
  },
  {
    id: "summer-of-the-glass-bees",
    accession: "V",
    title: "Summer of the Glass Bees",
    author: "Elian Voigt",
    tagline: "An archive-based narrative interrupted by something that should not be in the record.",
    artifacts: ["Archive Narrative", "Surreal Intrusion"],
    status: "Published",
    slug: "/books/summer-of-the-glass-bees",
  },
  {
    id: "quiet-metric",
    accession: "VI",
    title: "The Quiet Metric",
    author: "Elian Voigt",
    tagline: "Literary fiction.",
    artifacts: ["Literary Fiction"],
    status: "Published",
    slug: "/books/quiet-metric",
  },
  {
    id: "liminal-617",
    accession: "·",
    title: "Liminal 6:17",
    author: "Elian Voigt",
    tagline: "A recursive, ergodic novel of consent, systems, and care.",
    artifacts: ["Experimental", "Multi-POV", "Forthcoming"],
    status: "Forthcoming",
    slug: "/books/liminal-617",
    crossRef: { label: "See Continuity Atlas →", href: "/projects/continuity-atlas" },
  },
  {
    id: "babel-threshold",
    accession: "·",
    title: "Babel Threshold: A Palimpsest of Tongues",
    author: "Elian Voigt",
    tagline: "More than a dozen languages. One human cost.",
    artifacts: ["Language", "Memory", "Grief", "Forthcoming"],
    status: "Forthcoming",
    slug: "/books/babel-threshold",
  },
  {
    id: "guestbook-of-the-north-wind",
    accession: "·",
    title: "Guestbook of the North Wind",
    author: "Elian Voigt",
    tagline: "A gothic reckoning structured as a ledger of grief, from the Brynjavík milieu.",
    artifacts: ["Icelandic Gothic", "Grief-as-Ledger", "Forthcoming"],
    status: "Forthcoming",
    slug: "/books/guestbook-of-the-north-wind",
  },
];

export default function BooksArchive() {
  return (
    <section className={styles.section} id="books">
      <div className={styles.inner}>
        <Reveal>
          <header className={styles.header}>
            <span className={styles.kicker}>§ 06</span>
            <div className={styles.headingRow}>
              <h2 className={styles.heading}>Books</h2>
              <span className={styles.subLabel}>Fiction published under the FORM<Ae />TRIX imprint.</span>
            </div>
          </header>
        </Reveal>

        <div className={styles.catalog}>
          {books.map((book, i) => (
            <Reveal key={book.id} delay={i * 50}>
              <article className={styles.entry}>
                <div className={styles.accessionCol}>
                  <span className={styles.accession}>{book.accession}</span>
                </div>
                <div className={styles.contentCol}>
                  <div className={styles.titleRow}>
                    {book.slug ? (
                      <Link href={book.slug} className={styles.titleLink}>
                        <h3 className={styles.title}>{book.title}</h3>
                      </Link>
                    ) : (
                      <h3 className={styles.title}>{book.title}</h3>
                    )}
                    <span
                      className={styles.status}
                      data-status={book.status.toLowerCase()}
                    >
                      {book.status}
                    </span>
                  </div>
                  <p className={styles.tagline}>{book.tagline}</p>
                  <div className={styles.meta}>
                    <span className={styles.author}>{book.author}</span>
                    <span className={styles.separator} aria-hidden="true">·</span>
                    <div className={styles.artifacts} aria-label="Genre">
                      {book.artifacts.map((a, j) => (
                        <React.Fragment key={a}>
                          <span className={styles.artifact}>{a}</span>
                          {j < book.artifacts.length - 1 && (
                            <span className={styles.artifactSep} aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    {book.crossRef && (
                      <Link href={book.crossRef.href} className={styles.crossRef}>
                        {book.crossRef.label}
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={480}>
          <div className={styles.footer}>
            <Link href="/books" className={styles.allLink}>
              Complete catalogue →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
