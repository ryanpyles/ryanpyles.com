import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import { buildPageMetadata } from "@/lib/metadata";
import { Ae } from "@/components/Ae";
import styles from "./page.module.css";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Ryan J. Pyles — experimental fiction author, software engineer, and linguist based in Chicago. The personal archive behind FORMÆTRIX and Elian Voigt.",
  path: "/about",
});

const workAreas = [
  {
    label: "Field Notes",
    desc: "Short entries on language, writing, software, and design — written close to the moment, before they settle into something more considered.",
    href: "/field-notes",
    annotation: "fn. ——",
  },
  {
    label: "Language Archive",
    desc: "A Scholar's Notebook. Structural observations on twelve languages under active study, charted by orbit and proficiency.",
    href: "/archive",
    annotation: "§ archive",
  },
  {
    label: "Systems & Projects",
    desc: "Software built because the fiction and the publishing required it. Identity systems, narrative engines, editorial architecture.",
    href: "/projects",
    annotation: "∑ systems",
  },
  {
    label: "Fiction Catalogue",
    desc: "The complete catalogue of novels published under the Elian Voigt name, with notes on form, structure, and context.",
    href: "/books",
    annotation: "≡ fiction",
  },
] as const;

export default function AboutPage() {
  return (
    <SiteLayout>
      <Section narrow>
        <header className={styles.header}>
          <h1>About</h1>
        </header>

        <div className={styles.body}>
          <p>
            Ryan J. Pyles writes experimental fiction and builds web systems. The
            work — across both disciplines — starts from the same premise: what
            is the minimum necessary to make something hold?
          </p>

          <p>
            His novels operate through formal constraint. Each book proposes a
            structure — a legal brief, a grammar of declensions, an archive of
            measurement — and then inhabits that structure until it produces
            something the structure alone could not predict. The result is fiction
            that is precise without being cold, and strange without being
            ornamental.
          </p>

          <p>
            On the web side, he works at the intersection of identity, language,
            and system design. His practice is editorial rather than decorative —
            built on the conviction that good design is the absence of everything
            that isn't load-bearing.
          </p>

          <p>
            He studies twelve languages and is interested in the way grammar
            constrains and enables thought — and in how those constraints travel
            between natural language and code.
          </p>

          <p>
            He is based in Chicago.
          </p>

          <h2 className={styles.subheading}>FORM<Ae />TRIX</h2>

          <p>
            FORM<Ae />TRIX is an imprint Ryan founded for work that operates at the
            edge of what publishing categories can hold. It is the home of
            Elian Voigt — the literary identity through which Ryan's fiction is
            released — whose books refuse the distinction between literary and
            genre fiction.
          </p>

          <p>
            The relationship between the person and the imprint is not fully
            explained here. It is felt in the work.
          </p>

          <p className={styles.footnote}>
            <span className={styles.footnoteMarker}>*</span>
            Ryan Pyles is the real person. Elian Voigt is the authorial identity
            — a distinct literary voice, not a pseudonym in any simple sense.
            The distinction matters less than the work it produces.
          </p>

          <h2 className={styles.subheading}>The Work</h2>
        </div>

        <div className={styles.workMap}>
          {workAreas.map((area) => (
            <Link key={area.href} href={area.href} className={styles.workEntry}>
              <span className={styles.workAnnotation} aria-hidden="true">{area.annotation}</span>
              <span className={styles.workLabel}>{area.label}</span>
              <span className={styles.workDesc}>{area.desc}</span>
            </Link>
          ))}
        </div>

        <div className={styles.contact}>
          <p>For inquiries:</p>
          <a href="mailto:me@ryanpyles.com" className={styles.email}>
            me@ryanpyles.com
          </a>
          <Link href="/press" className={styles.pressLink}>
            Press &amp; media kit →
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
