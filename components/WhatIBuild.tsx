import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { Ae } from "./Ae";
import styles from "./WhatIBuild.module.css";

export default function WhatIBuild() {
  return (
    <section className={styles.section} id="work" aria-label="For clients">
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.kicker}>
            Work with FORM<Ae />TRIX
          </p>
        </Reveal>
        <Reveal delay={80} slow>
          <h2 className={styles.heading}>For clients</h2>
        </Reveal>
        <Reveal delay={160}>
          <p className={styles.intro}>
            Work for clients runs through FORM<Ae />TRIX: sites, brand systems,
            publishing infrastructure, and AI tools scoped to a manuscript or a
            product.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <p className={styles.intro}>
            Continuity Atlas, Polytype, and Publish Architecture are studio
            tools, built for the imprint. Demos are linked from each case study.
            They are not client engagements.
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className={styles.cta}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Discuss a project →
            </Link>
            <a
              href="https://www.formaetrix.com"
              className={styles.ctaSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              FORM<Ae />TRIX studio →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
