import React from "react";
import Reveal from "./Reveal";
import { Ae } from "./Ae";
import styles from "./IdentityBridge.module.css";

export default function IdentityBridge() {
  return (
    <section className={styles.section} aria-label="About this work">
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.prose}>
            Ryan Pyles writes and builds. The fiction appears under the name{" "}
            <a
              href="https://www.formaetrix.com/imprint"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Elian Voigt
            </a>{" "}
            — a literary imprint, not a concealment.{" "}
            <a
              href="https://www.formaetrix.com"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              FORM<Ae />TRIX
            </a>{" "}
            is the studio infrastructure that holds the design, the systems work,
            and the publishing together. Three angles on one project: what happens
            when language, narrative, and formal systems start behaving like each other.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.triad} aria-label="The three identities">
            <div className={styles.role}>
              <span className={styles.roleName}>Ryan Pyles</span>
              <span className={styles.roleDesc}>Engineer · Linguist</span>
              <span className={styles.roleVerb}>builds systems</span>
            </div>
            <span className={styles.divider} aria-hidden="true">—</span>
            <div className={styles.role}>
              <span className={styles.roleName}>Elian Voigt</span>
              <span className={styles.roleDesc}>Author</span>
              <span className={styles.roleVerb}>dismantles them</span>
            </div>
            <span className={styles.divider} aria-hidden="true">—</span>
            <div className={styles.role}>
              <a
                href="https://www.formaetrix.com"
                className={styles.roleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.roleName}>FORM<Ae />TRIX</span>
                <span className={styles.roleDesc}>Studio · Imprint</span>
                <span className={styles.roleVerb}>publishes the work</span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <a href="#voigt" className={styles.deepLink}>
            The Voigt Project — on building a literary identity →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
