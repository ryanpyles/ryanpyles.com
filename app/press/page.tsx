import React from "react";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import { Ae } from "@/components/Ae";
import { buildPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = buildPageMetadata({
  title: "Press",
  description:
    "Press and media information for Ryan J. Pyles — bios, book information, and contact for interviews, reviews, and speaking inquiries.",
  path: "/press",
});

export default function PressPage() {
  return (
    <SiteLayout>
      <Section narrow>
        <header className={styles.header}>
          <h1>Press</h1>
          <p className={styles.intro}>
            For interviews, reviews, author features, and speaking inquiries.
          </p>
        </header>

        <div className={styles.body}>
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Short Bio</h2>
            <p>
              Ryan J. Pyles is an experimental fiction author, software
              engineer, and linguist based in Chicago. He writes novels as Elian
              Voigt, published through FORM<Ae />TRIX. His work operates through
              formal constraint — fiction that proposes a structure, inhabits it,
              and produces something the structure alone could not predict.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Long Bio</h2>
            <p>
              Ryan J. Pyles writes experimental and speculative fiction under the
              name Elian Voigt. His novels resist easy genre placement: they are
              precise without being cold, and strange without being ornamental.
              Each book proposes a formal structure — a legal brief, a grammar of
              declensions, an archive of measurement — and then inhabits that
              structure until it produces something the structure alone could not
              predict.
            </p>
            <p>
              He is also a software engineer who works at the intersection of
              identity, language, and system design. His web practice is editorial
              rather than decorative, built on the conviction that good design is
              the absence of everything that isn&rsquo;t load-bearing. He has built
              dual-identity publishing platforms, multilingual typography engines,
              and narrative intelligence tools for authors working with AI.
            </p>
            <p>
              He studies twelve languages and is interested in language as
              structure — the way grammar constrains and enables thought, and the
              way those constraints travel between natural language and code. He
              is based in Chicago.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Books</h2>
            <ul className={styles.bookList}>
              <li>
                <span className={styles.bookTitle}>Feast of the Broadcast Saints</span>
                <span className={styles.bookMeta}>Elian Voigt · FORM<Ae />TRIX · ISBN 979-8-251792-36-2</span>
              </li>
              <li>
                <span className={styles.bookTitle}>What Survives Is Proof</span>
                <span className={styles.bookMeta}>Elian Voigt · FORM<Ae />TRIX</span>
              </li>
              <li>
                <span className={styles.bookTitle}>Declensions of Dark Water</span>
                <span className={styles.bookMeta}>Elian Voigt · FORM<Ae />TRIX</span>
              </li>
              <li>
                <span className={styles.bookTitle}>Terms of Unbeing</span>
                <span className={styles.bookMeta}>Elian Voigt · FORM<Ae />TRIX</span>
              </li>
              <li>
                <span className={styles.bookTitle}>Summer of the Glass Bees</span>
                <span className={styles.bookMeta}>Elian Voigt · FORM<Ae />TRIX</span>
              </li>
              <li>
                <span className={styles.bookTitle}>The Quiet Metric</span>
                <span className={styles.bookMeta}>Elian Voigt · FORM<Ae />TRIX</span>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Available for</h2>
            <ul className={styles.availableList}>
              <li>Interviews — print, podcast, radio</li>
              <li>Reviews and advance reader copies</li>
              <li>Author events and readings</li>
              <li>Speaking: experimental fiction, constraint-based writing, language and systems, AI and narrative</li>
              <li>Guest essays and contributed writing</li>
            </ul>
          </section>

          <section className={styles.contact}>
            <h2 className={styles.sectionLabel}>Press Contact</h2>
            <a href="mailto:me@ryanpyles.com?subject=Press inquiry" className={styles.email}>
              me@ryanpyles.com
            </a>
            <p className={styles.contactNote}>
              Include &ldquo;Press&rdquo; in the subject line. Response time is
              typically two business days.
            </p>
          </section>
        </div>
      </Section>
    </SiteLayout>
  );
}
