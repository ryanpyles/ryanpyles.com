import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { buildPageMetadata, buildBreadcrumbJsonLd } from "@/lib/metadata";
import { subpageLanguageAlternates } from "@/lib/i18n";
import { Ae } from "@/components/Ae";
import Portrait from "@/components/Portrait";
import MotionPlate from "@/components/MotionPlate";
import ReadingSpine from "@/components/ReadingSpine";
import FaqBlock from "@/components/FaqBlock";
import Figure from "@/components/Figure";
import Reveal from "@/components/Reveal";
import SelfDrawingSvg from "@/components/SelfDrawingSvg";
import styles from "./page.module.css";

/**
 * Branded-query FAQ. "Ryan Pyles" collides with other people in search, and
 * "is Ryan Pyles Elian Voigt" is a question the site should answer directly —
 * both for readers and for the entity graph.
 */
const faq = [
  {
    question: "Is Ryan Pyles the same person as Elian Voigt?",
    answer: "Yes. The fiction is published under Elian Voigt, through FORMÆTRIX.",
  },
  {
    question: "What is FORMÆTRIX?",
    answer:
      "FORMÆTRIX is Ryan Pyles's studio — the multidisciplinary practice behind his software, AI, design, and publishing systems. It also operates an imprint: the publishing line through which Elian Voigt's fiction is released. The studio is the practice; the imprint is one of the things it runs.",
  },
  {
    question: "What does Ryan Pyles do?",
    answer:
      "He is a multidisciplinary technologist working across software engineering, AI systems, product design, and language. He builds production systems — AI narrative tooling, publishing infrastructure, a locale-aware typography engine, and locale-aware product systems — with React, Next.js, and TypeScript, and writes experimental fiction as Elian Voigt.",
  },
  {
    question: "Where is Ryan Pyles based?",
    answer: "Chicago, Illinois. He works with clients worldwide.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Ryan J. Pyles — a Chicago multidisciplinary technologist working across software engineering, AI, design, and language. The person behind the FORMÆTRIX studio and the writer Elian Voigt.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        }}
      />
      <ReadingSpine />
      <Section>
        <PageHeader
          kicker="Ryan J. Pyles — the archive"
          title="About"
          intro="Multidisciplinary technologist in Chicago — software, AI, design, and language. The person behind the FORMÆTRIX studio and the writer Elian Voigt."
        />

        {/* A drawn portrait — one person in three passes — inks itself in. */}
        <figure className={styles.drawnSelf}>
          <SelfDrawingSvg
            variant="line"
            src="/images/ryanseated.svg"
            aspect="1167 / 1740"
            label="Line drawing of Ryan Pyles seated, the figure repeated three times in overlapping passes."
          />
          <figcaption className={styles.drawnSelfCaption}>
            One person, three passes — author, engineer, linguist.
          </figcaption>
        </figure>

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

        {/* ── The harder professional layer ───────────────────────── */}
        <section className={styles.practice} aria-label="Practice">
          <h2 className={styles.practiceHeading}>The practice</h2>
          <p className={styles.practiceIntro}>
            Beneath the literary surface is a working engineering practice. Ryan
            builds production systems across software, AI, design, and language
            — most often where they overlap.
          </p>
          <p className={styles.selected}>
            Selected systems:{" "}
            <Link href="/projects/continuity-atlas">Continuity Atlas</Link>{" "}
            (AI narrative memory),{" "}
            <Link href="/projects/polytype">Polytype</Link>{" "}
            (a locale-aware typography engine),{" "}
            <Link href="/projects/publish-architecture">Publish Architecture</Link>{" "}
            (structured publishing infrastructure), and a{" "}
            <Link href="/projects/locale-aware-product-system">
              Locale-Aware Product System
            </Link>{" "}
            — each a real, deterministic engine with a live demo.
          </p>
          <p className={styles.stack}>
            <span className={styles.stackLabel}>Stack</span>
            React · Next.js · TypeScript · Node · AI&nbsp;/&nbsp;RAG · Intl&nbsp;&amp;&nbsp;i18n · CSS architecture
          </p>
        </section>

        <Reveal>
          <Figure
            src="/images/about/orrery-formaetrix.jpg"
            alt="A small brass orrery-like sculpture of stacked gears and orbiting spheres, standing on a sheet of paper, signed Ryan Pyles · FORMÆTRIX."
            width={1168}
            height={784}
            index="fig. 04"
            caption="FORMÆTRIX — the studio as a mechanism: many disciplines turning on one axis."
            sizes="(max-width: 900px) 100vw, 720px"
          />
        </Reveal>

        {/* ── Closing: the imprint, in a single reading column ─────── */}
        <div className={styles.closing}>
          <h2 className={styles.subheading}>FORM<Ae />TRIX</h2>
          <p>
            FORM<Ae />TRIX is Ryan&rsquo;s studio — the multidisciplinary
            practice behind the systems above: software, AI, design, and the
            publishing infrastructure underneath them. It also runs an imprint:
            the publishing line through which Elian Voigt&rsquo;s fiction is
            released.
          </p>
          <p>
            So the three names are three layers, not three people.{" "}
            <strong>Ryan Pyles</strong> is the technologist.{" "}
            <strong>FORM<Ae />TRIX</strong> is the studio, and the imprint it
            runs. <strong>Elian Voigt</strong> is the literary identity the
            fiction is published under.
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

        <FaqBlock items={faq} />
      </Section>
    </SiteLayout>
  );
}
