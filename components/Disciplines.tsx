import React from "react";
import Reveal from "./Reveal";
import styles from "./Disciplines.module.css";

/**
 * The four-discipline band — the multidisciplinary proposition made visible
 * immediately under the hero. Software, AI, design, and language are stated
 * as one practice working across all four, rather than the site reading as a
 * single-track "narrative systems" shop. The archival 01–04 numbering and the
 * mono/serif pairing match the rest of the homepage.
 */
const disciplines = [
  {
    no: "01",
    name: "Engineering",
    body:
      "Full-stack systems in React, Next.js, and TypeScript — from architecture and data modeling through deployment.",
  },
  {
    no: "02",
    name: "Intelligence",
    body:
      "AI systems that reason over long-form context: narrative continuity, retrieval, and structured memory that holds across thousands of pages.",
  },
  {
    no: "03",
    name: "Design",
    body:
      "Editorial interfaces and design systems where typography, rhythm, and form carry as much meaning as the copy.",
  },
  {
    no: "04",
    name: "Language",
    body:
      "Multilingual architecture and applied linguistics — twelve languages in active study, built into the systems rather than bolted on.",
  },
];

export default function Disciplines() {
  return (
    <section className={styles.section} aria-label="Disciplines">
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.kicker}>Four instruments, one practice</p>
        </Reveal>
        <ol className={styles.grid}>
          {disciplines.map((d, i) => (
            <Reveal as="li" key={d.no} delay={80 + i * 90} className={styles.cell}>
              <span className={styles.no}>{d.no}</span>
              <h2 className={styles.name}>{d.name}</h2>
              <p className={styles.body}>{d.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
