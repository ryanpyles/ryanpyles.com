"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CaseStudy } from "@/content/projectCases";
import Reveal from "./Reveal";
import styles from "./CaseStudyView.module.css";

interface Props {
  cs: CaseStudy;
  demo: React.ReactNode;
  prev?: Pick<CaseStudy, "slug" | "title">;
  next?: Pick<CaseStudy, "slug" | "title">;
}

type Sec = { id: string; label: string };

const SECTIONS: Sec[] = [
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "demo", label: "Demo" },
  { id: "technical", label: "Technical" },
  { id: "outcome", label: "Outcome" },
];

/** Splits "Head: body text" into its two halves for the decision list. */
function splitDecision(d: string): [string, string | null] {
  const i = d.indexOf(":");
  if (i === -1) return [d, null];
  return [d.slice(0, i), d.slice(i + 1)];
}

export default function CaseStudyView({ cs, demo, prev, next }: Props) {
  const articleRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(SECTIONS[0].id);

  // Fall back to the long-form fields when a case study has no staged beats.
  const problemBeats = useMemo(
    () => cs.problemBeats ?? [cs.problem],
    [cs.problemBeats, cs.problem]
  );
  const technicalBeats = useMemo(
    () => cs.technicalBeats ?? [cs.technical],
    [cs.technicalBeats, cs.technical]
  );

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Scroll-spy: whichever section owns the viewport midline.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });

    if (reduced) return () => io.disconnect();

    let raf = 0;
    const update = () => {
      raf = 0;
      // Hero ghost year drifts against the scroll.
      if (heroRef.current) {
        heroRef.current.style.setProperty(
          "--y",
          `${(window.scrollY * 0.18).toFixed(1)}px`
        );
      }
      // Rail fill tracks how far through the article we are.
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
  }, []);

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

          <Reveal slow>
            <h1 className={styles.title}>{cs.title}</h1>
          </Reveal>

          <Reveal delay={120}>
            <p className={styles.tagline}>{cs.tagline}</p>
          </Reveal>

          <Reveal delay={240}>
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
          </Reveal>
        </div>

        <span className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollCueLine} />
        </span>
      </header>

      {/* ── Lede: the thesis, set on its own ─────────────────────── */}
      {cs.lede && (
        <div className={styles.ledeWrap}>
          <Reveal slow>
            <p className={styles.lede}>{cs.lede}</p>
          </Reveal>
        </div>
      )}

      {/* ── Body: sticky rail + staged sections ──────────────────── */}
      <div className={styles.layout}>
        <nav className={styles.rail} aria-label="Sections">
          <span className={styles.railTrack} aria-hidden="true">
            <span className={styles.railFill} ref={railFillRef} />
          </span>
          <ul className={styles.railList}>
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={[
                    styles.railLink,
                    active === s.id ? styles.railActive : "",
                  ].join(" ")}
                  aria-current={active === s.id ? "true" : undefined}
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

        {/* Problem */}
        <section id="problem" className={styles.section}>
          <p className={styles.sectionLabel}>Problem</p>
          {problemBeats.map((b, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className={styles.prose}>{b}</p>
            </Reveal>
          ))}
        </section>

        {/* Approach */}
        <section id="approach" className={styles.section}>
          <p className={styles.sectionLabel}>Approach</p>
          <Reveal>
            <p className={styles.prose}>{cs.approach.summary}</p>
          </Reveal>

          <ol className={styles.decisions}>
            {cs.approach.decisions.map((d, i) => {
              const [head, rest] = splitDecision(d);
              return (
                <Reveal
                  key={i}
                  as="li"
                  delay={i * 110}
                  className={styles.decision}
                >
                  <span className={styles.decisionNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.decisionBody}>
                    {/* The colon is kept so the body, which continues the
                        sentence in lowercase, still reads correctly once the
                        head sits on its own line. Capitalising the body
                        instead would corrupt identifiers like `ryanBooks`. */}
                    <span className={styles.decisionHead}>
                      {head}
                      {rest !== null ? ":" : ""}
                    </span>
                    {rest !== null && (
                      <span className={styles.decisionText}>{rest.trim()}</span>
                    )}
                  </span>
                </Reveal>
              );
            })}
          </ol>
        </section>

        {/* Demo — spans both columns, breaking the reading measure. */}
        <section id="demo" className={styles.demoSection}>
          <div className={styles.demoHead}>
            <p className={styles.sectionLabel}>Demo</p>
            <Reveal>
              <p className={styles.demoCaption}>{cs.demo.caption}</p>
            </Reveal>
          </div>
          <Reveal slow>
            <div className={styles.demoFrame}>{demo}</div>
          </Reveal>
        </section>

        {/* Technical */}
        <section id="technical" className={styles.section}>
          <p className={styles.sectionLabel}>Technical Detail</p>
          {technicalBeats.map((b, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className={styles.prose}>{b}</p>
            </Reveal>
          ))}
          {cs.pullQuote && (
            <Reveal slow>
              <blockquote className={styles.pullQuote}>
                {cs.pullQuote}
              </blockquote>
            </Reveal>
          )}
        </section>

        {/* Outcome */}
        <section id="outcome" className={styles.section}>
          <p className={styles.sectionLabel}>Outcome</p>
          <Reveal>
            <p className={styles.prose}>{cs.outcome}</p>
          </Reveal>
        </section>
      </div>

      {/* ── Figures: the numbers, at scale ───────────────────────── */}
      {cs.figures && cs.figures.length > 0 && (
        <section className={styles.figuresSection}>
          <ul className={styles.figures} role="list">
            {cs.figures.map((f, i) => (
              <Reveal
                key={i}
                as="li"
                delay={i * 110}
                className={styles.figure}
              >
                <span className={styles.figureValue}>
                  {f.value}
                  {f.unit && <span className={styles.figureUnit}>{f.unit}</span>}
                </span>
                <span className={styles.figureLabel}>{f.label}</span>
              </Reveal>
            ))}
          </ul>

          {cs.metrics && cs.metrics.length > 0 && (
            <Reveal>
              <ul className={styles.metrics} role="list">
                {cs.metrics.map((m, i) => (
                  <li key={i} className={styles.metric}>
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </section>
      )}

      {/* Cases with no figures still show their metrics list. */}
      {!cs.figures && cs.metrics && cs.metrics.length > 0 && (
        <section className={styles.figuresSection}>
          <Reveal>
            <ul className={styles.metrics} role="list">
              {cs.metrics.map((m, i) => (
                <li key={i} className={styles.metric}>
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      {/* ── Footer: onward ───────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerNav}>
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className={styles.footerPrev}>
              <span className={styles.footerDir}>← Previous</span>
              <span className={styles.footerTitle}>{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/projects/${next.slug}`} className={styles.footerNext}>
              <span className={styles.footerDir}>Next →</span>
              <span className={styles.footerTitle}>{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </div>

        <div className={styles.footerBar}>
          <Link href="/projects" className={styles.footerLink}>
            ← All Systems
          </Link>
          <Link href="/contact" className={styles.footerCta}>
            Discuss your project →
          </Link>
        </div>
      </footer>
    </article>
  );
}
