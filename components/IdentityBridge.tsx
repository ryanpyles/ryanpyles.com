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
    cta: "Biography",
    href: "/about",
    external: false,
  },
  {
    id: "formaetrix",
    role: "The Studio",
    name: "FORMÆTRIX",
    desc: "Design and systems work for publishers, authors, and organizations where form and language are inseparable from function. Publishing infrastructure, identity systems, editorial web architecture. Selected engagements.",
    cta: "Formaetrix.com",
    href: "https://www.formaetrix.com",
    external: true,
  },
  {
    id: "elian",
    role: "The Literary Identity",
    name: "Elian Voigt",
    desc: "Nine novels in a shared formal universe. Experimental and speculative fiction that proposes a structure — a grammar, a legal brief, an archive of measurement — then inhabits it until it produces something the structure alone could not predict.",
    cta: "ElianVoigt.com",
    href: "https://www.elianvoigt.com",
    external: true,
  },
];

export default function IdentityBridge() {
  return (
    <section className={styles.section} aria-label="The ecosystem">
      <div className={styles.inner}>
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

        <div className={styles.triad}>
          {entities.map((entity, i) => (
            <Reveal key={entity.id} delay={80 + i * 150}>
              <article className={styles.entity}>
                <span className={styles.entityRole}>{entity.role}</span>
                <h3 className={styles.entityName}>{entity.name}</h3>
                <p className={styles.entityDesc}>{entity.desc}</p>
                {entity.external ? (
                  <a
                    href={entity.href}
                    className={styles.entityCta}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entity.cta} →
                  </a>
                ) : (
                  <Link href={entity.href} className={styles.entityCta}>
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
