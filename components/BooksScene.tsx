"use client";

import React from "react";
import Link from "next/link";
import ScrollScene, { mapRange, clamp01 } from "./ScrollScene";
import styles from "./BooksScene.module.css";

const books = [
  {
    slug: "terms-of-unbeing",
    vol: "I",
    genre: "Literary Horror · Identity",
    title: "Terms of Unbeing",
    tagline:
      "A lease he doesn't remember signing, in a building where identity is negotiable and every clause hides another beneath it.",
  },
  {
    slug: "declensions-of-dark-water",
    vol: "II",
    genre: "Folk Horror · Language",
    title: "Declensions of Dark Water",
    tagline: "A grammar in which syntax shapes reality. He converts from observer to custodian.",
  },
  {
    slug: "quiet-metric",
    vol: "III",
    genre: "Psychological · Literary Fiction",
    title: "The Quiet Metric",
    tagline:
      "A relationship built on being understood exactly — until attentiveness hardens into management, then something harder to name.",
  },
];

const forthcoming = [
  { title: "Liminal 6:17", slug: "liminal-617" },
  { title: "Babel Threshold: A Palimpsest of Tongues", slug: "babel-threshold" },
  { title: "Guestbook of the North Wind", slug: "guestbook-of-the-north-wind" },
];

const intro =
  "Six published novels under the Elian Voigt name, three more forthcoming — a shared formal universe held together not by plot but by recurring tensions. Systems that become belief. Languages that reshape their speakers. Grief treated as investigation.";

function Spine({ vol, title }: { vol: string; title: string }) {
  return (
    <div className={styles.spine}>
      <span className={styles.spineBand} />
      <span className={styles.spineTitle}>{title}</span>
      <span className={styles.spineVol}>{vol}</span>
    </div>
  );
}

function Forthcoming() {
  return (
    <div className={styles.outro}>
      <span className={styles.subLabel}>In development</span>
      <ul className={styles.chips}>
        {forthcoming.map((b) => (
          <li key={b.slug}>
            <Link href={`/books/${b.slug}`} className={styles.chip}>
              {b.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/books" className={styles.catalogue}>
        Complete catalogue →
      </Link>
    </div>
  );
}

function StaticView() {
  return (
    <div className={styles.staticScene}>
      <header className={styles.staticHeader}>
        <span className={styles.kicker}>Fiction</span>
        <h2 className={styles.wordmark}>Books</h2>
        <p className={styles.introSub}>{intro}</p>
      </header>

      <ul className={styles.staticList}>
        {books.map((b) => (
          <li key={b.slug} className={styles.staticItem}>
            <Spine vol={b.vol} title={b.title} />
            <Link href={`/books/${b.slug}`} className={styles.staticText}>
              <span className={styles.focusVol}>Vol. {b.vol}</span>
              <span className={styles.genre}>{b.genre}</span>
              <h3 className={styles.focusTitle}>{b.title}</h3>
              <p className={styles.focusTag}>{b.tagline}</p>
              <span className={styles.viewBook}>View book →</span>
            </Link>
          </li>
        ))}
      </ul>

      <Forthcoming />
    </div>
  );
}

export default function BooksScene() {
  return (
    <ScrollScene
      id="books"
      ariaLabel="Books — the fiction of Elian Voigt"
      heightVh={480}
      heightVhMobile={440}
      pinOnMobile
      className={styles.root}
      contentClassName={styles.sticky}
    >
      {(progress, isStatic) => {
        if (isStatic) return <StaticView />;

        const introOpacity = 1 - mapRange(progress, 0.05, 0.13);
        const outroIn = mapRange(progress, 0.82, 0.92);
        const span = (0.8 - 0.14) / books.length;
        const op = books.map((_, i) => {
          const center = 0.14 + (i + 0.5) * span;
          return clamp01(1 - Math.abs(progress - center) / (span * 0.72)) * (1 - outroIn);
        });
        let active = 0;
        op.forEach((o, i) => {
          if (o >= op[active]) active = i;
        });

        return (
          <div className={styles.scene}>
            <div className={styles.top}>
              <span className={styles.kicker}>Fiction</span>
              <span className={styles.wordmarkSmall}>Books</span>
            </div>

            <div className={styles.center}>
              <div
                className={styles.intro}
                style={{ opacity: introOpacity, pointerEvents: introOpacity > 0.5 ? "auto" : "none" }}
              >
                <h2 className={styles.introHeading}>Six novels, one formal universe.</h2>
                <p className={styles.introSub}>{intro}</p>
              </div>

              {/* Book stage */}
              <div className={styles.stage} style={{ opacity: 1 - introOpacity }}>
                <div className={styles.ghost} aria-hidden="true">
                  {books.map((b, i) => (
                    <span key={b.slug} className={styles.ghostNum} style={{ opacity: op[i] * 0.06 }}>
                      {b.vol}
                    </span>
                  ))}
                </div>

                <div className={styles.focus}>
                  {books.map((b, i) => (
                    <div
                      key={b.slug}
                      className={styles.focusItem}
                      style={{ opacity: op[i] }}
                      aria-hidden={op[i] < 0.5}
                    >
                      <span className={styles.focusVol}>Vol. {b.vol}</span>
                      <span className={styles.genre}>{b.genre}</span>
                      <h3 className={styles.focusTitle}>{b.title}</h3>
                      <p className={styles.focusTag}>{b.tagline}</p>
                      <Link href={`/books/${b.slug}`} className={styles.viewBook}>
                        View book →
                      </Link>
                    </div>
                  ))}
                </div>

                <div className={styles.visual}>
                  {books.map((b, i) => (
                    <div
                      key={b.slug}
                      className={styles.visualItem}
                      style={{ opacity: op[i], transform: `translateY(${(1 - op[i]) * 16}px)` }}
                      aria-hidden="true"
                    >
                      <Spine vol={b.vol} title={b.title} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Outro: forthcoming + catalogue */}
              <div
                className={styles.outroWrap}
                style={{ opacity: outroIn, pointerEvents: outroIn > 0.5 ? "auto" : "none" }}
              >
                <Forthcoming />
              </div>
            </div>

            <div className={styles.bottom}>
              <ul className={styles.shelf} aria-hidden="true">
                {books.map((b, i) => (
                  <li
                    key={b.slug}
                    className={styles.shelfSpine}
                    data-active={active === i && introOpacity < 0.5 && outroIn < 0.5}
                  />
                ))}
              </ul>
            </div>
          </div>
        );
      }}
    </ScrollScene>
  );
}
