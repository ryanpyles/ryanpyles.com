"use client";

/**
 * Polytype Studio — the live demo. It drives the real engine in lib/polytype:
 * every policy, script run, coverage audit, and overflow verdict on screen is
 * computed here in the browser, not mocked. The expansion matrix measures
 * actual rendered pixels with canvas measureText, so the "one that breaks"
 * is genuinely breaking in the viewer's own browser.
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Polytype,
  detectScripts,
  type ScriptName,
  type RiskLevel,
} from "@/lib/polytype";
import styles from "./PolytypeStudio.module.css";

const engine = new Polytype({ defaultLocale: "en-US" });

type Tab = "expand" | "resolve" | "scripts" | "pseudo";

/* ── Expansion demo data — common UI strings across locales ─────────────── */
const UI_STRINGS: Record<string, Record<string, string>> = {
  "Save changes": {
    "en-US": "Save changes",
    "es-ES": "Guardar cambios",
    "de-DE": "Änderungen speichern",
    "fr-FR": "Enregistrer les modifications",
    "he-IL": "שמור שינויים",
    "ja-JP": "変更を保存",
  },
  "Continue to checkout": {
    "en-US": "Continue to checkout",
    "es-ES": "Continuar al pago",
    "de-DE": "Weiter zur Kasse",
    "fr-FR": "Passer à la caisse",
    "he-IL": "המשך לקופה",
    "ja-JP": "レジに進む",
  },
  Settings: {
    "en-US": "Settings",
    "es-ES": "Configuración",
    "de-DE": "Einstellungen",
    "fr-FR": "Paramètres",
    "he-IL": "הגדרות",
    "ja-JP": "設定",
  },
};

const LOCALE_LABELS: Record<string, string> = {
  "en-US": "English",
  "es-ES": "Español",
  "de-DE": "Deutsch",
  "fr-FR": "Français",
  "he-IL": "עברית",
  "ja-JP": "日本語",
};

const SCRIPT_HUES: Partial<Record<ScriptName, number>> = {
  Latin: 28,
  Hebrew: 200,
  Arabic: 150,
  Han: 330,
  Kana: 280,
  Hangul: 250,
  Cyrillic: 95,
  Greek: 55,
  Devanagari: 12,
  Thai: 175,
  Common: 0,
};

function levelClass(level: RiskLevel): string {
  return level === "pass"
    ? styles.pass
    : level === "warn"
    ? styles.warn
    : styles.fail;
}

export default function PolytypeStudio() {
  const [tab, setTab] = useState<Tab>("expand");

  return (
    <div className={styles.studio}>
      <div className={styles.tabs} role="tablist" aria-label="Polytype Studio">
        {(
          [
            ["expand", "Expansion matrix"],
            ["resolve", "Policy resolver"],
            ["scripts", "Script analysis"],
            ["pseudo", "Pseudo-localize"],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={[styles.tab, tab === id ? styles.tabActive : ""].join(" ")}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "expand" && <ExpandPanel />}
      {tab === "resolve" && <ResolvePanel />}
      {tab === "scripts" && <ScriptsPanel />}
      {tab === "pseudo" && <PseudoPanel />}
    </div>
  );
}

/* ── Expansion matrix: the signature view ──────────────────────────────── */
function ExpandPanel() {
  const [key, setKey] = useState<string>("Save changes");
  const [budget, setBudget] = useState<number>(132);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [measure, setMeasure] = useState<((t: string) => number) | null>(null);

  const translations = UI_STRINGS[key];

  // Build a canvas measurer once mounted — real rendered pixels, this browser.
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.font = "600 15px Manrope, Inter, system-ui, sans-serif";
    canvasRef.current = canvas;
    setMeasure(() => (t: string) => ctx.measureText(t).width);
  }, []);

  const report = useMemo(() => {
    return engine.forecast(translations, {
      budget,
      fontSizePx: 15,
      measure: measure ?? undefined,
      warnBand: 0.1,
    });
  }, [translations, budget, measure]);

  return (
    <div className={styles.panel}>
      <div className={styles.controls}>
        <label className={styles.control}>
          <span className={styles.controlLabel}>UI string</span>
          <select
            className={styles.select}
            value={key}
            onChange={(e) => setKey(e.target.value)}
          >
            {Object.keys(UI_STRINGS).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.control}>
          <span className={styles.controlLabel}>
            Button width — {budget}px
          </span>
          <input
            className={styles.range}
            type="range"
            min={72}
            max={260}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </label>
      </div>

      {/* The six renderings. The ones over budget clip — the point of the demo. */}
      <div className={styles.buttonGrid}>
        {report.rows
          .slice()
          .sort((a, b) =>
            Object.keys(translations).indexOf(a.locale) -
            Object.keys(translations).indexOf(b.locale)
          )
          .map((row) => {
            const rtl = row.locale === "he-IL";
            return (
              <div key={row.locale} className={styles.buttonCell}>
                <div className={styles.buttonMeta}>
                  <span>{LOCALE_LABELS[row.locale] ?? row.locale}</span>
                  <span className={[styles.badge, levelClass(row.level)].join(" ")}>
                    {row.level.toUpperCase()} · {row.width}px
                  </span>
                </div>
                <div
                  className={styles.fakeButton}
                  style={{ width: budget }}
                  dir={rtl ? "rtl" : "ltr"}
                  data-over={row.level !== "pass"}
                >
                  <span className={styles.fakeButtonText}>{row.text}</span>
                </div>
              </div>
            );
          })}
      </div>

      <p className={styles.recommendation}>
        <span className={styles.recLabel}>Recommendation</span>
        {report.recommendation}
      </p>
    </div>
  );
}

/* ── Policy resolver ───────────────────────────────────────────────────── */
const RESOLVE_SAMPLES: { locale: string; text: string }[] = [
  { locale: "en-US", text: "Multilingual systems, resolved before render." },
  { locale: "he-IL", text: "מערכות רב־לשוניות נפתרות לפני ההצגה." },
  { locale: "ar-SA", text: "أنظمة متعددة اللغات تُحسم قبل العرض." },
  { locale: "ja-JP", text: "多言語システムは描画前に解決される。" },
  { locale: "de-DE", text: "Mehrsprachige Systeme, vor dem Rendern aufgelöst." },
];

function ResolvePanel() {
  const [idx, setIdx] = useState(1);
  const [contentType, setContentType] = useState<
    "body" | "heading" | "label" | "navigation" | "data"
  >("heading");

  const { locale, text } = RESOLVE_SAMPLES[idx];
  const policy = useMemo(
    () => engine.resolve({ locale, contentType, sample: text }),
    [locale, text, contentType]
  );

  return (
    <div className={styles.panel}>
      <div className={styles.controls}>
        <label className={styles.control}>
          <span className={styles.controlLabel}>Locale &amp; sample</span>
          <select
            className={styles.select}
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
          >
            {RESOLVE_SAMPLES.map((s, i) => (
              <option key={s.locale} value={i}>
                {s.locale}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.control}>
          <span className={styles.controlLabel}>Content type</span>
          <select
            className={styles.select}
            value={contentType}
            onChange={(e) =>
              setContentType(e.target.value as typeof contentType)
            }
          >
            {["body", "heading", "label", "navigation", "data"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        className={styles.sample}
        dir={policy.direction}
        style={{
          fontFamily: policy.fontFamily.join(", "),
          fontSize: policy.fontSize,
          lineHeight: policy.lineHeight,
          letterSpacing: `${policy.letterSpacing}em`,
          textAlign: policy.direction === "rtl" ? "right" : "left",
        }}
      >
        {text}
      </div>

      <dl className={styles.policy}>
        {(
          [
            ["script", policy.script],
            ["direction", policy.direction],
            ["font", policy.fontFamily[0]],
            ["size", `${policy.fontSize}px`],
            ["line-height", policy.lineHeight],
            ["letter-spacing", `${policy.letterSpacing}em`],
            ["hyphenation", policy.hyphenation ? "auto" : "none"],
            ["line-break", policy.lineBreak],
            ["overflow", policy.overflowStrategy],
          ] as [string, React.ReactNode][]
        ).map(([k, v]) => (
          <div key={k} className={styles.policyRow}>
            <dt className={styles.policyKey}>{k}</dt>
            <dd className={styles.policyVal}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ── Script analysis ───────────────────────────────────────────────────── */
function ScriptsPanel() {
  const [text, setText] = useState("FORMÆTRIX — שלום 日本語 2026 Ελληνικά");
  const runs = useMemo(() => detectScripts(text), [text]);
  const audit = useMemo(() => engine.audit(text), [text]);

  return (
    <div className={styles.panel}>
      <label className={styles.control}>
        <span className={styles.controlLabel}>Mixed-script sample</span>
        <input
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />
      </label>

      <div className={styles.runs}>
        {runs.map((run, i) => (
          <span
            key={i}
            className={styles.run}
            dir={run.script === "Hebrew" || run.script === "Arabic" ? "rtl" : "ltr"}
            style={{
              background: `hsl(${SCRIPT_HUES[run.script] ?? 0} ${
                run.script === "Common" ? 0 : 55
              }% 52% / 0.16)`,
              borderColor: `hsl(${SCRIPT_HUES[run.script] ?? 0} ${
                run.script === "Common" ? 0 : 55
              }% 60% / 0.5)`,
            }}
            title={`${run.script} · [${run.range[0]}, ${run.range[1]})`}
          >
            <span className={styles.runText}>{run.text}</span>
            <span className={styles.runLabel}>{run.script}</span>
          </span>
        ))}
      </div>

      <div className={styles.audit}>
        <span className={styles.auditLabel}>
          Coverage audit — primary face {audit.primary}
        </span>
        {audit.fallbacks.length > 0 ? (
          <ul className={styles.fallbacks}>
            {audit.fallbacks.map((f) => (
              <li key={f} className={styles.fallback}>
                {f}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.auditClean}>
            {audit.primary} covers every script in this sample.
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Pseudo-localization ───────────────────────────────────────────────── */
function PseudoPanel() {
  const [text, setText] = useState("Save changes");
  const pseudo = useMemo(() => engine.pseudo(text, { expand: 0.4 }), [text]);
  const growth = Math.round(
    (([...pseudo].length - [...text].length) / Math.max(1, [...text].length)) *
      100
  );

  return (
    <div className={styles.panel}>
      <label className={styles.control}>
        <span className={styles.controlLabel}>Source string</span>
        <input
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />
      </label>

      <div className={styles.pseudoRows}>
        <div className={styles.pseudoRow}>
          <span className={styles.pseudoTag}>source</span>
          <span className={styles.pseudoText}>{text}</span>
        </div>
        <div className={styles.pseudoRow}>
          <span className={styles.pseudoTag}>pseudo</span>
          <span className={styles.pseudoText}>{pseudo}</span>
        </div>
      </div>

      <p className={styles.recommendation}>
        <span className={styles.recLabel}>+{growth}% length</span>
        Accents and padding simulate real expansion, exposing clipping and
        hardcoded widths before a single string is translated.
      </p>
    </div>
  );
}
