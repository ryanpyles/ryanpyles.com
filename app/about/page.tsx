import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { buildPageMetadata } from "@/lib/metadata";
import { subpageLanguageAlternates } from "@/lib/i18n";
import { Ae } from "@/components/Ae";
import Portrait from "@/components/Portrait";
import MotionPlate from "@/components/MotionPlate";
import ReadingSpine from "@/components/ReadingSpine";
import styles from "./page.module.css";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Ryan J. Pyles — experimental fiction author, software engineer, and linguist based in Chicago. The personal archive behind FORMÆTRIX and Elian Voigt.",
  path: "/about",
  languageAlternates: subpageLanguageAlternates("/about"),
});

const workAreas = [
  {
    label: "Notes",
    desc: "Short entries on language, writing, software, and design, written close to the moment — alongside a Scholar's Notebook of structural observations on twelve languages under active study.",
    href: "/notes",
    annotation: "fn. ——",
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
      <ReadingSpine />
      <Section>
        <PageHeader
          kicker="Ryan J. Pyles — the archive"
          title="About"
          intro="Author, engineer, and linguist in Chicago — the person behind FORMÆTRIX and Elian Voigt."
        />

        {/* ── Editorial spread ─────────────────────────────────────── */}
        <div className={styles.spread}>
          {/* Lead: moving frame beside the opening statement. */}
          <div className={`${styles.row} ${styles.rowLead}`}>
            <MotionPlate
              src="/assets/videos/ryan-pyles-generalist.mp4"
              poster="/assets/videos/ryan-pyles-generalist-poster.jpg"
              label="A short silent loop: Ryan Pyles stands on a lit disc in a dark studio under a single overhead beam, as scanning rings rotate slowly around him. A lockup to the left reads: Ryan Pyles, Multidisciplinary Human System, built across disciplines."
              index="fig. 01"
              caption="Multidisciplinary Human System — built across disciplines."
              aspect="16 / 9"
              silent
              className={styles.leadPlate}
            />
            <p className={styles.lede}>
              Ryan J. Pyles writes experimental fiction and builds web systems.
              The work — across both disciplines — starts from the same premise:
              what is the minimum necessary to make something hold?
            </p>
          </div>

          {/* Studio plate beside the practice. */}
          <div className={`${styles.row} ${styles.rowStudio}`}>
            <Portrait
              src="/images/portraits/ryan-pyles-studio.jpg"
              alt="Ryan J. Pyles seated at a drafting table spread with floor plans, in a concrete-and-timber studio lined with books."
              index="fig. 02"
              caption="Chicago studio — drafting table, reference library, work in plan."
              aspect="4 / 3"
              sizes="(max-width: 900px) 100vw, 560px"
              className={styles.studioPlate}
            />
            <div className={styles.rowText}>
              <p>
                His novels operate through formal constraint. Each book proposes
                a structure — a legal brief, a grammar of declensions, an archive
                of measurement — and then inhabits that structure until it
                produces something the structure alone could not predict. The
                result is fiction that is precise without being cold, and strange
                without being ornamental.
              </p>
              <p>
                On the web side, he works at the intersection of identity,
                language, and system design. His practice is editorial rather
                than decorative — built on the conviction that good design is the
                absence of everything that isn&rsquo;t load-bearing.
              </p>
            </div>
          </div>

          {/* Figure study, offset opposite the language note. */}
          <div className={`${styles.row} ${styles.rowFigure}`}>
            <div className={styles.rowText}>
              <p>
                He studies twelve languages and is interested in the way grammar
                constrains and enables thought — and in how those constraints
                travel between natural language and code.
              </p>
              <p className={styles.pull}>He is based in Chicago.</p>
            </div>
            <Portrait
              src="/images/portraits/ryan-pyles-figure.jpg"
              alt="A vinyl figure of Ryan Pyles on a desk, standing in front of a monitor showing the same character as an untextured 3D model, with anatomy reference sheets pinned to the wall behind."
              index="fig. 03"
              caption="Figure study — reference sheets, mesh, packaged object. The same pipeline, run end to end."
              aspect="2 / 3"
              sizes="(max-width: 900px) 100vw, 300px"
              className={styles.figurePlate}
            />
          </div>
        </div>

        {/* ── Closing: the imprint, in a single reading column ─────── */}
        <div className={styles.closing}>
          <h2 className={styles.subheading}>FORM<Ae />TRIX</h2>
          <p>
            FORM<Ae />TRIX is an imprint Ryan founded for work that operates at
            the edge of what publishing categories can hold. It is the home of
            Elian Voigt — the literary identity through which Ryan&rsquo;s fiction
            is released — whose books refuse the distinction between literary and
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
