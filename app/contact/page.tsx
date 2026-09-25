import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import InquiryForm from "@/components/InquiryForm";
import { buildPageMetadata } from "@/lib/metadata";
import { subpageLanguageAlternates } from "@/lib/i18n";
import styles from "./page.module.css";

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
            <li className={styles.acceptingItem}>AI narrative tooling</li>
            <li className={styles.acceptingItem}>Publishing &amp; author platforms</li>
            <li className={styles.acceptingItem}>Editorial web systems</li>
            <li className={styles.acceptingItem}>Prototype &amp; discovery sprints</li>
          </ul>
        </div>

        {/* ── Inquiry form — the primary action ─────────────────────── */}
        <div className={styles.formSection}>
          <h2 className={styles.formLabel}>The inquiry</h2>
          <InquiryForm />
        </div>

        {/* ── Context: fit, availability, direct line ───────────────── */}
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

        <p className={styles.note}>
          I don&rsquo;t respond to cold pitches, unsolicited manuscripts, or
          automated outreach. For press and media, see the{" "}
          <Link href="/press" className={styles.noteLink}>press page</Link>.
        </p>
      </Section>
    </SiteLayout>
  );
}
