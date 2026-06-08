import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import styles from "./ContinuityAtlasFeatured.module.css";

const features = [
  "Story Memory",
  "Character Drift",
  "Voice Fingerprint",
  "Rewrite Assist",
  "Continuity Graph",
  "AI Integration",
];

export default function ContinuityAtlasFeatured() {
  return (
    <section className={styles.section} id="continuity-atlas">
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.header}>
            <span className={styles.kicker}>§ 05</span>
            <div className={styles.tag}>Narrative Intelligence System</div>
          </div>
        </Reveal>

        <div className={styles.layout}>
          <Reveal delay={60}>
            <div className={styles.main}>
              <h2 className={styles.heading}>Continuity Atlas</h2>
              <p className={styles.description}>
                A visual story-memory architecture for authors working with AI.
                Characters are modeled as evolving states rather than static biographies.
                Voice is measured as a fingerprint, not described as a style guide.
                Designed for novels, game narratives, television writers&rsquo; rooms,
                and any story larger than human working memory.
              </p>
              <div className={styles.meta}>
                <span className={styles.year}>2025</span>
                <span className={styles.divider} aria-hidden="true">/</span>
                <span className={styles.stack}>React · Framer Motion · Narrative Design</span>
              </div>
              <div className={styles.cta}>
                <Link href="/projects/continuity-atlas" className={styles.ctaLink}>
                  View case study →
                </Link>
                <Link href="/projects/continuity-atlas#prototype" className={styles.ctaSecondary}>
                  Open prototype →
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <aside className={styles.sidebar}>
              <p className={styles.sidebarLabel}>System modules</p>
              <ul className={styles.features}>
                {features.map((f, i) => (
                  <li key={f} className={styles.feature}>
                    <span className={styles.featureIndex}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.featureName}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.context}>
                <p className={styles.contextNote}>
                  Built on the <em>Liminal 6:17</em> manuscript.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
