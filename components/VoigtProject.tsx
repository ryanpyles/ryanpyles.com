import React from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { Ae, withAe } from "./Ae";
import VoigtDuel from "./VoigtDuel";
import styles from "./VoigtProject.module.css";

const dimensions = [
  {
    id: "naming",
    label: "Naming",
    note: "The construction of Elian Voigt as a literary identity distinct from the engineer who built it.",
  },
  {
    id: "typography",
    label: "Typography",
    note: "Custom type systems for FORMÆTRIX — reading environments designed to slow the eye down.",
  },
  {
    id: "publishing",
    label: "Publishing Strategy",
    note: "FORMÆTRIX as infrastructure, not imprint. Catalog logic over catalog sales.",
  },
  {
    id: "book-design",
    label: "Book Design",
    note: "Object first. Each book is designed before it is written. Cover as constraint.",
  },
  {
    id: "worldbuilding",
    label: "Worldbuilding",
    note: "A shared universe across titles — not by plot, but by recurring structural problems.",
  },
  {
    id: "authorial-voice",
    label: "Authorial Voice",
    note: "What Voigt sounds like versus what Pyles writes. Convergence as a risk, not a goal.",
  },
];

export default function VoigtProject() {
  return (
    <section className={styles.section} id="voigt">
      <div className={styles.inner}>
        <Reveal>
          <header className={styles.header}>
            <span className={styles.kicker}>§ 04</span>
            <div className={styles.headingRow}>
              <h2 className={styles.heading}>The Voigt Project</h2>
              <span className={styles.subLabel}>Building a literary identity.</span>
            </div>
          </header>
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.portrait}>
            <Image
              src="/images/ryan-pyles-elian-voigt.png"
              alt="Ryan Pyles and Elian Voigt — a split portrait: the engineer and the author"
              width={500}
              height={700}
              className={styles.portraitImg}
              priority
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <VoigtDuel />
        </Reveal>

        <Reveal delay={120}>
          <div className={styles.split}>
            <div className={styles.splitCol}>
              <p className={styles.splitRole}>Ryan Pyles</p>
              <p className={styles.splitVerb}>builds systems.</p>
            </div>
            <div className={styles.splitDivider} aria-hidden="true">—</div>
            <div className={styles.splitCol}>
              <p className={styles.splitRole}>Elian Voigt</p>
              <p className={styles.splitVerb}>dismantles them.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className={styles.description}>
            One writes software. The other writes novels about what happens when systems
            become indistinguishable from belief. This section documents the deliberate
            construction of a literary identity — not biography, but design.
          </p>
        </Reveal>

        <div className={styles.dimensions}>
          {dimensions.map((d, i) => (
            <Reveal key={d.id} delay={i * 50}>
              <div className={styles.dimension}>
                <span className={styles.dimensionNumber}>0{i + 1}</span>
                <div className={styles.dimensionContent}>
                  <h3 className={styles.dimensionLabel}>{d.label}</h3>
                  <p className={styles.dimensionNote}>{withAe(d.note)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={380}>
          <div className={styles.links}>
            <a
              href="https://www.formaetrix.com"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              FORM<Ae />TRIX →
            </a>
            <a
              href="https://www.formaetrix.com/imprint"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Elian Voigt →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
