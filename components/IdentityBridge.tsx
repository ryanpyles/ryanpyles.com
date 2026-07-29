import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { Ae } from "./Ae";
import styles from "./IdentityBridge.module.css";

const doors = [
  {
    id: "formaetrix",
    index: "01",
    verb: "Make",
    name: "FORMÆTRIX",
    desc: "Design and systems work for publishers and authors — publishing infrastructure, identity systems, editorial web architecture. Selected engagements.",
    shortDesc: "Design systems, publishing infrastructure, editorial web architecture.",
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
    desc: "Six published novels in a shared formal universe, three more forthcoming. Fiction that proposes a structure — a grammar, a legal brief, an archive of measurement — then inhabits it until it produces something the structure alone could not predict.",
    shortDesc: "Experimental fiction. Formal systems, language, grief, strange machines.",
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
    desc: "Twelve languages, field notes, and the long study of how form carries meaning. The origin point behind the studio and the fiction — a single question run through every discipline: what is the minimum necessary to make something hold?",
    shortDesc: "Language study, field notes, the origin point behind both. Chicago.",
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

export default function IdentityBridge() {
  return (
    <section className={styles.section} id="ecosystem" aria-label="The ecosystem">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.topText}>
            <Reveal slow>
              <p className={styles.intro}>One origin point · three ways in</p>
            </Reveal>
            <Reveal slow>
              <p className={styles.statement}>
                The same investigation, run through three instruments — a studio,
                a body of fiction, and a life spent inside languages.
              </p>
            </Reveal>
          </div>
        </div>

        <div className={styles.triad}>
          {doors.map((door, i) => (
            <Reveal key={door.id} delay={80 + i * 150}>
              <article className={styles.entity}>
                <span className={styles.entityIndex} aria-hidden="true">
                  {door.index}
                </span>
                <span className={styles.entityVerb}>{door.verb}</span>
                <h3 className={styles.entityName}>
                  <DoorName id={door.id} name={door.name} />
                </h3>
                <p className={styles.entityDesc}>{door.desc}</p>
                <p className={styles.entityDescShort}>{door.shortDesc}</p>
                {door.external ? (
                  <a
                    href={door.href}
                    className={styles.entityCta}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={door.ariaLabel}
                  >
                    {door.cta} →
                  </a>
                ) : (
                  <Link href={door.href} className={styles.entityCta} aria-label={door.ariaLabel}>
                    {door.cta} →
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
