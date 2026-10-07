import React from "react";
import Link from "next/link";
import styles from "./HomeArtifacts.module.css";

/**
 * HomeArtifacts — the "selected systems" band. Compact, native plates that
 * show a fragment of each FORMÆTRIX-stack system as evidence (a type specimen,
 * a locale audit, a publishing pipeline) rather than dropping the full
 * interactive demos on the home page. Each plate links to its case study for
 * the live version. Real text, correct RTL, thin-line SVG — no raster.
 */

/* ── Polytype specimen row ──────────────────────────────────────────────── */
const SPECIMENS = [
  { n: "01", lang: "en", dir: "ltr" as const, label: "English / Latin", phrase: "A more open world.", locale: "en-US", lh: "1.5", fallback: "Inter, system-ui" },
  { n: "02", lang: "he", dir: "rtl" as const, label: "עברית / Hebrew", phrase: "עולם פתוח יותר", locale: "he-IL", lh: "1.6", fallback: "Noto Sans Hebrew" },
  { n: "03", lang: "ja", dir: "ltr" as const, label: "日本語 / Japanese", phrase: "より開かれた世界へ", locale: "ja-JP", lh: "1.7", fallback: "Noto Sans CJK JP" },
];

/* ── Locale audit matrix ────────────────────────────────────────────────── */
const MATRIX_COLS = ["EN", "FR", "DE", "ES", "HE", "AR", "JA"];
type Cell = "ok" | "warn" | "fail";
const MATRIX_ROWS: { label: string; cells: Cell[] }[] = [
  { label: "Button", cells: ["ok", "ok", "warn", "ok", "ok", "ok", "ok"] },
  { label: "Navigation", cells: ["ok", "warn", "fail", "ok", "ok", "warn", "ok"] },
  { label: "Form", cells: ["ok", "ok", "ok", "ok", "ok", "ok", "warn"] },
  { label: "Card", cells: ["ok", "ok", "ok", "ok", "ok", "ok", "ok"] },
];
const MARK: Record<Cell, string> = { ok: "✓", warn: "!", fail: "✕" };

export default function HomeArtifacts() {
  return (
    <section className={styles.section} aria-labelledby="artifacts-heading">
      <div className={styles.head}>
        <p className={styles.kicker}>Fig. 05 — Artifacts</p>
        <h2 id="artifacts-heading" className={styles.heading}>
          Selected systems, as evidence
        </h2>
        <p className={styles.sub}>
          Fragments of the working systems. Each links to the full case study
          and its live demo.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Plate A — Polytype specimen */}
        <article className={styles.plate}>
          <header className={styles.plateHead}>
            <span className={styles.plateNo}>A</span>
            <span className={styles.plateTitle}>Polytype — specimen</span>
          </header>
          <ul className={styles.specimens}>
            {SPECIMENS.map((s) => (
              <li key={s.n} className={styles.specimen}>
                <div className={styles.specTop}>
                  <span className={styles.specLabel}>{s.label}</span>
                  <span className={styles.specDir}>{s.dir === "rtl" ? "RTL ←" : "LTR →"}</span>
                </div>
                <p className={styles.specPhrase} lang={s.lang} dir={s.dir}>
                  {s.phrase}
                </p>
                <dl className={styles.specMeta}>
                  <div><dt>locale</dt><dd>{s.locale}</dd></div>
                  <div><dt>line-height</dt><dd>{s.lh}</dd></div>
                  <div><dt>fallback</dt><dd>{s.fallback}</dd></div>
                </dl>
              </li>
            ))}
          </ul>
          <Link href="/projects/polytype" className={styles.plateLink}>
            Polytype →
          </Link>
        </article>

        {/* Plate B — Locale audit matrix */}
        <article className={styles.plate}>
          <header className={styles.plateHead}>
            <span className={styles.plateNo}>B</span>
            <span className={styles.plateTitle}>Locale-aware — audit matrix</span>
          </header>
          <div className={styles.matrixWrap}>
            <table className={styles.matrix}>
              <thead>
                <tr>
                  <th scope="col" className={styles.matrixCorner}>
                    <span className={styles.srOnly}>Component</span>
                  </th>
                  {MATRIX_COLS.map((c) => (
                    <th key={c} scope="col" className={styles.matrixColHead}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className={styles.matrixRowHead}>{r.label}</th>
                    {r.cells.map((cell, i) => (
                      <td key={i} className={styles.matrixCell}>
                        <span className={[styles.mark, styles[`m_${cell}`]].join(" ")} title={cell}>
                          {MARK[cell]}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.matrixNote}>✓ fits · ! tight · ✕ overflows — caught in development.</p>
          <Link href="/projects/locale-aware-product-system" className={styles.plateLink}>
            Locale-Aware Product System →
          </Link>
        </article>

        {/* Plate C — Publish pipeline */}
        <article className={[styles.plate, styles.plateWide].join(" ")}>
          <header className={styles.plateHead}>
            <span className={styles.plateNo}>C</span>
            <span className={styles.plateTitle}>Publish Architecture — one source, many outputs</span>
          </header>
          <svg className={styles.pipeline} viewBox="0 0 560 190" role="img" aria-label="Pipeline: manuscript source and metadata feed a canonical document model that renders to print, EPUB, and web.">
            {/* feeds */}
            <path className={styles.pipeLine} d="M150 40 C 210 40, 230 95, 268 95" fill="none" />
            <path className={styles.pipeLine} d="M150 150 C 210 150, 230 95, 268 95" fill="none" />
            {/* source → model */}
            <line className={styles.pipeLine} x1="92" y1="95" x2="268" y2="95" />
            {/* model → outputs */}
            <path className={styles.pipeLine} d="M330 95 C 380 95, 400 45, 452 45" fill="none" />
            <line className={styles.pipeLine} x1="330" y1="95" x2="452" y2="95" />
            <path className={styles.pipeLine} d="M330 95 C 380 95, 400 145, 452 145" fill="none" />

            {/* nodes */}
            <circle className={styles.pipeJoint} cx="150" cy="40" r="3.5" />
            <circle className={styles.pipeJoint} cx="150" cy="150" r="3.5" />
            <circle className={styles.pipeHub} cx="300" cy="95" r="20" />
            {[45, 95, 145].map((y) => (
              <circle key={y} className={styles.pipeJoint} cx="452" cy={y} r="3.5" />
            ))}

            {/* labels */}
            <text className={styles.pipeText} x="60" y="99">MANUSCRIPT</text>
            <text className={styles.pipeSmall} x="150" y="30" textAnchor="middle">METADATA</text>
            <text className={styles.pipeSmall} x="150" y="168" textAnchor="middle">TOKENS</text>
            <text className={styles.pipeHubText} x="300" y="99" textAnchor="middle">MODEL</text>
            <text className={styles.pipeText} x="462" y="49">PRINT</text>
            <text className={styles.pipeText} x="462" y="99">EPUB</text>
            <text className={styles.pipeText} x="462" y="149">WEB</text>
          </svg>
          <Link href="/projects/publish-architecture" className={styles.plateLink}>
            FORMÆTRIX Publish Architecture →
          </Link>
        </article>
      </div>
    </section>
  );
}
