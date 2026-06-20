import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import styles from "./StartHere.module.css";

const paths = [
  {
    id: "fiction",
    label: "Read the Fiction",
    desc: "Nine novels published under the name Elian Voigt. Literary fiction that treats formal systems — belief, language, grief, measurement — as structural engines, not metaphors. Begin with Feast of the Broadcast Saints.",
    cta: "ElianVoigt.com",
    href: "https://www.elianvoigt.com",
    external: true,
  },
  {
    id: "studio",
    label: "Hire the Studio",
    desc: "FORMÆTRIX takes on selected web development and brand design work for publishers, authors, and organizations where language and form are inseparable from function. Engagements are scoped, not retainer-based.",
    cta: "Formaetrix.com",
    href: "https://www.formaetrix.com",
    external: true,
  },
  {
    id: "explore",
    label: "Explore the Work",
    desc: "Field notes on language, writing, and systems. Software built because the fiction required it. Twelve languages under active study. A biography that refuses to fully separate the engineer from the author.",
    cta: "About Ryan",
    href: "/about",
    external: false,
  },
] as const;

export default function StartHere() {
  return (
    <section className={styles.section} id="start-here" aria-label="Three primary pathways">
      <div className={styles.inner}>
        <Reveal slow>
          <p className={styles.intro}>
            Three bodies of work. One origin point. Begin with whichever
            axis pulls first.
          </p>
        </Reveal>

        <div className={styles.paths}>
          {paths.map((path, i) => (
            <Reveal key={path.id} delay={120 + i * 160}>
              <article className={styles.path}>
                <h3 className={styles.pathLabel}>{path.label}</h3>
                <p className={styles.pathDesc}>{path.desc}</p>
                {path.external ? (
                  <a
                    href={path.href}
                    className={styles.pathLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    → {path.cta}
                  </a>
                ) : (
                  <Link href={path.href} className={styles.pathLink}>
                    → {path.cta}
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
