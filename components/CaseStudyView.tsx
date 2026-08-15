"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CaseStudy } from "@/content/projectCases";
import { getProof } from "@/content/projectProof";
import type { Block } from "@/content/writing/types";
import ArticleBody from "./ArticleBody";
import styles from "./CaseStudyView.module.css";

interface Props {
  cs: CaseStudy;
  demo: React.ReactNode;
}

type Sec = { id: string; label: string };

export default function CaseStudyView({ cs, demo }: Props) {
  const proof = getProof(cs.slug);

  // Diagram + code + constraint reuse the article renderer for consistency.
  const proofBlocks = useMemo<Block[]>(() => {
    if (!proof) return [];
    const b: Block[] = [];
    if (proof.diagram)
      b.push({
        type: "figure",
        svg: proof.diagram.svg,
        caption: proof.diagram.caption,
        label: proof.diagram.label,
      });
    if (proof.implementation)
      b.push({
        type: "code",
        language: proof.implementation.language,
        code: proof.implementation.code,
        caption: proof.implementation.caption,
      });
    if (proof.constraint)
      b.push({
        type: "callout",
        variant: "insight",
        title: proof.constraint.title,
        text: proof.constraint.body,
      });
    return b;
  }, [proof]);

  const sections: Sec[] = useMemo(() => {
    const s: Sec[] = [
      { id: "problem", label: "Problem" },
      { id: "approach", label: "Approach" },
    ];
    if (proof) s.push({ id: "evidence", label: "Evidence" });
    s.push(
      { id: "demo", label: "Demo" },
      { id: "technical", label: "Technical" },
      { id: "outcome", label: "Outcome" }
    );
    return s;
  }, [proof]);

  const articleRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Scroll-spy: which section owns the viewport midline.
    const io = new IntersectionObserver(
      (entries) => {
        // Prefer the entry nearest the top that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });

    if (reduced) return () => io.disconnect();

    let raf = 0;
    const update = () => {
      raf = 0;
      // Hero ghost parallax.
      if (heroRef.current) {
        heroRef.current.style.setProperty(
          "--y",
          `${(window.scrollY * 0.18).toFixed(1)}px`
        );
      }
      // Rail progress fill = how far we've read through the article.
      if (railFillRef.current && articleRef.current) {
        const r = articleRef.current.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const done = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
        railFillRef.current.style.transform = `scaleY(${done.toFixed(4)})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sections]);

  return (
    <article className={styles.root} ref={articleRef}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className={styles.hero} ref={heroRef}>
        <span className={styles.ghostYear} aria-hidden="true">
          {cs.year}
        </span>

        <div className={styles.heroInner}>
          <Link href="/projects" className={styles.back}>
            ← All Systems
          </Link>

          <div className={styles.meta}>
            <span className={styles.year}>{cs.year}</span>
            <ul className={styles.stack} role="list">
              {cs.stack.map((t) => (
                <li key={t} className={styles.stackTag}>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <h1 className={styles.title}>{cs.title}</h1>
          <p className={styles.tagline}>{cs.tagline}</p>
        </div>
      </header>

      {/* ── Body: sticky rail + sections ─────────────────────────── */}
      <div className={styles.layout}>
        <nav className={styles.rail} aria-label="Sections">
          <span className={styles.railTrack} aria-hidden="true">
            <span className={styles.railFill} ref={railFillRef} />
          </span>
          <ul className={styles.railList}>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={[
                    styles.railLink,
                    active === s.id ? styles.railActive : "",
                  ].join(" ")}
                >
                  <span className={styles.railNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.railLabel}>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.body}>
          {/* Problem */}
          <section id="problem" className={styles.section}>
            <p className={styles.sectionLabel}>Problem</p>
            <p className={styles.prose}>{cs.problem}</p>
          </section>

          {/* Approach */}
          <section id="approach" className={styles.section}>
            <p className={styles.sectionLabel}>Approach</p>
            <p className={styles.prose}>{cs.approach.summary}</p>
            <ol className={styles.decisions}>
              {cs.approach.decisions.map((d, i) => {
                const [head, ...rest] = d.split(":");
                return (
                  <li key={i} className={styles.decision}>
                    <span className={styles.decisionNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.decisionBody}>
                      <span className={styles.decisionHead}>{head}</span>
                      {rest.length > 0 ? <>:{rest.join(":")}</> : null}
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Evidence — real diagram, code, constraint, and what I built. */}
          {proof && (
            <section id="evidence" className={styles.section}>
              <p className={styles.sectionLabel}>Evidence</p>
              {proofBlocks.length > 0 && <ArticleBody blocks={proofBlocks} />}

              {proof.built && proof.built.length > 0 && (
                <div className={styles.built}>
                  <p className={styles.builtLabel}>What I built</p>
                  <ul className={styles.builtList}>
                    {proof.built.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {proof.links && proof.links.length > 0 && (
                <div className={styles.proofLinks}>
                  {proof.links.map((l) =>
                    l.external ? (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.proofLink}
                      >
                        {l.label} ↗
                      </a>
                    ) : (
                      <Link key={l.href} href={l.href} className={styles.proofLink}>
                        {l.label} →
                      </Link>
                    )
                  )}
                </div>
              )}
            </section>
          )}

          {/* Demo — caption server-rendered above the interactive island. */}
          <section id="demo" className={styles.section}>
            <p className={styles.sectionLabel}>Demo</p>
            <p className={styles.prose}>{cs.demo.caption}</p>
            <div className={styles.demoFrame}>{demo}</div>
          </section>

          {/* Technical */}
          <section id="technical" className={styles.section}>
            <p className={styles.sectionLabel}>Technical Detail</p>
            <p className={styles.prose}>{cs.technical}</p>
          </section>

          {/* Outcome */}
          <section id="outcome" className={styles.section}>
            <p className={styles.sectionLabel}>Outcome</p>
            <p className={styles.prose}>{cs.outcome}</p>
            {cs.metrics && (
              <ul className={styles.metrics}>
                {cs.metrics.map((m, i) => (
                  <li key={i} className={styles.metric}>
                    {m}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <Link href="/projects" className={styles.footerLink}>
          ← All Systems
        </Link>
        <Link href="/contact" className={styles.footerCta}>
          Discuss your project →
        </Link>
      </footer>
    </article>
  );
}
