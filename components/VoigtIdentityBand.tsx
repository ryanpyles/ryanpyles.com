import React from "react";
import Link from "next/link";
import { Ae } from "./Ae";
import Reveal from "./Reveal";
import styles from "./VoigtIdentityBand.module.css";

/**
 * The short identity module on the homepage. The full deep-scroll case
 * study and essay live at /voigt-project — this keeps the homepage focused
 * on the engineering evidence while still stating the split clearly.
 */
export default function VoigtIdentityBand() {
  return (
    <section className={styles.band} id="voigt" aria-label="The Voigt Project">
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.kicker}>The Voigt Project</p>
        </Reveal>
        <Reveal delay={80} slow>
          <h2 className={styles.thesis}>One maker, two public identities.</h2>
        </Reveal>

        <Reveal delay={140}>
          <div className={styles.couplet}>
            <div className={styles.side}>
              <span className={styles.name}>Ryan Pyles</span>
              <span className={styles.verb}>builds systems.</span>
            </div>
            <span className={styles.divider} aria-hidden="true" />
            <div className={styles.side}>
              <span className={styles.name}>Elian Voigt</span>
              <span className={`${styles.verb} ${styles.verbSerif}`}>
                tests them.
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className={styles.aside}>
            The division isn&rsquo;t marketing — it&rsquo;s methodology.
            Software rewards precision; fiction rewards omission. Kept apart,
            each identity keeps the other from becoming predictable.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className={styles.links}>
            <Link href="/voigt-project" className={styles.primary}>
              The full case study →
            </Link>
            <a
              href="https://www.elianvoigt.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              Elian Voigt →
            </a>
            <a
              href="https://www.formaetrix.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              FORM<Ae />TRIX →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
