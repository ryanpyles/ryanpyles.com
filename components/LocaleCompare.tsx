"use client";

/**
 * Locale-Aware Product System — the comparison lab.
 *
 * The same product fragment rendered in three locales at once, so the
 * difference between translation and localization is visible in one glance:
 * direction flips, dates and numbers and currency reformat, the facet table
 * changes. Every value is produced by the real lib/locale engine over
 * ECMA Intl — nothing is a hardcoded per-locale string. Cells that differ
 * from the reference column (the first) are annotated "changed", which is
 * the "which constraints moved" readout the design review actually needs.
 */

import React, { useMemo, useState } from "react";
import {
  resolveLocale,
  formatDate,
  formatNumber,
  formatCurrency,
  formatTemperature,
  type LocaleContext,
} from "@/lib/locale";
import styles from "./LocaleCompare.module.css";

const LOCALE_OPTIONS: { tag: string; label: string }[] = [
  { tag: "en-US", label: "English (US)" },
  { tag: "en-GB", label: "English (UK)" },
  { tag: "fr-CA", label: "Français (CA)" },
  { tag: "de-DE", label: "Deutsch (DE)" },
  { tag: "es-MX", label: "Español (MX)" },
  { tag: "ja-JP", label: "日本語 (JP)" },
  { tag: "ar-SA", label: "العربية (SA)" },
  { tag: "he-IL", label: "עברית (IL)" },
];

/* One fixed scenario, formatted per locale — an order confirmation. */
const SAMPLE = {
  date: new Date(Date.UTC(2026, 10, 14)),
  quantity: 1240.5,
  price: 1899.0,
  tempC: 21,
};

type FacetKey =
  | "direction"
  | "numberingSystem"
  | "currency"
  | "measurementSystem"
  | "weekStart"
  | "date"
  | "number"
  | "money"
  | "temp";

const WEEKDAYS = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Column {
  tag: string;
  ctx: LocaleContext;
  facets: Record<FacetKey, string>;
}

function buildColumn(tag: string): Column {
  const ctx = resolveLocale(tag);
  return {
    tag,
    ctx,
    facets: {
      direction: ctx.direction.toUpperCase(),
      numberingSystem: ctx.numberingSystem,
      currency: ctx.currency ?? "—",
      measurementSystem: ctx.measurementSystem,
      weekStart: WEEKDAYS[ctx.weekStart] ?? String(ctx.weekStart),
      date: formatDate(SAMPLE.date, ctx, "long"),
      number: formatNumber(SAMPLE.quantity, ctx),
      money: formatCurrency(SAMPLE.price, ctx),
      temp: formatTemperature(SAMPLE.tempC, ctx),
    },
  };
}

const FACET_ROWS: { key: FacetKey; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "number", label: "Quantity" },
  { key: "money", label: "Price" },
  { key: "temp", label: "Temperature" },
  { key: "direction", label: "Direction" },
  { key: "numberingSystem", label: "Numerals" },
  { key: "currency", label: "Currency" },
  { key: "measurementSystem", label: "Units" },
  { key: "weekStart", label: "Week starts" },
];

export default function LocaleCompare() {
  const [tags, setTags] = useState<string[]>(["en-US", "de-DE", "ar-SA"]);

  const columns = useMemo(() => tags.map(buildColumn), [tags]);
  const reference = columns[0];

  function setTag(i: number, tag: string) {
    setTags((cur) => cur.map((t, j) => (j === i ? tag : t)));
  }

  return (
    <section className={styles.wrap} aria-labelledby="locale-compare-title">
      <header className={styles.head}>
        <p className={styles.kicker}>Locale-Aware · comparison lab</p>
        <h2 id="locale-compare-title" className={styles.title}>
          The same product, three markets, side by side.
        </h2>
        <p className={styles.lede}>
          One interface fragment, formatted by the real locale engine over
          ECMA Intl. Change a column and watch direction, dates, numbers, and
          currency resolve. Anything that differs from the first column is
          marked <span className={styles.changedInline}>changed</span> — the
          constraints localization moves that translation never touches.
        </p>
      </header>

      <div className={styles.columns} data-cols={columns.length}>
        {columns.map((col, i) => {
          const isRef = i === 0;
          return (
            <div key={i} className={styles.column}>
              <div className={styles.colHead}>
                <select
                  className={styles.select}
                  value={col.tag}
                  onChange={(e) => setTag(i, e.target.value)}
                  aria-label={`Locale for column ${i + 1}`}
                >
                  {LOCALE_OPTIONS.map((o) => (
                    <option key={o.tag} value={o.tag}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <span className={styles.refTag}>{isRef ? "reference" : "compared"}</span>
              </div>

              {/* The product fragment, in this locale's direction. */}
              <div
                className={styles.card}
                dir={col.ctx.direction}
                lang={col.tag}
              >
                <span className={styles.cardKicker}>Order received</span>
                <span className={styles.cardMoney}>{col.facets.money}</span>
                <dl className={styles.cardMeta}>
                  <div>
                    <dt>Placed</dt>
                    <dd>{col.facets.date}</dd>
                  </div>
                  <div>
                    <dt>Units</dt>
                    <dd>{col.facets.number}</dd>
                  </div>
                  <div>
                    <dt>Warehouse</dt>
                    <dd>{col.facets.temp}</dd>
                  </div>
                </dl>
              </div>

              {/* Facet table with change annotations. */}
              <dl className={styles.facets}>
                {FACET_ROWS.map((row) => {
                  const value = col.facets[row.key];
                  const changed = !isRef && reference.facets[row.key] !== value;
                  return (
                    <div
                      key={row.key}
                      className={[styles.facet, changed ? styles.facetChanged : ""].join(" ")}
                    >
                      <dt className={styles.facetKey}>{row.label}</dt>
                      <dd className={styles.facetVal}>
                        {value}
                        {changed && <span className={styles.changedTag}>changed</span>}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          );
        })}
      </div>

      <footer className={styles.foot}>
        Values via Intl.DateTimeFormat / NumberFormat · resolved from one
        LocaleContext · deterministic
      </footer>
    </section>
  );
}
