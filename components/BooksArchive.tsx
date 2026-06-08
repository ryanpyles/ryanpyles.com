import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import styles from "./BooksArchive.module.css";

interface ArchiveBook {
  id: string;
  accession: string;
  title: string;
  author: string;
  tagline: string;
  artifacts: string[];
  status: "Published" | "In Development" | "Ongoing";
  slug?: string;
}

const books: ArchiveBook[] = [
  {
    id: "gideons-inferno",
    accession: "001",
    title: "Gideon's Inferno",
    author: "Elian Voigt",
    tagline: "An infernal lease agreement disguised as a novel.",
    artifacts: ["Research", "Annotations", "Maps", "Fragments", "Marginalia"],
    status: "Published",
    slug: "/books/gideons-inferno",
  },
  {
    id: "terms-of-unbeing",
    accession: "002",
    title: "Terms of Unbeing",
    author: "Elian Voigt",
    tagline: "A legal dissolution of reality.",
    artifacts: ["Research", "Annotations", "Fragments", "Appendices"],
    status: "Published",
    slug: "/books/terms-of-unbeing",
  },
  {
    id: "declensions-of-dark-water",
    accession: "003",
    title: "Declensions of Dark Water",
    author: "Elian Voigt",
    tagline: "Language, memory, and disappearance.",
    artifacts: ["Research", "Fragments", "Marginalia"],
    status: "Published",
  },
  {
    id: "feast-of-the-broadcast-saints",
    accession: "004",
    title: "Feast of the Broadcast Saints",
    author: "Elian Voigt",
    tagline: "Signal, ritual, transmission.",
    artifacts: ["Research", "Annotations", "Fragments"],
    status: "Published",
  },
  {
    id: "liminal-617",
    accession: "005",
    title: "Liminal 6:17",
    author: "Elian Voigt",
    tagline: "Three people die at the same moment. Nobody realizes it happened.",
    artifacts: ["Research", "Annotations", "Maps", "Fragments"],
    status: "Published",
  },
  {
    id: "babel-threshold",
    accession: "006",
    title: "Babel Threshold",
    author: "Elian Voigt",
    tagline: "An experimental novel about language, identity, and the cost of translation.",
    artifacts: ["Research", "Notes", "Fragments"],
    status: "In Development",
  },
];

export default function BooksArchive() {
  return (
    <section className={styles.section} id="books">
      <div className={styles.inner}>
        <Reveal>
          <header className={styles.header}>
            <span className={styles.kicker}>§ 05</span>
            <div className={styles.headingRow}>
              <h2 className={styles.heading}>Books</h2>
              <span className={styles.subLabel}>Fiction, essays, fragments, and ongoing investigations.</span>
            </div>
          </header>
        </Reveal>

        <div className={styles.catalog}>
          {books.map((book, i) => (
            <Reveal key={book.id} delay={i * 60}>
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
                    <span className={styles.status} data-status={book.status.toLowerCase().replace(/ /g, "-")}>
                      {book.status}
                    </span>
                  </div>
                  <p className={styles.tagline}>{book.tagline}</p>
                  <div className={styles.meta}>
                    <span className={styles.author}>{book.author}</span>
                    <span className={styles.separator} aria-hidden="true">·</span>
                    <div className={styles.artifacts} aria-label="Archival materials">
                      {book.artifacts.map((a, j) => (
                        <React.Fragment key={a}>
                          <span className={styles.artifact}>{a}</span>
                          {j < book.artifacts.length - 1 && (
                            <span className={styles.artifactSep} aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className={styles.footer}>
            <Link href="/books" className={styles.allLink}>
              Complete catalog →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
