import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import styles from "./StartHere.module.css";

const paths = [
  {
    id: "fiction",
    label: "The Fiction",
    desc: "Nine novels under the name Elian Voigt. Literary fiction that treats systems — belief, language, grief, attention — as structural engines, not metaphors. Start with Feast of the Broadcast Saints.",
    cta: "Read the books",
    href: "/books",
    external: false,
  },
  {
    id: "systems",
    label: "The Systems",
    desc: "Software built because the fiction required it. The Continuity Atlas is a story-memory engine. The dual-domain architecture is an identity system. Narrative infrastructure, not portfolio pieces.",
    cta: "Explore the projects",
    href: "/projects",
    external: false,
  },
  {
    id: "languages",
    label: "The Languages",
    desc: "Twelve languages under active study, charted by orbit and proficiency. A Scholar's Notebook of structural observations. The Language Orrery below is where to begin.",
    cta: "Enter the Orrery",
    href: "#orrery",
    external: false,
  },
] as const;

export default function StartHere() {
  return (
    <section className={styles.section} id="start-here" aria-label="Where to begin">
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.intro}>
            New here? The work spans fiction, language research, and narrative
            software. Begin with whichever axis pulls first.
          </p>
        </Reveal>

        <div className={styles.paths}>
          {paths.map((path, i) => (
            <Reveal key={path.id} delay={i * 80}>
              <article className={styles.path}>
                <h3 className={styles.pathLabel}>{path.label}</h3>
                <p className={styles.pathDesc}>{path.desc}</p>
                <Link href={path.href} className={styles.pathLink}>
                  → {path.cta}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
