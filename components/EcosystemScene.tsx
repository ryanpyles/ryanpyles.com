"use client";

import React from "react";
import Link from "next/link";
import { Ae } from "./Ae";
import ScrollScene, { mapRange } from "./ScrollScene";
import styles from "./EcosystemScene.module.css";

const doors = [
  {
    id: "formaetrix",
    index: "01",
    verb: "Make",
    name: "FORMÆTRIX",
    desc: "Design and systems work for publishers and authors — publishing infrastructure, identity systems, editorial web architecture.",
    cta: "Enter the studio",
    ariaLabel: "Visit Formaetrix.com — the studio site",
    href: "https://www.formaetrix.com",
    external: true,
  },
  {
    id: "elian",
    index: "02",
    verb: "Write",
    name: "Elian Voigt",
    desc: "Six published novels in a shared formal universe, three more forthcoming. Fiction that proposes a structure, then inhabits it.",
    cta: "Read the fiction",
    ariaLabel: "Visit ElianVoigt.com — the fiction site",
    href: "https://www.elianvoigt.com",
    external: true,
  },
  {
    id: "ryan",
    index: "03",
    verb: "Research",
    name: "Ryan Pyles",
    desc: "Twelve languages, field notes, and the long study of how form carries meaning — the origin point behind the studio and the fiction.",
    cta: "Read the biography",
    ariaLabel: "Read Ryan's biography",
    href: "/about",
    external: false,
  },
];

function DoorName({ id, name }: { id: string; name: string }) {
  if (id === "formaetrix") {
    return (
      <>
        FORM<Ae />TRIX
      </>
    );
  }
  return <>{name}</>;
}

// Staged reveal windows for each door across scene progress.
const REVEAL: [number, number][] = [
  [0.06, 0.26],
  [0.32, 0.52],
  [0.58, 0.78],
];

export default function EcosystemScene() {
  return (
    <ScrollScene
      id="ecosystem"
      ariaLabel="The ecosystem"
      heightVh={340}
      className={styles.root}
      contentClassName={styles.sticky}
    >
      {(progress) => {
        const reveals = REVEAL.map(([a, b]) => mapRange(progress, a, b));
        const activeStep = reveals.filter((r) => r > 0.5).length;

        return (
          <div className={styles.scene}>
            <div className={styles.head}>
              <p className={styles.kicker}>One origin point · three ways in</p>
              <p className={styles.statement}>
                The same investigation, run through three instruments — a studio,
                a body of fiction, and a life spent inside languages.
              </p>
            </div>

            <div className={styles.doors}>
              {doors.map((door, i) => {
                const r = reveals[i];
                return (
                  <article
                    key={door.id}
                    className={styles.door}
                    style={{
                      opacity: r,
                      transform: `translateY(${(1 - r) * 42}px)`,
                    }}
                    aria-hidden={r < 0.5}
                  >
                    <span className={styles.doorIndex}>{door.index}</span>
                    <span className={styles.doorVerb}>{door.verb}</span>
                    <h3 className={styles.doorName}>
                      <DoorName id={door.id} name={door.name} />
                    </h3>
                    <p className={styles.doorDesc}>{door.desc}</p>
                    {door.external ? (
                      <a
                        href={door.href}
                        className={styles.doorCta}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={door.ariaLabel}
                      >
                        {door.cta} →
                      </a>
                    ) : (
                      <Link
                        href={door.href}
                        className={styles.doorCta}
                        aria-label={door.ariaLabel}
                      >
                        {door.cta} →
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>

            <div className={styles.steps} aria-hidden="true">
              {doors.map((door, i) => (
                <span
                  key={door.id}
                  className={styles.step}
                  data-active={activeStep > i}
                />
              ))}
            </div>
          </div>
        );
      }}
    </ScrollScene>
  );
}
