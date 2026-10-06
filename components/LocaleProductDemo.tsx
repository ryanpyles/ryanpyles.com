"use client";

/**
 * Locale-Aware Product System — the demo. Drives the real engine in
 * lib/locale (and reuses Polytype for the expansion matrix). Pick a locale
 * and the same components resolve a different context, format differently,
 * reorder their forms, and flip direction — locale as product behavior, not
 * translated copy.
 */

import React, { useEffect, useMemo, useState } from "react";
import {
  resolveLocale,
  formatDate,
  formatNumber,
  formatCurrency,
  formatTemperature,
  formatDistance,
  addressSchema,
  ADDRESS_COUNTRIES,
  familyNameFirst,
  MIRROR,
  DO_NOT_MIRROR,
  LOGICAL_PROPERTY_MAP,
} from "@/lib/locale";
import { measureTranslationRisk, type RiskLevel } from "@/lib/polytype";
import styles from "./LocaleProductDemo.module.css";

type Tab = "context" | "forms" | "matrix" | "direction";

const LOCALES: { tag: string; label: string }[] = [
  { tag: "en-US", label: "English (US)" },
  { tag: "en-GB", label: "English (UK)" },
  { tag: "fr-CA", label: "Français (CA)" },
  { tag: "de-DE", label: "Deutsch (DE)" },
  { tag: "es-MX", label: "Español (MX)" },
  { tag: "ja-JP", label: "日本語 (JP)" },
  { tag: "ar-SA", label: "العربية (SA)" },
  { tag: "he-IL", label: "עברית (IL)" },
];

const SAMPLE_DATE = new Date(Date.UTC(2026, 10, 14));

export default function LocaleProductDemo() {
  const [tab, setTab] = useState<Tab>("context");
  return (
    <div className={styles.demo}>
      <div className={styles.tabs} role="tablist">
        {(
          [
            ["context", "Locale context"],
            ["forms", "Forms"],
            ["matrix", "Locale matrix"],
            ["direction", "Direction & RTL"],
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
      {tab === "context" && <ContextPanel />}
      {tab === "forms" && <FormsPanel />}
      {tab === "matrix" && <MatrixPanel />}
      {tab === "direction" && <DirectionPanel />}
    </div>
  );
}

/* ── Locale context ────────────────────────────────────────────────────── */
function ContextPanel() {
  const [tag, setTag] = useState("he-IL");
  const ctx = useMemo(() => resolveLocale(tag), [tag]);

  const formatted: [string, string][] = [
    ["date", formatDate(SAMPLE_DATE, ctx)],
    ["number", formatNumber(1234567.89, ctx)],
    ["price", formatCurrency(1299.99, ctx)],
    ["temperature", formatTemperature(22, ctx)],
    ["distance", formatDistance(8, ctx)],
  ];

  const facts: [string, string][] = [
    ["language", ctx.language],
    ["script", ctx.script],
    ["region", ctx.region ?? "—"],
    ["direction", ctx.direction],
    ["currency", ctx.currency ?? "—"],
    ["numbering", ctx.numberingSystem],
    ["measurement", ctx.measurementSystem],
    ["week starts", ctx.weekStart === 7 ? "Sunday" : "Monday"],
  ];

  return (
    <div className={styles.panel}>
      <LocaleSelect tag={tag} onChange={setTag} />
      <dl className={styles.grid}>
        {facts.map(([k, v]) => (
          <div key={k} className={styles.cell}>
            <dt className={styles.key}>{k}</dt>
            <dd className={styles.val}>{v}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.formatted}>
        <span className={styles.subLabel}>Same values, formatted for this locale</span>
        <ul className={styles.fmtList}>
          {formatted.map(([k, v]) => (
            <li key={k} className={styles.fmtRow}>
              <span className={styles.fmtKey}>{k}</span>
              <span className={styles.fmtVal} dir={ctx.direction}>{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Forms ─────────────────────────────────────────────────────────────── */
function FormsPanel() {
  const [country, setCountry] = useState("JP");
  const schema = useMemo(() => addressSchema(country), [country]);
  const lang = country === "JP" ? "ja" : country === "DE" ? "de" : "en";
  const famFirst = familyNameFirst(lang);

  return (
    <div className={styles.panel}>
      <label className={styles.control}>
        <span className={styles.controlLabel}>Country</span>
        <select className={styles.select} value={country} onChange={(e) => setCountry(e.target.value)}>
          {ADDRESS_COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.formPreview}>
        <span className={styles.subLabel}>Address schema — field order from the country</span>
        <ol className={styles.formFields}>
          {schema.map((f, i) => (
            <li key={f.key} className={styles.formField}>
              <span className={styles.formNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.formLabel}>
                {f.label}
                {f.required && <span className={styles.req}>required</span>}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.nameModel}>
        <span className={styles.subLabel}>Name model</span>
        <p className={styles.nameLine}>
          Order: <strong>{famFirst ? "family · given" : "given · family"}</strong> — stored
          structurally, displayed per locale. The authoritative field is the name the
          person actually writes, never a reconstruction.
        </p>
      </div>
    </div>
  );
}

/* ── Locale matrix (reuses Polytype's expansion forecast) ──────────────── */
const MATRIX_COMPONENTS: { name: string; budget: number; t: Record<string, string> }[] = [
  {
    name: "Checkout CTA",
    budget: 150,
    t: {
      "en-US": "Continue to checkout",
      "fr-FR": "Passer à la caisse",
      "de-DE": "Weiter zur Kasse",
      "es-MX": "Continuar al pago",
      "he-IL": "המשך לקופה",
      "ar-SA": "متابعة الدفع",
      "ja-JP": "レジに進む",
    },
  },
  {
    name: "Settings label",
    budget: 120,
    t: {
      "en-US": "Account settings",
      "fr-FR": "Paramètres du compte",
      "de-DE": "Kontoeinstellungen",
      "es-MX": "Configuración de la cuenta",
      "he-IL": "הגדרות חשבון",
      "ar-SA": "إعدادات الحساب",
      "ja-JP": "アカウント設定",
    },
  },
];

const MATRIX_LOCALES = ["en-US", "fr-FR", "de-DE", "es-MX", "he-IL", "ar-SA", "ja-JP"];

function MatrixPanel() {
  const [measure, setMeasure] = useState<((t: string) => number) | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const c = canvas.getContext("2d");
    if (!c) return;
    c.font = "600 15px Manrope, Inter, system-ui, sans-serif";
    setMeasure(() => (t: string) => c.measureText(t).width);
  }, []);

  const rows = useMemo(() => {
    return MATRIX_COMPONENTS.map((comp) => {
      const report = measureTranslationRisk(comp.t, {
        budget: comp.budget,
        fontSizePx: 15,
        measure: measure ?? undefined,
        warnBand: 0.1,
      });
      const byLocale = new Map<string, RiskLevel>(report.rows.map((r) => [r.locale, r.level]));
      return { name: comp.name, byLocale };
    });
  }, [measure]);

  return (
    <div className={styles.panel}>
      <span className={styles.subLabel}>
        Every component × locale, overflow measured live (via Polytype)
      </span>
      <div className={styles.matrixWrap}>
        <table className={styles.matrix}>
          <thead>
            <tr>
              <th className={styles.matrixCorner} />
              {MATRIX_LOCALES.map((l) => (
                <th key={l} className={styles.matrixHead}>
                  {l.split("-")[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <th className={styles.matrixRowHead}>{r.name}</th>
                {MATRIX_LOCALES.map((l) => {
                  const lvl = r.byLocale.get(l) ?? "pass";
                  return (
                    <td key={l} className={styles.matrixCell}>
                      <span className={[styles.dot, styles[`d_${lvl}`]].join(" ")}>
                        {lvl === "pass" ? "✓" : lvl === "warn" ? "!" : "✕"}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.note}>
        ✓ fits · ! within 10% · ✕ overflows. The failures surface during development,
        not after a market launch.
      </p>
    </div>
  );
}

/* ── Direction & RTL ───────────────────────────────────────────────────── */
function DirectionPanel() {
  const [dir, setDir] = useState<"ltr" | "rtl">("rtl");

  return (
    <div className={styles.panel}>
      <div className={styles.dirToggle}>
        <span className={styles.controlLabel}>Document direction</span>
        <div className={styles.segmented}>
          {(["ltr", "rtl"] as const).map((d) => (
            <button
              key={d}
              className={[styles.segBtn, dir === d ? styles.segBtnActive : ""].join(" ")}
              onClick={() => setDir(d)}
            >
              {d.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* A toolbar built with logical properties — mirrors from dir outward. */}
      <div className={styles.toolbar} dir={dir}>
        <button className={styles.tbBack} aria-label="Back">
          <span className={styles.tbArrow}>→</span>
        </button>
        <span className={styles.tbTitle}>{dir === "rtl" ? "الإعدادات" : "Settings"}</span>
        <button className={styles.tbMenu} aria-label="Menu">⋯</button>
      </div>
      <p className={styles.note}>
        Built with <code>margin-inline-start</code> / <code>inset-inline-end</code> — the
        layout mirrors from the document direction, no RTL stylesheet.
      </p>

      <div className={styles.rtlCols}>
        <div className={styles.rtlCol}>
          <span className={styles.subLabel}>Mirror</span>
          <ul className={styles.rtlList}>
            {MIRROR.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div className={styles.rtlCol}>
          <span className={styles.subLabel}>Do not mirror</span>
          <ul className={styles.rtlList}>
            {DO_NOT_MIRROR.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.lint}>
        <span className={styles.subLabel}>Physical-property lint</span>
        <ul className={styles.lintList}>
          {LOGICAL_PROPERTY_MAP.slice(0, 5).map((f) => (
            <li key={f.physical} className={styles.lintRow}>
              <code className={styles.lintBad}>{f.physical}</code>
              <span className={styles.lintArrow}>→</span>
              <code className={styles.lintGood}>{f.logical}</code>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── shared ────────────────────────────────────────────────────────────── */
function LocaleSelect({ tag, onChange }: { tag: string; onChange: (t: string) => void }) {
  return (
    <label className={styles.control}>
      <span className={styles.controlLabel}>Locale</span>
      <select className={styles.select} value={tag} onChange={(e) => onChange(e.target.value)}>
        {LOCALES.map((l) => (
          <option key={l.tag} value={l.tag}>
            {l.label} · {l.tag}
          </option>
        ))}
      </select>
    </label>
  );
}
