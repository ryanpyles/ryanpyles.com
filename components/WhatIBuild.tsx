import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { Ae } from "./Ae";
import styles from "./WhatIBuild.module.css";

const outcomes = [
  "Built an AI-powered narrative-continuity platform for long-form fiction.",
  "Designed publishing infrastructure supporting a growing catalogue of novels.",
  "Developed internal tools that replace repetitive editorial workflows.",
  "Shipped React / TypeScript products from concept through deployment.",
];

const process = [
  "Discovery",
  "Architecture",
  "Prototype",
  "AI Integration",
  "Testing",
  "Launch",
];

export default function WhatIBuild() {
  return (
    <section className={styles.section} id="work" aria-label="What I build for clients">
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.kicker}>
            Work with FORM<Ae />TRIX
          </p>
        </Reveal>
        <Reveal delay={80} slow>
          <h2 className={styles.heading}>What I build for clients</h2>
        </Reveal>
        <Reveal delay={160}>
          <p className={styles.intro}>
            Design and engineering for publishers, authors, and teams where
            language and systems are inseparable from function — from AI
            narrative tooling to editorial web architecture and the publishing
            infrastructure underneath it.
          </p>
        </Reveal>

        {/* Selected outcomes */}
        <div className={styles.outcomes}>
          <Reveal delay={120}>
            <span className={styles.subLabel}>Selected outcomes</span>
          </Reveal>
          <ul className={styles.outcomeList}>
            {outcomes.map((o, i) => (
              <Reveal key={o} delay={160 + i * 80}>
                <li className={styles.outcome}>
                  <span className={styles.outcomeMark} aria-hidden="true" />
                  {o}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Process */}
        <Reveal delay={140}>
          <div className={styles.processBlock}>
            <span className={styles.subLabel}>How the work moves</span>
            <ol className={styles.process}>
              {process.map((step, i) => (
                <li key={step} className={styles.step}>
                  <span className={styles.stepNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stepName}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={200}>
          <div className={styles.cta}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Discuss your project →
            </Link>
            <Link href="/projects" className={styles.ctaSecondary}>
              View engineering work →
            </Link>
            <a
              href="https://www.formaetrix.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              See the studio →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
