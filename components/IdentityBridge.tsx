import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { Ae } from "./Ae";
import styles from "./IdentityBridge.module.css";

const entities = [
  {
    id: "ryan",
    role: "The Maker",
    name: "Ryan Pyles",
    desc: "Author, engineer, linguist, and designer based in Chicago. The common origin point behind FORMÆTRIX and Elian Voigt. The work across all three disciplines begins from a single question: what is the minimum necessary to make something hold?",
    shortDesc: "Author, engineer, linguist, designer. Chicago.",
    cta: "Biography",
    ariaLabel: "Read Ryan's biography",
    href: "/about",
    external: false,
  },
  {
    id: "formaetrix",
    role: "The Studio",
    name: "FORMÆTRIX",
    desc: "Design and systems work for publishers, authors, and organizations where form and language are inseparable from function. Publishing infrastructure, identity systems, editorial web architecture. Selected engagements.",
    shortDesc: "Design systems, publishing infrastructure, editorial web architecture.",
    cta: "Formaetrix.com",
    ariaLabel: "Visit Formaetrix.com — the studio site",
    href: "https://www.formaetrix.com",
    external: true,
  },
  {
    id: "elian",
    role: "The Literary Identity",
    name: "Elian Voigt",
    desc: "Six published novels in a shared formal universe, with three more forthcoming. Experimental and speculative fiction that proposes a structure — a grammar, a legal brief, an archive of measurement — then inhabits it until it produces something the structure alone could not predict.",
    shortDesc: "Experimental fiction. Formal systems, language, grief, strange machines.",
    cta: "ElianVoigt.com",
    ariaLabel: "Visit ElianVoigt.com — the fiction site",
    href: "https://www.elianvoigt.com",
    external: true,
  },
];

export default function IdentityBridge() {
  return (
    <section className={styles.section} id="ecosystem" aria-label="The ecosystem">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.topText}>
            <Reveal slow>
              <p className={styles.intro}>
                Three bodies of work. One origin point. Begin with whichever axis pulls first.
              </p>
            </Reveal>
            <Reveal slow>
              <p className={styles.statement}>
                Ryan Pyles is the maker.{" "}
                <a
                  href="https://www.formaetrix.com"
                  className={styles.statementLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FORM<Ae />TRIX
                </a>{" "}
                is the studio.{" "}
                <a
                  href="https://www.elianvoigt.com"
                  className={styles.statementLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Elian Voigt
                </a>{" "}
                is the literary identity.
              </p>
            </Reveal>
          </div>
        </div>

        <div className={styles.triad}>
          {entities.map((entity, i) => (
            <Reveal key={entity.id} delay={80 + i * 150}>
              <article className={styles.entity}>
                <span className={styles.entityRole}>{entity.role}</span>
                <h3 className={styles.entityName}>{entity.name}</h3>
                <p className={styles.entityDesc}>{entity.desc}</p>
                <p className={styles.entityDescShort}>{entity.shortDesc}</p>
                {entity.external ? (
                  <a
                    href={entity.href}
                    className={styles.entityCta}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={entity.ariaLabel}
                  >
                    {entity.cta} →
                  </a>
                ) : (
                  <Link href={entity.href} className={styles.entityCta} aria-label={entity.ariaLabel}>
                    {entity.cta} →
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
