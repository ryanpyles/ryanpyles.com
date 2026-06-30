import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { Ae } from "./Ae";
import styles from "./HomepageFiction.module.css";

const featuredBooks = [
  {
    slug: "feast-of-the-broadcast-saints",
    title: "Feast of the Broadcast Saints",
    tagline:
      "A system learns to monetize miraculous healing through broadcast viewership.",
    genre: "Speculative · Literary Fiction",
  },
  {
    slug: "what-survives-is-proof",
    title: "What Survives Is Proof",
    tagline:
      "A doctor reconstructs her late husband's hidden life as a whistleblower, treating grief as an investigation.",
    genre: "Literary Fiction",
  },
  {
    slug: "declensions-of-dark-water",
    title: "Declensions of Dark Water",
    tagline:
      "A grammar in which syntax shapes reality. He converts from observer to custodian.",
    genre: "Folk Horror · Language",
  },
];

const forthcomingTitles = [
  { title: "Liminal 6:17", slug: "liminal-617" },
  {
    title: "Babel Threshold: A Palimpsest of Tongues",
    slug: "babel-threshold",
  },
  { title: "Guestbook of the North Wind", slug: "guestbook-of-the-north-wind" },
];

export default function HomepageFiction() {
  return (
    <section className={styles.section} id="books">
      <div className={styles.inner}>
        <header className={styles.header}>
          <Reveal><span className={styles.kicker}>Fiction</span></Reveal>
          <Reveal delay={80} slow><h2 className={styles.heading}>Books</h2></Reveal>
          <Reveal delay={200}>
            <p className={styles.intro}>
              Six published novels under the Elian Voigt name, with three more
              forthcoming. Literary fiction in a shared formal universe — not
              connected by plot, but by recurring structural tensions. Systems
              that become belief. Languages that reshape their speakers. Grief
              treated as investigation.
            </p>
          </Reveal>
        </header>

        {/* Published */}
        <div className={styles.published}>
          <Reveal><span className={styles.subLabel}>In print</span></Reveal>
          <div className={styles.grid}>
            {featuredBooks.map((book, i) => (
              <Reveal key={book.slug} delay={80 + i * 130}>
                <article className={styles.card}>
                  <Link href={`/books/${book.slug}`} className={styles.cardLink}>
                    <span className={styles.genre}>{book.genre}</span>
                    <h3 className={styles.title}>{book.title}</h3>
                    <p className={styles.tagline}>{book.tagline}</p>
                    <span className={styles.cardCta} aria-hidden="true">View book →</span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Forthcoming */}
        <Reveal delay={120}>
          <div className={styles.forthcoming}>
            <span className={styles.subLabel}>
              In development
            </span>
            <ul className={styles.forthcomingChips}>
              {forthcomingTitles.map((b) => (
                <li key={b.slug}>
                  <Link href={`/books/${b.slug}`} className={styles.forthcomingChip}>
                    {b.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className={styles.footer}>
            <Link href="/books" className={styles.allLink} aria-label="View the complete fiction catalogue">
              Complete catalogue →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
