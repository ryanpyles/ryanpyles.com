import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Reveal from "@/components/Reveal";
import ContinuityAtlasCaseStudy from "@/components/ContinuityAtlasCaseStudy";
import { projectCases, getCaseStudy } from "@/content/projectCases";
import styles from "./page.module.css";

const ProjectDemo = dynamic(() => import("@/components/ProjectDemo"), {
  ssr: false,
  loading: () => <div className={styles.demoSkeleton} />,
});

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projectCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Case Study`,
    description: cs.tagline,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  // The flagship case study gets a bespoke, deeper layout.
  if (cs.slug === "continuity-atlas") {
    return (
      <SiteLayout>
        <ContinuityAtlasCaseStudy
          cs={cs}
          demo={<ProjectDemo type={cs.demo.type} caption={cs.demo.caption} />}
        />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <article className={styles.root}>
        {/* Back */}
        <div className={styles.back}>
          <Link href="/projects" className={styles.backLink}>
            ← All Projects
          </Link>
        </div>

        {/* Header */}
        <Reveal>
          <header className={styles.header}>
            <div className={styles.headerMeta}>
              <span className={styles.year}>{cs.year}</span>
              <ul className={styles.stack} role="list">
                {cs.stack.map((tag) => (
                  <li key={tag} className={styles.stackTag}>{tag}</li>
                ))}
              </ul>
            </div>
            <h1 className={styles.title}>{cs.title}</h1>
            <p className={styles.tagline}>{cs.tagline}</p>
          </header>
        </Reveal>

        <div className={styles.body}>
          {/* Problem */}
          <Reveal delay={60}>
            <section className={styles.section}>
              <p className={styles.sectionLabel}>Problem</p>
              <p className={styles.prose}>{cs.problem}</p>
            </section>
          </Reveal>

          {/* Approach */}
          <Reveal delay={80}>
            <section className={styles.section}>
              <p className={styles.sectionLabel}>Approach</p>
              <p className={styles.prose}>{cs.approach.summary}</p>
              <ul className={styles.decisions}>
                {cs.approach.decisions.map((d, i) => {
                  const [head, ...rest] = d.split(":");
                  return (
                    <li key={i} className={styles.decision}>
                      <span className={styles.decisionHead}>{head}:</span>
                      {rest.join(":")}
                    </li>
                  );
                })}
              </ul>
            </section>
          </Reveal>

          {/* Demo */}
          <Reveal>
            <section className={styles.demoSection}>
              <p className={styles.sectionLabel}>Demo</p>
              <ProjectDemo type={cs.demo.type} caption={cs.demo.caption} />
            </section>
          </Reveal>

          {/* Technical */}
          <Reveal delay={60}>
            <section className={styles.section}>
              <p className={styles.sectionLabel}>Technical Detail</p>
              <p className={styles.prose}>{cs.technical}</p>
            </section>
          </Reveal>

          {/* Outcome */}
          <Reveal delay={80}>
            <section className={styles.section}>
              <p className={styles.sectionLabel}>Outcome</p>
              <p className={styles.prose}>{cs.outcome}</p>
              {cs.metrics && (
                <ul className={styles.metrics}>
                  {cs.metrics.map((m, i) => (
                    <li key={i} className={styles.metric}>{m}</li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        </div>

        {/* Footer nav */}
        <Reveal>
          <footer className={styles.footer}>
            <Link href="/projects" className={styles.footerLink}>
              ← All Projects
            </Link>
          </footer>
        </Reveal>
      </article>
    </SiteLayout>
  );
}
