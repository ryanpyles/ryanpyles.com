import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Reveal from "./Reveal";
import styles from "./ContinuityAtlasFeatured.module.css";

const StoryGraph = dynamic(() => import("./StoryGraph"), { ssr: false });

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
        <div className={styles.header}>
          <Reveal><span className={styles.kicker}>§ 05</span></Reveal>
          <Reveal delay={80}><div className={styles.tag}>Narrative Intelligence System</div></Reveal>
        </div>

        <div className={styles.layout}>
          <div className={styles.main}>
            <Reveal delay={80} slow><h2 className={styles.heading}>Continuity Atlas</h2></Reveal>
            <Reveal delay={200}>
              <p className={styles.description}>
                A visual story-memory architecture for authors working with AI.
                Characters are modeled as evolving states rather than static biographies.
                Voice is measured as a fingerprint, not described as a style guide.
                Designed for novels, game narratives, television writers&rsquo; rooms,
                and any story larger than human working memory.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className={styles.meta}>
                <span className={styles.year}>2025</span>
                <span className={styles.divider} aria-hidden="true">/</span>
                <span className={styles.stack}>React · Framer Motion · Narrative Design</span>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className={styles.cta}>
                <Link href="/projects/continuity-atlas" className={styles.ctaLink} aria-label="View the Continuity Atlas case study">
                  View case study →
                </Link>
                <Link href="/projects/continuity-atlas#prototype" className={styles.ctaSecondary} aria-label="Open the Continuity Atlas prototype">
                  Open prototype →
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <aside className={styles.sidebar}>
              <StoryGraph />
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
                  Built on the{" "}
                  <Link href="/books/liminal-617" className={styles.contextLink}>
                    <em>Liminal 6:17</em>
                  </Link>{" "}
                  manuscript.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
