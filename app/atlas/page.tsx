import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import FaqBlock from "@/components/FaqBlock";
import SectionCta from "@/components/SectionCta";
import { buildPageMetadata, buildBreadcrumbJsonLd } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = buildPageMetadata({
  title: "Continuity Atlas — Story-memory system for long-form fiction",
  description:
    "Continuity Atlas is a commissioned story-memory system for publishers, novelists, and series teams who cannot afford continuity failures. Typed memory, inspectable context, constrained generation.",
  path: "/atlas",
  keywords: [
    "Continuity Atlas",
    "AI story bible",
    "story memory system",
    "LLM novel continuity",
    "narrative continuity software",
    "AI for novelists",
    "publishing AI tooling",
  ],
});

const modules = [
  {
    name: "Story Memory",
    body: "Motifs, secrets, and promises tracked as living entries. Author-only facts stay hidden from generation by default.",
  },
  {
    name: "Character Drift",
    body: "A character is an ordered sequence of states, not one biography. Each chapter can carry different voice rules and guardrails.",
  },
  {
    name: "Voice Fingerprint",
    body: "Voice measured as behavior — fragment frequency, sensory density, dialogue evasion — not described as a style.",
  },
  {
    name: "Rewrite Assist",
    body: "Inspect before generate. A Context Receipt shows what is preserved, forbidden, and hidden before any rewrite fires.",
  },
  {
    name: "Continuity Graph",
    body: "Characters, events, places, and motifs as interconnected data — queried and validated across the whole book.",
  },
  {
    name: "Constrained generation",
    body: "The model only sees what the current state is allowed to know. Relevance is not permission.",
  },
];

const audience = [
  "Novelists writing large-cast or multi-POV fiction",
  "Series authors carrying continuity across volumes",
  "Developmental editors who need a queryable bible",
  "Publishing teams maintaining franchise consistency",
];

const steps = [
  {
    num: "01",
    name: "Ingest",
    body: "The manuscript — or the current draft plus the existing bible — is parsed into typed memory: states, events, claims, relations.",
  },
  {
    num: "02",
    name: "Model",
    body: "We agree what must stay hidden, what the reader already knows, and which contradictions are intentional. Secrets become structure.",
  },
  {
    num: "03",
    name: "Ship",
    body: "A working tool on your material: inspectable receipts, continuity queries, and a constrained rewrite path. Not a prompt pack.",
  },
];

const faq = [
  {
    question: "Is Continuity Atlas a product I can buy?",
    answer:
      "Not as a self-serve subscription. It is commissioned against a specific manuscript or catalogue. The public prototype on this site is the working proof of that class of system.",
  },
  {
    question: "How is this different from a story bible or a vector index?",
    answer:
      "A bible is a document. A vector index retrieves similar passages. Neither can hide an author-only secret or refuse a fact that is no longer true in this chapter. Atlas stores typed, time-indexed memory and validates it before generation.",
  },
  {
    question: "What does a commission typically cost?",
    answer:
      "A proof against one manuscript is usually a prototype sprint (typically under $10k). A production tool for a series or catalogue is a project build, typically $10k–$50k depending on scope.",
  },
  {
    question: "Do I have to use AI in the rewrite step?",
    answer:
      "No. The value is the memory model. Generation is optional and always gated by a Context Receipt the author can edit or refuse.",
  },
];

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Continuity Atlas",
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  description:
    "A commissioned story-memory system for long-form fiction: typed narrative memory, continuity validation, and inspectable AI workflows.",
  url: "https://ryanpyles.com/atlas",
  author: {
    "@type": "Person",
    name: "Ryan Pyles",
    url: "https://ryanpyles.com",
  },
  offers: {
    "@type": "Offer",
    url: "https://ryanpyles.com/contact",
    availability: "https://schema.org/InStock",
    category: "Custom software engagement",
  },
};

export default function AtlasPage() {
  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Continuity Atlas", path: "/atlas" },
          ]),
        }}
      />
      <Section>
        <PageHeader
          kicker="Narrative intelligence system"
          title="Continuity Atlas"
          intro="A commissioned story-memory system for manuscripts that cannot afford to forget what they already decided."
        />

        <div className={styles.lede}>
          <Reveal>
            <p className={styles.intro}>
              Story bibles drift. Chat windows invent. Vector indexes retrieve
              the secret you were holding back because it is the most relevant
              sentence in the book. Atlas treats continuity as typed data —
              states, events, claims, relations — and refuses to generate until
              the author has seen the receipt.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className={styles.ctas}>
              <Link href="/contact" className={styles.ctaPrimary}>
                Commission a system →
              </Link>
              <Link
                href="/projects/continuity-atlas"
                className={styles.ctaSecondary}
              >
                Read the case study →
              </Link>
              <Link
                href="/writing/story-bible-vs-typed-memory"
                className={styles.ctaSecondary}
              >
                Story bible vs typed memory →
              </Link>
            </div>
          </Reveal>
        </div>

        <section className={styles.block} aria-label="Modules">
          <Reveal>
            <p className={styles.blockLabel}>What it holds</p>
          </Reveal>
          <div className={styles.modules}>
            {modules.map((m, i) => (
              <Reveal key={m.name} delay={i * 60}>
                <article className={styles.module}>
                  <span className={styles.moduleNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className={styles.moduleName}>{m.name}</h2>
                  <p className={styles.moduleBody}>{m.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.block} aria-label="Who it is for">
          <Reveal>
            <p className={styles.blockLabel}>Who it is for</p>
          </Reveal>
          <ul className={styles.audience}>
            {audience.map((item) => (
              <li key={item} className={styles.audienceItem}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.block} aria-label="How a commission works">
          <Reveal>
            <p className={styles.blockLabel}>How a commission works</p>
          </Reveal>
          <div className={styles.steps}>
            {steps.map((s) => (
              <article key={s.num} className={styles.step}>
                <span className={styles.stepNum}>{s.num}</span>
                <h2 className={styles.stepName}>{s.name}</h2>
                <p className={styles.stepBody}>{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        <FaqBlock heading="Questions" items={faq} />

        <SectionCta
          text="The public prototype runs on a real manuscript. A commission is built on yours."
          primary={{ label: "Start a project →", href: "/contact" }}
          secondary={{
            label: "Open the prototype →",
            href: "/projects/continuity-atlas#prototype",
          }}
        />
      </Section>
    </SiteLayout>
  );
}
