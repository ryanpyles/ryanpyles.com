import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import InquiryForm from "@/components/InquiryForm";
import FaqBlock from "@/components/FaqBlock";
import { buildPageMetadata, buildBreadcrumbJsonLd } from "@/lib/metadata";
import { subpageLanguageAlternates } from "@/lib/i18n";
import styles from "./page.module.css";

const faq = [
  {
    question: "How soon do you reply?",
    answer:
      "I read every inquiry myself and reply within about two business days. Automated outreach and unsolicited manuscripts are not answered.",
  },
  {
    question: "What does a prototype sprint include?",
    answer:
      "A short, fixed-scope build to prove an idea or de-risk a decision before a full commitment — typically a working slice of an author platform, editorial interface, or narrative tool.",
  },
  {
    question: "Do you take retainers or ongoing maintenance?",
    answer:
      "No. Engagements are fixed-scope project builds, prototype sprints, or advisory reviews. Open-ended retainer support is not a fit.",
  },
  {
    question: "Can you build a story-memory system like Continuity Atlas?",
    answer:
      "Yes. Continuity Atlas is the working prototype of that class of work — see ryanpyles.com/atlas. Inquiries about story-memory, continuity validation, and inspectable AI workflows for long-form fiction are a good fit.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Start a project",
  description:
    "Start a project with Ryan Pyles — AI narrative tooling, publishing and author platforms, editorial web systems, and content architecture. Tell me what you're building.",
  path: "/contact",
  languageAlternates: subpageLanguageAlternates("/contact"),
});

export default function ContactPage() {
  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Start a project", path: "/contact" },
          ]),
        }}
      />
      <Section narrow>
        <PageHeader
          kicker="Work with FORMÆTRIX"
          title="Start a project"
          intro={
            <>
              Tell me what you&rsquo;re building. I read every inquiry myself and
              reply within about two business days.
            </>
          }
        />

        <div className={styles.accepting}>
          <p className={styles.acceptingLabel}>
            <span className={styles.acceptingDot} aria-hidden="true" />
            Currently accepting
          </p>
          <ul className={styles.acceptingList}>
            <li className={styles.acceptingItem}>Continuity Atlas commissions</li>
            <li className={styles.acceptingItem}>AI narrative tooling</li>
            <li className={styles.acceptingItem}>Publishing & author platforms</li>
            <li className={styles.acceptingItem}>Editorial web systems</li>
            <li className={styles.acceptingItem}>Prototype & discovery sprints</li>
          </ul>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.formLabel}>The inquiry</h2>
          <InquiryForm />
        </div>

        <div className={styles.options}>
          <div className={styles.option}>
            <h2 className={styles.optionLabel}>Prefer email?</h2>
            <a href="mailto:me@ryanpyles.com" className={styles.optionLink}>
              me@ryanpyles.com
            </a>
          </div>

          <div className={styles.option}>
            <h2 className={styles.optionLabel}>How engagements work</h2>
            <p className={styles.optionText}>
              I take on a small number of selected engagements at a time —
              fixed-scope project builds, short prototype/discovery sprints, and
              advisory. See{" "}
              <Link href="/work" className={styles.noteLink}>
                how I work
              </Link>{" "}
              for the full picture.
            </p>
          </div>

          <div className={styles.fitGrid}>
            <div className={styles.option}>
              <h2 className={styles.optionLabel}>Good fit</h2>
              <ul className={styles.fitList}>
                <li>AI narrative tooling and story-memory systems</li>
                <li>Publishing and author platforms — Next.js, structured content, SEO</li>
                <li>Web apps with language, typography, or data at the center</li>
                <li>A prototype that has to prove an idea before a full build</li>
              </ul>
            </div>
            <div className={styles.option}>
              <h2 className={styles.optionLabel}>Not a fit</h2>
              <ul className={styles.fitList}>
                <li>Ongoing maintenance or open-ended retainer support</li>
                <li>Projects requiring a large team or agency infrastructure</li>
                <li>Rush timelines without a prior relationship</li>
              </ul>
            </div>
          </div>
        </div>

        <FaqBlock heading="Before you write" items={faq} />

        <p className={styles.note}>
          I don&rsquo;t respond to cold pitches, unsolicited manuscripts, or
          automated outreach. For press and media, see the{" "}
          <Link href="/press" className={styles.noteLink}>press page</Link>.
        </p>
      </Section>
    </SiteLayout>
  );
}
