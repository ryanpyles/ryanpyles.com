import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import ProcessTrack from "@/components/ProcessTrack";
import Reveal from "@/components/Reveal";
import { Ae } from "@/components/Ae";
import { buildPageMetadata, buildBreadcrumbJsonLd } from "@/lib/metadata";
import { subpageLanguageAlternates } from "@/lib/i18n";
import styles from "./page.module.css";

export const metadata: Metadata = buildPageMetadata({
  title: "Work with Ryan",
  description:
    "Design and engineering for publishers, authors, and teams where language and systems are load-bearing — AI narrative tooling, publishing platforms, editorial web systems, and content architecture. How I work, and how to start a project.",
  path: "/work",
  languageAlternates: subpageLanguageAlternates("/work"),
});

const services = [
  {
    name: "AI narrative tooling",
    body: "Story-memory systems, continuity validation, and inspectable AI workflows for long-form fiction and publishing — the machinery around the model, not another prompt.",
    proof: { label: "Continuity Atlas", href: "/projects/continuity-atlas" },
  },
  {
    name: "Publishing & author platforms",
    body: "Author sites, catalogue systems, and the SEO and structured-data layer underneath — where one typed content model generates pages, metadata, and schema automatically.",
    proof: { label: "Book SEO Architecture", href: "/projects/book-seo-system" },
  },
  {
    name: "Editorial web systems",
    body: "Reading-first interfaces with real typographic control — multilingual layout, RTL and CJK, and design-token systems built for long-form content rather than generic UI.",
    proof: { label: "Typography Engine", href: "/projects/language-typography-engine" },
  },
  {
    name: "Systems & content architecture",
    body: "Typed content infrastructure that keeps UI, static generation, SEO, and structured data from drifting apart — one source of truth, framework-agnostic.",
    proof: { label: "Content Architecture", href: "/projects/content-architecture" },
  },
];

const engagements = [
  {
    num: "01",
    name: "Project build",
    body: "Fixed-scope design and engineering, discovery through launch. The default engagement.",
  },
  {
    num: "02",
    name: "Prototype sprint",
    body: "A short, focused build to prove an idea or de-risk a decision before a full commitment.",
  },
  {
    num: "03",
    name: "Advisory",
    body: "Architecture reviews and technical direction for teams already building — no open-ended retainer.",
  },
];

const process = ["Discovery", "Architecture", "Prototype", "Build", "Launch"];

const outcomes = [
  "An AI-powered narrative-continuity platform for long-form fiction.",
  "Publishing infrastructure supporting a growing catalogue of novels.",
  "Multilingual editorial systems with genuine typographic control.",
  "React / TypeScript products shipped from concept through deployment.",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "FORMÆTRIX — Ryan Pyles",
  url: "https://ryanpyles.com/work",
  description:
    "Design and engineering for publishers, authors, and teams: AI narrative tooling, publishing platforms, editorial web systems, and content architecture.",
  areaServed: "Worldwide",
  provider: {
    "@type": "Person",
    name: "Ryan Pyles",
    url: "https://ryanpyles.com",
  },
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.name, description: s.body },
  })),
};

export default function WorkPage() {
  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
        }}
      />
      <Section>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <PageHeader
          kicker={
            <>
              Work with FORM<Ae />TRIX
            </>
          }
          title="Work"
          intro="Design and engineering for systems where language is load-bearing."
        />
        <div className={styles.heroLede}>
          <Reveal>
            <p className={styles.intro}>
              I build for publishers, authors, and teams whose products live or
              die on language, structure, and typography — from AI narrative
              tooling to the publishing infrastructure underneath it. Every
              engagement below is backed by shipped work you can inspect.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className={styles.heroCtas}>
              <Link href="/contact" className={styles.ctaPrimary}>
                Start a project →
              </Link>
              <Link href="/projects" className={styles.ctaSecondary}>
                View the systems →
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ── Services ─────────────────────────────────────────────── */}
        <section className={styles.block} aria-label="Services">
          <Reveal>
            <p className={styles.blockLabel}>What I build</p>
          </Reveal>
          <div className={styles.services}>
            {services.map((s, i) => (
              <Reveal key={s.name} delay={i * 80}>
                <article className={styles.service}>
                  <h2 className={styles.serviceName}>{s.name}</h2>
                  <p className={styles.serviceBody}>{s.body}</p>
                  <Link href={s.proof.href} className={styles.serviceProof}>
                    Proof: {s.proof.label} →
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Engagements ──────────────────────────────────────────── */}
        <section className={styles.block} aria-label="How engagements work">
          <Reveal>
            <p className={styles.blockLabel}>How engagements work</p>
          </Reveal>
          <div className={styles.engagements}>
            {engagements.map((e, i) => (
              <Reveal key={e.name} delay={i * 80}>
                <div className={styles.engagement}>
                  <span className={styles.engagementNum}>{e.num}</span>
                  <h3 className={styles.engagementName}>{e.name}</h3>
                  <p className={styles.engagementBody}>{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────────── */}
        <section className={styles.block} aria-label="Process">
          <Reveal>
            <p className={styles.blockLabel}>How the work moves</p>
          </Reveal>
          <Reveal delay={80}>
            <ProcessTrack steps={process} />
          </Reveal>
        </section>

        {/* ── Outcomes + CTA ───────────────────────────────────────── */}
        <section className={styles.block} aria-label="Selected outcomes">
          <Reveal>
            <p className={styles.blockLabel}>Selected outcomes</p>
          </Reveal>
          <ul className={styles.outcomes}>
            {outcomes.map((o, i) => (
              <Reveal key={o} delay={i * 70}>
                <li className={styles.outcome}>
                  <span className={styles.outcomeMark} aria-hidden="true" />
                  {o}
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        <Reveal>
          <div className={styles.finalCta}>
            <p className={styles.finalCtaText}>
              Have something that fits? Tell me what you&rsquo;re building.
            </p>
            <div className={styles.finalCtaLinks}>
              <Link href="/contact" className={styles.ctaPrimary}>
                Start a project →
              </Link>
              <a href="mailto:me@ryanpyles.com" className={styles.ctaSecondary}>
                me@ryanpyles.com
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </SiteLayout>
  );
}
