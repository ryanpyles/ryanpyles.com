import React from "react";
import Reveal from "./Reveal";
import { Ae } from "./Ae";
import styles from "./IdentityBridge.module.css";

export default function IdentityBridge() {
  return (
    <section className={styles.section} aria-label="About this work">
      <div className={styles.inner}>
        <Reveal slow>
          <p className={styles.prose}>
            Ryan Pyles writes and builds. The fiction appears under the name{" "}
            <a href="https://www.formaetrix.com/imprint" className={styles.link} target="_blank" rel="noopener noreferrer">
              Elian Voigt
            </a>{" "}
            — a literary imprint, not a concealment.
          </p>
        </Reveal>

        <Reveal delay={200} slow>
          <p className={styles.prose}>
            <a href="https://www.formaetrix.com" className={styles.link} target="_blank" rel="noopener noreferrer">
              FORM<Ae />TRIX
            </a>{" "}
            is the studio infrastructure that holds the design, the systems work,
            and the publishing together. Three angles on one project: what happens
            when language, narrative, and formal systems start behaving like each other.
          </p>
        </Reveal>

        <Reveal delay={380}>
          <a href="#voigt" className={styles.deepLink}>
            The Voigt Project — on building a literary identity →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
