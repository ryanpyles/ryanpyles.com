import React from "react";
import styles from "./PageBackground.module.css";

export type BgVariant =
  | "fiction"
  | "research"
  | "systems"
  | "field-notes"
  | "about"
  | "contact"
  | "book"
  | "project";

const INK = "var(--ink)";
const ACCENT = "var(--oxide)";

/* ─── Fiction / Books ────────────────────────────────────────────────────────
   A well-annotated reading copy: brackets, asterisks, proofreader marks,
   dog-eared corner, a stet curl, underlines in the margins.              */
function FictionBg() {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke={INK} strokeOpacity="0.055" aria-hidden>
      {/* Dog-eared top-right corner */}
      <polyline points="1380,0 1440,60 1440,0" fill={INK} fillOpacity="0.04" stroke="none" />
      <line x1="1380" y1="0" x2="1440" y2="60" strokeOpacity="0.07" />

      {/* Left margin rule */}
      <line x1="88" y1="120" x2="88" y2="820" strokeOpacity="0.06" strokeDasharray="2 6" />

      {/* Annotation bracket — upper */}
      <path d="M72,190 L60,190 L60,310 L72,310" strokeLinecap="round" strokeLinejoin="round" className={`${styles.draw} ${styles.draw2}`} />
      <text x="44" y="256" fontSize="11" fontFamily="serif" fill={INK} fillOpacity="0.055" stroke="none" textAnchor="middle" transform="rotate(-90 44 256)">nota bene</text>

      {/* Annotation bracket — lower */}
      <path d="M72,480 L60,480 L60,570 L72,570" strokeLinecap="round" strokeLinejoin="round" className={`${styles.draw} ${styles.draw4}`} />

      {/* Asterisks scattered */}
      <text x="108" y="250" fontSize="18" fontFamily="serif" fill={INK} fillOpacity="0.07" stroke="none">*</text>
      <text x="108" y="530" fontSize="18" fontFamily="serif" fill={INK} fillOpacity="0.06" stroke="none">†</text>
      <text x="1320" y="340" fontSize="16" fontFamily="serif" fill={INK} fillOpacity="0.05" stroke="none">*</text>
      <text x="1310" y="620" fontSize="22" fontFamily="serif" fill={INK} fillOpacity="0.05" stroke="none">¶</text>

      {/* Right margin annotation underlines */}
      <line x1="1290" y1="295" x2="1390" y2="295" strokeOpacity="0.05" />
      <line x1="1300" y1="308" x2="1380" y2="308" strokeOpacity="0.04" />
      <line x1="1295" y1="580" x2="1400" y2="580" strokeOpacity="0.05" />

      {/* Stet proofreader's mark (dotted underline with "stet") */}
      <line x1="200" y1="748" x2="360" y2="748" strokeDasharray="3 3" strokeOpacity="0.05" />
      <text x="270" y="765" fontSize="9" fontFamily="monospace" fill={INK} fillOpacity="0.06" stroke="none" textAnchor="middle">stet</text>

      {/* Caret insertion mark */}
      <path d="M680,702 L692,720 L704,702" strokeOpacity="0.055" strokeLinejoin="round" />

      {/* Deletion mark (single strikethrough line) */}
      <line x1="820" y1="380" x2="960" y2="380" strokeOpacity="0.04" />
      <line x1="830" y1="374" x2="950" y2="386" strokeOpacity="0.035" />

      {/* Bottom-left folio */}
      <text x="64" y="858" fontSize="9" fontFamily="monospace" fill={INK} fillOpacity="0.07" stroke="none" letterSpacing="0.12em">— 1 —</text>
    </svg>
  );
}

/* ─── Research / Archive ─────────────────────────────────────────────────────
   A taxonomic classification tree drawing itself top-down, with terminal
   boxes and small Dewey decimal–style labels.                             */
function ResearchBg() {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke={INK} strokeOpacity="0.06" aria-hidden>
      {/* Trunk */}
      <line x1="720" y1="60" x2="720" y2="180" className={styles.draw} />

      {/* Level 1 branch horizontal */}
      <line x1="440" y1="180" x2="1000" y2="180" className={`${styles.draw} ${styles.draw2}`} />

      {/* Level 1 stems down */}
      <line x1="440" y1="180" x2="440" y2="300" className={`${styles.draw} ${styles.draw3}`} />
      <line x1="720" y1="180" x2="720" y2="300" className={`${styles.draw} ${styles.draw3}`} />
      <line x1="1000" y1="180" x2="1000" y2="300" className={`${styles.draw} ${styles.draw3}`} />

      {/* Level 1 terminal boxes */}
      <rect x="390" y="300" width="100" height="36" className={`${styles.fadeIn} ${styles.fadeIn2}`} />
      <rect x="670" y="300" width="100" height="36" className={`${styles.fadeIn} ${styles.fadeIn2}`} />
      <rect x="950" y="300" width="100" height="36" className={`${styles.fadeIn} ${styles.fadeIn2}`} />

      {/* Label text */}
      <text x="440" y="323" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.07" stroke="none" textAnchor="middle" className={`${styles.fadeIn} ${styles.fadeIn2}`}>001.1</text>
      <text x="720" y="323" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.07" stroke="none" textAnchor="middle" className={`${styles.fadeIn} ${styles.fadeIn2}`}>001.2</text>
      <text x="1000" y="323" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.07" stroke="none" textAnchor="middle" className={`${styles.fadeIn} ${styles.fadeIn2}`}>001.3</text>

      {/* Level 2 from left branch */}
      <line x1="440" y1="336" x2="440" y2="420" className={`${styles.draw} ${styles.draw4}`} />
      <line x1="310" y1="420" x2="570" y2="420" className={`${styles.draw} ${styles.draw4}`} />
      <line x1="310" y1="420" x2="310" y2="510" className={`${styles.draw} ${styles.draw5}`} />
      <line x1="570" y1="420" x2="570" y2="510" className={`${styles.draw} ${styles.draw5}`} />
      <rect x="265" y="510" width="90" height="30" className={`${styles.fadeIn} ${styles.fadeIn3}`} />
      <rect x="525" y="510" width="90" height="30" className={`${styles.fadeIn} ${styles.fadeIn3}`} />
      <text x="310" y="530" fontSize="7" fontFamily="monospace" fill={INK} fillOpacity="0.06" stroke="none" textAnchor="middle" className={`${styles.fadeIn} ${styles.fadeIn3}`}>002.1</text>
      <text x="570" y="530" fontSize="7" fontFamily="monospace" fill={INK} fillOpacity="0.06" stroke="none" textAnchor="middle" className={`${styles.fadeIn} ${styles.fadeIn3}`}>002.2</text>

      {/* Level 2 from right branch */}
      <line x1="1000" y1="336" x2="1000" y2="420" className={`${styles.draw} ${styles.draw4}`} />
      <line x1="880" y1="420" x2="1120" y2="420" className={`${styles.draw} ${styles.draw4}`} />
      <line x1="880" y1="420" x2="880" y2="510" className={`${styles.draw} ${styles.draw5}`} />
      <line x1="1120" y1="420" x2="1120" y2="510" className={`${styles.draw} ${styles.draw5}`} />
      <rect x="835" y="510" width="90" height="30" className={`${styles.fadeIn} ${styles.fadeIn3}`} />
      <rect x="1075" y="510" width="90" height="30" className={`${styles.fadeIn} ${styles.fadeIn3}`} />
      <text x="880" y="530" fontSize="7" fontFamily="monospace" fill={INK} fillOpacity="0.06" stroke="none" textAnchor="middle" className={`${styles.fadeIn} ${styles.fadeIn3}`}>004.1</text>
      <text x="1120" y="530" fontSize="7" fontFamily="monospace" fill={INK} fillOpacity="0.06" stroke="none" textAnchor="middle" className={`${styles.fadeIn} ${styles.fadeIn3}`}>004.2</text>

      {/* Corner catalog card outlines */}
      <rect x="24" y="780" width="120" height="80" rx="1" strokeDasharray="4 4" strokeOpacity="0.05" />
      <line x1="24" y1="800" x2="144" y2="800" strokeOpacity="0.04" />
      <text x="32" y="814" fontSize="7" fontFamily="monospace" fill={INK} fillOpacity="0.06" stroke="none">Author</text>
      <text x="32" y="826" fontSize="7" fontFamily="monospace" fill={INK} fillOpacity="0.05" stroke="none">Subject</text>
      <text x="32" y="838" fontSize="7" fontFamily="monospace" fill={INK} fillOpacity="0.05" stroke="none">Call no.</text>

      <rect x="1296" y="780" width="120" height="80" rx="1" strokeDasharray="4 4" strokeOpacity="0.05" />
      <line x1="1296" y1="800" x2="1416" y2="800" strokeOpacity="0.04" />
    </svg>
  );
}

/* ─── Systems / Projects ─────────────────────────────────────────────────────
   Orthogonal PCB traces with junction pads, a few dashed signal lines,
   and faint code fragments.                                               */
function SystemsBg() {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke={INK} strokeOpacity="0.055" aria-hidden>
      {/* Main horizontal trace */}
      <path d="M0,260 L240,260 L240,180 L580,180 L580,260 L860,260 L860,140 L1200,140 L1200,260 L1440,260"
        strokeWidth="1" className={`${styles.draw}`} />

      {/* Secondary trace */}
      <path d="M0,480 L180,480 L180,600 L420,600 L420,480 L760,480 L760,560 L1060,560 L1060,480 L1440,480"
        strokeWidth="1" className={`${styles.draw} ${styles.draw2}`} />

      {/* Vertical connector */}
      <line x1="420" y1="260" x2="420" y2="480" strokeWidth="1" className={`${styles.draw} ${styles.draw3}`} />
      <line x1="760" y1="260" x2="760" y2="480" strokeWidth="1" className={`${styles.draw} ${styles.draw3}`} />
      <line x1="1060" y1="260" x2="1060" y2="480" strokeWidth="1" className={`${styles.draw} ${styles.draw4}`} />

      {/* Junction pads (filled circles) */}
      {[
        [240, 260], [580, 260], [860, 260], [1060, 260],
        [420, 480], [760, 480], [1060, 480],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill={INK} fillOpacity="0.07" stroke="none" className={`${styles.fadeIn}`} />
      ))}

      {/* Dashed signal line */}
      <path d="M580,180 L580,80 L1060,80 L1060,140"
        strokeDasharray="6 4" strokeOpacity="0.04" className={`${styles.draw} ${styles.draw5}`} />

      {/* Component outline boxes */}
      <rect x="300" y="220" width="80" height="40" rx="2" strokeOpacity="0.05" className={`${styles.fadeIn} ${styles.fadeIn2}`} />
      <rect x="680" y="440" width="80" height="40" rx="2" strokeOpacity="0.05" className={`${styles.fadeIn} ${styles.fadeIn2}`} />
      <rect x="980" y="120" width="80" height="40" rx="2" strokeOpacity="0.05" className={`${styles.fadeIn} ${styles.fadeIn3}`} />

      {/* Faint code fragments */}
      <text x="64" y="192" fontSize="10" fontFamily="monospace" fill={INK} fillOpacity="0.06" stroke="none" className={`${styles.fadeIn} ${styles.fadeIn2}`}>fn resolve()</text>
      <text x="820" y="88" fontSize="10" fontFamily="monospace" fill={INK} fillOpacity="0.05" stroke="none" className={`${styles.fadeIn} ${styles.fadeIn3}`}>→ Result</text>
      <text x="64" y="524" fontSize="10" fontFamily="monospace" fill={INK} fillOpacity="0.05" stroke="none" className={`${styles.fadeIn} ${styles.fadeIn3}`}>type Signal</text>
      <text x="1240" y="420" fontSize="10" fontFamily="monospace" fill={INK} fillOpacity="0.05" stroke="none" className={`${styles.fadeIn} ${styles.fadeIn4}`}>{"{ }"}</text>

      {/* Grid of tiny dots at trace intersections */}
      <circle cx="580" cy="480" r="2" fill={INK} fillOpacity="0.04" stroke="none" />
      <circle cx="240" cy="480" r="2" fill={INK} fillOpacity="0.04" stroke="none" />

      {/* Bottom trace */}
      <path d="M180,720 L400,720 L400,660 L880,660 L880,720 L1260,720"
        strokeOpacity="0.04" strokeDasharray="8 5" className={`${styles.draw} ${styles.draw6}`} />
    </svg>
  );
}

/* ─── Field Notes ────────────────────────────────────────────────────────────
   College-ruled notebook paper: horizontal rules, a red margin line,
   and a few faint date stamps.                                            */
function FieldNotesBg() {
  const lineY = Array.from({ length: 26 }, (_, i) => 130 + i * 28);
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
      {/* Margin rule */}
      <line x1="110" y1="80" x2="110" y2="870" stroke={ACCENT} strokeOpacity="0.07" strokeWidth="1" />

      {/* Horizontal rules */}
      {lineY.map((y, i) => (
        <line key={i} x1="0" y1={y} x2="1440" y2={y} stroke={INK} strokeOpacity="0.045" strokeWidth="0.75" />
      ))}

      {/* Date stamps — rotated in corners */}
      <text
        x="48" y="56" fontSize="8" fontFamily="monospace"
        fill={INK} fillOpacity="0.07" stroke="none"
        letterSpacing="0.12em" textAnchor="middle"
        transform="rotate(-90 48 56) translate(0 0)"
      >
        FIELD NOTES
      </text>

      <text x="1380" y="460" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.055" stroke="none" letterSpacing="0.1em" transform="rotate(90 1380 460)">OBSERVATIONS</text>

      {/* Top header line */}
      <line x1="0" y1="100" x2="1440" y2="100" stroke={INK} strokeOpacity="0.07" strokeWidth="1" />

      {/* A few check boxes on the left gutter */}
      <rect x="68" y="227" width="10" height="10" stroke={INK} strokeOpacity="0.07" fill="none" />
      <rect x="68" y="339" width="10" height="10" stroke={INK} strokeOpacity="0.07" fill="none" />
      <rect x="68" y="479" width="10" height="10" stroke={INK} strokeOpacity="0.07" fill="none" />
    </svg>
  );
}

/* ─── About ──────────────────────────────────────────────────────────────────
   Topographic contour lines — concentric irregular closed curves — with a
   crosshair reticle and faint coordinate notation.                        */
function AboutBg() {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke={INK} strokeOpacity="0.055" aria-hidden>
      {/* Contour curves — concentric and slightly organic */}
      <ellipse cx="780" cy="480" rx="480" ry="280" strokeOpacity="0.04" className={`${styles.draw}`} />
      <ellipse cx="780" cy="480" rx="360" ry="210" strokeOpacity="0.05" className={`${styles.draw} ${styles.draw2}`} />
      <ellipse cx="780" cy="480" rx="250" ry="145" strokeOpacity="0.055" className={`${styles.draw} ${styles.draw3}`} />
      <ellipse cx="780" cy="480" rx="150" ry="85" strokeOpacity="0.06" className={`${styles.draw} ${styles.draw4}`} />
      <ellipse cx="780" cy="480" rx="65" ry="36" strokeOpacity="0.065" className={`${styles.draw} ${styles.draw5}`} />

      {/* Contour elevation labels */}
      <text x="1264" y="476" fontSize="7" fontFamily="monospace" fill={INK} fillOpacity="0.07" stroke="none" className={`${styles.fadeIn} ${styles.fadeIn2}`}>200</text>
      <text x="1144" y="476" fontSize="7" fontFamily="monospace" fill={INK} fillOpacity="0.07" stroke="none" className={`${styles.fadeIn} ${styles.fadeIn2}`}>400</text>
      <text x="1034" y="476" fontSize="7" fontFamily="monospace" fill={INK} fillOpacity="0.07" stroke="none" className={`${styles.fadeIn} ${styles.fadeIn3}`}>600</text>
      <text x="934" y="476" fontSize="7" fontFamily="monospace" fill={INK} fillOpacity="0.07" stroke="none" className={`${styles.fadeIn} ${styles.fadeIn3}`}>800</text>

      {/* Crosshair reticle centered on contours */}
      <line x1="780" y1="380" x2="780" y2="580" strokeOpacity="0.065" className={`${styles.draw} ${styles.draw6}`} />
      <line x1="680" y1="480" x2="880" y2="480" strokeOpacity="0.065" className={`${styles.draw} ${styles.draw6}`} />
      <circle cx="780" cy="480" r="8" strokeOpacity="0.07" className={`${styles.fadeIn} ${styles.fadeIn3}`} />

      {/* Tick marks on crosshair */}
      <line x1="780" y1="395" x2="780" y2="405" strokeOpacity="0.08" />
      <line x1="780" y1="555" x2="780" y2="565" strokeOpacity="0.08" />
      <line x1="695" y1="480" x2="705" y2="480" strokeOpacity="0.08" />
      <line x1="855" y1="480" x2="865" y2="480" strokeOpacity="0.08" />

      {/* Coordinate notation */}
      <text x="786" y="398" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.07" stroke="none" className={`${styles.fadeIn} ${styles.fadeIn4}`}>41°52′N</text>
      <text x="786" y="570" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.07" stroke="none" className={`${styles.fadeIn} ${styles.fadeIn4}`}>87°37′W</text>

      {/* Corner hash marks (surveying) */}
      <path d="M24,24 L44,24 L44,44" strokeOpacity="0.06" />
      <path d="M1416,24 L1396,24 L1396,44" strokeOpacity="0.06" />
      <path d="M24,876 L44,876 L44,856" strokeOpacity="0.06" />
      <path d="M1416,876 L1396,876 L1396,856" strokeOpacity="0.06" />
    </svg>
  );
}

/* ─── Contact ────────────────────────────────────────────────────────────────
   Postal correspondence: envelope fold diagonals, a postmark circle,
   a dotted stamp outline, "PAR AVION" in blue air-mail style.            */
function ContactBg() {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke={INK} strokeOpacity="0.055" aria-hidden>
      {/* Envelope diagonal folds — bottom corners */}
      <line x1="0" y1="900" x2="280" y2="560" strokeOpacity="0.045" />
      <line x1="1440" y1="900" x2="1160" y2="560" strokeOpacity="0.045" />
      {/* Flap center crease */}
      <line x1="280" y1="560" x2="720" y2="720" strokeOpacity="0.04" />
      <line x1="1160" y1="560" x2="720" y2="720" strokeOpacity="0.04" />

      {/* Stamp outline — top right */}
      <rect x="1256" y="48" width="120" height="90" rx="1" strokeDasharray="4 3" strokeOpacity="0.08" />
      {/* Perforation dots on stamp */}
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={`st${i}`} cx={1256 + i * 13.3} cy={48} r="2.5" fill={INK} fillOpacity="0.06" stroke="none" />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={`sb${i}`} cx={1256 + i * 13.3} cy={138} r="2.5" fill={INK} fillOpacity="0.06" stroke="none" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <circle key={`sl${i}`} cx={1256} cy={48 + i * 15} r="2.5" fill={INK} fillOpacity="0.06" stroke="none" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <circle key={`sr${i}`} cx={1376} cy={48 + i * 15} r="2.5" fill={INK} fillOpacity="0.06" stroke="none" />
      ))}

      {/* Postmark circle */}
      <circle cx="1140" cy="108" r="52" strokeOpacity="0.07" />
      <line x1="1088" y1="108" x2="1192" y2="108" strokeOpacity="0.06" />
      <text x="1140" y="100" fontSize="7" fontFamily="monospace" fill={INK} fillOpacity="0.08" stroke="none" textAnchor="middle" letterSpacing="0.08em">CHICAGO IL</text>
      <text x="1140" y="118" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.08" stroke="none" textAnchor="middle" letterSpacing="0.06em">60601</text>

      {/* PAR AVION / BY AIR MAIL diagonal text */}
      <text
        x="120" y="120" fontSize="9" fontFamily="monospace"
        fill={INK} fillOpacity="0.065" stroke="none"
        letterSpacing="0.14em"
        transform="rotate(-12 120 120)"
      >
        BY AIR MAIL · PAR AVION
      </text>

      {/* Address lines placeholder */}
      <line x1="160" y1="480" x2="480" y2="480" strokeOpacity="0.05" />
      <line x1="160" y1="508" x2="420" y2="508" strokeOpacity="0.04" />
      <line x1="160" y1="536" x2="460" y2="536" strokeOpacity="0.04" />
      <line x1="160" y1="564" x2="380" y2="564" strokeOpacity="0.035" />
    </svg>
  );
}

/* ─── Book detail ─────────────────────────────────────────────────────────────
   A typeset manuscript page: running header, paragraph marks, folio,
   faint column of dummy text lines.                                        */
function BookBg() {
  const textLines = Array.from({ length: 22 }, (_, i) => 180 + i * 26);
  const lineWidths = [520, 480, 510, 460, 500, 490, 475, 515, 465, 505,
                      480, 520, 470, 495, 510, 455, 500, 488, 512, 468, 490, 476];
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke={INK} strokeOpacity="0.045" aria-hidden>
      {/* Running header */}
      <line x1="240" y1="80" x2="700" y2="80" strokeOpacity="0.06" />
      <text x="240" y="72" fontSize="8" fontFamily="serif" fill={INK} fillOpacity="0.07" stroke="none" letterSpacing="0.08em">ELIAN VOIGT</text>
      <line x1="740" y1="80" x2="1200" y2="80" strokeOpacity="0.06" />
      <text x="1200" y="72" fontSize="8" fontFamily="serif" fill={INK} fillOpacity="0.07" stroke="none" textAnchor="end" letterSpacing="0.08em">CHAPTER ONE</text>

      {/* Faint dummy-text lines (paragraph body impression) */}
      {textLines.map((y, i) => (
        <line key={i} x1="240" y1={y} x2={240 + lineWidths[i % lineWidths.length]} y2={y} strokeOpacity="0.04" />
      ))}

      {/* Paragraph indent marks */}
      <text x="240" y="180" fontSize="11" fontFamily="serif" fill={INK} fillOpacity="0.06" stroke="none">¶</text>
      <text x="240" y="440" fontSize="11" fontFamily="serif" fill={INK} fillOpacity="0.05" stroke="none">¶</text>

      {/* Section ornament */}
      <text x="720" y="152" fontSize="10" fontFamily="serif" fill={INK} fillOpacity="0.07" stroke="none" textAnchor="middle" letterSpacing="0.2em">* * *</text>

      {/* Folio */}
      <text x="720" y="856" fontSize="9" fontFamily="serif" fill={INK} fillOpacity="0.07" stroke="none" textAnchor="middle">— 1 —</text>

      {/* Right margin annotation */}
      <line x1="780" y1="340" x2="800" y2="340" strokeOpacity="0.06" />
      <path d="M800,310 L820,310 L820,370 L800,370" strokeOpacity="0.055" />
    </svg>
  );
}

/* ─── Project detail ─────────────────────────────────────────────────────────
   Technical annotation: callout arrows, measurement brackets,
   annotation leader lines.                                                 */
function ProjectBg() {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke={INK} strokeOpacity="0.055" aria-hidden>
      {/* Measurement bracket — top */}
      <path d="M240,80 L240,60 L1200,60 L1200,80" strokeOpacity="0.05" className={`${styles.draw}`} />
      <line x1="720" y1="60" x2="720" y2="52" strokeOpacity="0.06" />
      <text x="720" y="48" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.07" stroke="none" textAnchor="middle">960px</text>

      {/* Left callout bracket */}
      <path d="M160,200 L140,200 L140,700 L160,700" strokeOpacity="0.05" className={`${styles.draw} ${styles.draw2}`} />
      <line x1="140" y1="450" x2="120" y2="450" strokeOpacity="0.06" />
      <text x="56" y="454" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.07" stroke="none" textAnchor="middle" transform="rotate(-90 56 454)">viewport</text>

      {/* Callout leader lines */}
      <line x1="400" y1="280" x2="320" y2="220" strokeOpacity="0.05" strokeDasharray="4 3" className={`${styles.draw} ${styles.draw3}`} />
      <circle cx="400" cy="280" r="3" fill={INK} fillOpacity="0.06" stroke="none" />
      <text x="312" y="214" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.065" stroke="none" textAnchor="end">nav-height</text>

      <line x1="860" y1="540" x2="940" y2="600" strokeOpacity="0.05" strokeDasharray="4 3" className={`${styles.draw} ${styles.draw4}`} />
      <circle cx="860" cy="540" r="3" fill={INK} fillOpacity="0.06" stroke="none" />
      <text x="948" y="606" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.065" stroke="none">section</text>

      {/* Grid overlay — very faint 8pt baseline grid */}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1="240" y1={200 + i * 80} x2="1200" y2={200 + i * 80}
          stroke={INK} strokeOpacity="0.025" strokeDasharray="2 8" />
      ))}

      {/* Annotation box */}
      <rect x="1060" y="700" width="220" height="72" strokeOpacity="0.05" strokeDasharray="3 3" className={`${styles.fadeIn} ${styles.fadeIn3}`} />
      <text x="1072" y="720" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.065" stroke="none">viewport: 1440×900</text>
      <text x="1072" y="734" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.055" stroke="none">dpr: 2.0</text>
      <text x="1072" y="748" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.055" stroke="none">font-size: 16px</text>
      <text x="1072" y="762" fontSize="8" fontFamily="monospace" fill={INK} fillOpacity="0.05" stroke="none">grid: 4px</text>

      {/* Right measurement bracket */}
      <path d="M1280,200 L1300,200 L1300,700 L1280,700" strokeOpacity="0.05" className={`${styles.draw} ${styles.draw5}`} />
    </svg>
  );
}

const BG_MAP: Record<BgVariant, React.ComponentType> = {
  fiction: FictionBg,
  research: ResearchBg,
  systems: SystemsBg,
  "field-notes": FieldNotesBg,
  about: AboutBg,
  contact: ContactBg,
  book: BookBg,
  project: ProjectBg,
};

interface PageBackgroundProps {
  variant: BgVariant;
}

export default function PageBackground({ variant }: PageBackgroundProps) {
  const Bg = BG_MAP[variant];
  return (
    <div className={styles.root} aria-hidden="true">
      <Bg />
    </div>
  );
}
