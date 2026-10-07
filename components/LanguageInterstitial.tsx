import React from "react";
import styles from "./LanguageInterstitial.module.css";

/**
 * Full-width interstitial that resets the eye between major sections. The
 * phrase is the argument; the four script specimens around it are the
 * evidence. Everything is real, selectable text with correct lang/dir — no
 * raster. Motion is a barely-perceptible float on the glyphs, disabled under
 * reduced-motion. Strong negative space is the point.
 */

const SPECIMENS = [
  { cls: "sp1", glyph: "言", lang: "ja", dir: "ltr" as const, name: "Japanese", roman: "gengo" },
  { cls: "sp2", glyph: "שפה", lang: "he", dir: "rtl" as const, name: "Hebrew", roman: "safah" },
  { cls: "sp3", glyph: "لغة", lang: "ar", dir: "rtl" as const, name: "Arabic", roman: "lugha" },
  { cls: "sp4", glyph: "語", lang: "ja", dir: "ltr" as const, name: "Japanese", roman: "kata" },
];

export default function LanguageInterstitial() {
  return (
    <section className={styles.panel} aria-label="Language is load-bearing">
      <span className={styles.fig} aria-hidden="true">Fig. 03 — Interstitial</span>

      <div className={styles.specimens} aria-hidden="false">
        {SPECIMENS.map((s) => (
          <div key={s.cls + s.roman} className={[styles.specimen, styles[s.cls]].join(" ")}>
            <span className={styles.glyph} lang={s.lang} dir={s.dir}>
              {s.glyph}
            </span>
            <span className={styles.specName}>{s.name}</span>
            <span className={styles.specRoman}>{s.roman}</span>
          </div>
        ))}
      </div>

      <div className={styles.center}>
        <span className={styles.crosshair} aria-hidden="true" />
        <p className={styles.flankLeft} aria-hidden="true">Different scripts. A shared humanity.</p>
        <h2 className={styles.phrase}>
          <span>Language is</span>
          <span>load&#8209;bearing</span>
        </h2>
        <p className={styles.flankRight} aria-hidden="true">
          Language extends human potential across time and space.
        </p>
      </div>
    </section>
  );
}
