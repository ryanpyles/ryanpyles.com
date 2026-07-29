import React from "react";
import { Ae } from "./Ae";
import Reveal from "./Reveal";
import styles from "./VoigtEssay.module.css";

const timeline = [
  { year: "2008", label: "Software engineering" },
  { year: "2016", label: "Editorial systems" },
  { year: "2024", label: "Elian Voigt created" },
  { year: "2025", label: "First novels published" },
  { year: "2026", label: "FORMÆTRIX established" },
  { year: "Today", label: "One research program · three public expressions" },
];

export default function VoigtEssay() {
  return (
    <section className={styles.essay} aria-label="The Voigt Project — an ongoing experiment">
      <div className={styles.inner}>
        {/* ── Thesis ─────────────────────────────────────────────────────── */}
        <Reveal>
          <p className={styles.kicker}>The Voigt Project</p>
        </Reveal>
        <Reveal>
          <h2 className={styles.thesis}>
            One maker. Two public identities. One ongoing experiment.
          </h2>
        </Reveal>

        <div className={styles.prose}>
          <Reveal>
            <p>
              For years I found myself writing two kinds of work that demanded
              opposite instincts. Software rewards precision, reduction, and
              explicit reasoning. Literary fiction often rewards omission,
              ambiguity, and structures that reveal themselves only after the
              reader has lived inside them for a while.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Instead of forcing those instincts into a single public voice, I
              separated them.
            </p>
          </Reveal>
        </div>

        {/* ── Methodology couplet ────────────────────────────────────────── */}
        <Reveal>
          <div className={styles.couplet}>
            <div className={styles.coupletSide}>
              <span className={styles.coupletName}>Ryan Pyles</span>
              <span className={styles.coupletVerb}>builds systems.</span>
            </div>
            <span className={styles.coupletDivider} aria-hidden="true" />
            <div className={styles.coupletSide}>
              <span className={styles.coupletName}>Elian Voigt</span>
              <span className={styles.coupletVerb}>tests them.</span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className={styles.aside}>
            The division isn&rsquo;t marketing. It&rsquo;s methodology. Each
            identity protects the other from becoming predictable.
          </p>
        </Reveal>

        {/* ── Why separate them ──────────────────────────────────────────── */}
        <div className={styles.block}>
          <Reveal>
            <h3 className={styles.blockHeading}>Why separate them?</h3>
          </Reveal>
          <div className={styles.prose}>
            <Reveal>
              <p>
                Because audiences read names before they read ideas. Someone
                hiring a software architect expects different evidence than
                someone choosing a literary novel. Separating the identities
                allows each body of work to be judged on its own terms while
                remaining part of the same investigation: how language,
                structure, and formal constraints change human behavior.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <p className={styles.pull}>
              The work is different. The questions are the same.
            </p>
          </Reveal>
        </div>

        {/* ── Timeline ───────────────────────────────────────────────────── */}
        <div className={styles.block}>
          <Reveal>
            <h3 className={styles.blockHeading}>One line, followed</h3>
          </Reveal>
          <ol className={styles.timeline}>
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 70}>
                <li className={styles.timelineRow}>
                  <span className={styles.timelineYear}>{t.year}</span>
                  <span className={styles.timelineDot} aria-hidden="true" />
                  <span className={styles.timelineLabel}>{t.label}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ── What transfers ─────────────────────────────────────────────── */}
        <div className={styles.block}>
          <Reveal>
            <h3 className={styles.blockHeading}>What crosses the boundary?</h3>
          </Reveal>
          <div className={styles.prose}>
            <Reveal>
              <p>
                Software taught me that every complex system eventually exposes
                its assumptions. Fiction taught me that people do the same. The
                continuity tools I build began as problems inside novels. My
                typography comes from publishing. My publishing systems come
                from engineering. Language study informs all of it.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <p className={styles.pull}>
              The boundaries are practical. The research is shared.
            </p>
          </Reveal>
        </div>

        {/* ── Identity diagram ───────────────────────────────────────────── */}
        <Reveal>
          <figure className={styles.diagram}>
            <svg
              viewBox="0 0 680 460"
              className={styles.diagramSvg}
              role="img"
              aria-label="One body of work with three interfaces: language, research, and systems feed Ryan Pyles, who works through FORMÆTRIX (infrastructure) and Elian Voigt (fiction), both feeding a shared narrative research."
            >
              <g className={styles.diagramLines}>
                {/* feeders → Ryan */}
                <path d="M120 70 L340 150" />
                <path d="M340 62 L340 150" />
                <path d="M560 70 L340 150" />
                {/* Ryan → branches */}
                <path d="M340 190 L180 270" />
                <path d="M340 190 L500 270" />
                {/* branches → narrative research */}
                <path d="M180 310 L340 390" />
                <path d="M500 310 L340 390" />
              </g>

              <g className={styles.diagramFeeders}>
                <text x="120" y="56" textAnchor="middle">Language</text>
                <text x="340" y="48" textAnchor="middle">Research</text>
                <text x="560" y="56" textAnchor="middle">Systems</text>
              </g>

              <g>
                <text x="340" y="168" textAnchor="middle" className={styles.diagramCore}>
                  Ryan Pyles
                </text>

                <text x="180" y="290" textAnchor="middle" className={styles.diagramNode}>
                  FORMÆTRIX
                </text>
                <text x="180" y="308" textAnchor="middle" className={styles.diagramSub}>
                  Infrastructure
                </text>

                <text x="500" y="290" textAnchor="middle" className={styles.diagramNode}>
                  Elian Voigt
                </text>
                <text x="500" y="308" textAnchor="middle" className={styles.diagramSub}>
                  Fiction
                </text>

                <text x="340" y="412" textAnchor="middle" className={styles.diagramCore}>
                  Narrative research
                </text>
              </g>
            </svg>
            <figcaption className={styles.diagramCaption}>
              Not competing brands — different interfaces to the same body of work.
            </figcaption>
          </figure>
        </Reveal>

        {/* ── Conclusion ─────────────────────────────────────────────────── */}
        <div className={styles.block}>
          <Reveal>
            <h3 className={styles.blockHeading}>The experiment continues</h3>
          </Reveal>
          <div className={styles.prose}>
            <Reveal>
              <p>
                The goal has never been to keep Ryan Pyles and Elian Voigt
                permanently separate. The goal is to discover what each can
                learn from the other without collapsing into the same voice.
              </p>
            </Reveal>
            <Reveal>
              <p>
                Every novel changes the software. Every software project changes
                the writing. The separation exists because the exchange matters.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── Doors out ──────────────────────────────────────────────────── */}
        <Reveal>
          <div className={styles.doors}>
            <a
              href="https://www.formaetrix.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.door}
              aria-label="Visit FORMÆTRIX — the studio site"
            >
              FORM<Ae />TRIX →
            </a>
            <a
              href="https://www.elianvoigt.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.door}
              aria-label="Visit Elian Voigt — the fiction site"
            >
              Elian Voigt →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
