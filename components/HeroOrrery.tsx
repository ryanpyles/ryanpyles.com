"use client";

/**
 * HeroOrrery — the opening figure. Four disciplines (Software, AI, Design,
 * Language) orbit a shared brass center: the "one practice, four axes"
 * proposition made spatial. Built as a native SVG (no WebGL, no raster) so it
 * is responsive, selectable, and cheap. Motion is restrained — a single outer
 * ring drifts, nodes emphasise on hover, and a slight pointer-parallax gives
 * depth. All of it is disabled under prefers-reduced-motion, and the SVG is
 * decorative (the real discipline text lives in the Disciplines band below).
 */

import React, { useEffect, useRef, useState } from "react";
import styles from "./HeroOrrery.module.css";

const CX = 500;
const CY = 330;

type Tone = "stone" | "brass" | "bone" | "orange";

interface Node {
  n: string;
  label: string;
  meta: string;
  rx: number;
  ry: number;
  deg: number;
  t: number;
  tone: Tone;
  r: number;
}

const NODES: Node[] = [
  { n: "01", label: "SOFTWARE", meta: "Full-stack systems, shipped end to end.", rx: 332, ry: 104, deg: -8, t: -36, tone: "stone", r: 15 },
  { n: "02", label: "AI", meta: "Systems that reason over long context.", rx: 244, ry: 166, deg: 15, t: 214, tone: "brass", r: 13 },
  { n: "03", label: "DESIGN", meta: "Interfaces where form carries meaning.", rx: 384, ry: 128, deg: 5, t: 24, tone: "bone", r: 16 },
  { n: "04", label: "LANGUAGE", meta: "Multilingual architecture, many languages.", rx: 170, ry: 150, deg: -22, t: 150, tone: "orange", r: 12 },
];

/** Absolute position of a point at parameter `t` on an ellipse rotated `deg`. */
function nodeAt(rx: number, ry: number, deg: number, t: number) {
  const a = (t * Math.PI) / 180;
  const g = (deg * Math.PI) / 180;
  const x0 = rx * Math.cos(a);
  const y0 = ry * Math.sin(a);
  return {
    x: CX + x0 * Math.cos(g) - y0 * Math.sin(g),
    y: CY + x0 * Math.sin(g) + y0 * Math.cos(g),
  };
}

export default function HeroOrrery() {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);

    // Pointer parallax — a few px of tilt, pointer-fine + motion-ok only.
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const onMove = (ev: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const dx = (ev.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (ev.clientY - (rect.top + rect.height / 2)) / rect.height;
        el.style.setProperty("--px", `${(dx * 14).toFixed(2)}px`);
        el.style.setProperty("--py", `${(dy * 10).toFixed(2)}px`);
      });
    };
    if (fine && !reduced) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.wrap} ref={ref} data-entered={entered} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 1000 660" role="presentation" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="orreryBrass" cx="38%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#e7cfa0" />
            <stop offset="45%" stopColor="#c69c5d" />
            <stop offset="100%" stopColor="#7c5a2e" />
          </radialGradient>
          <radialGradient id="orreryStone" cx="38%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#6c6a66" />
            <stop offset="100%" stopColor="#201f1d" />
          </radialGradient>
          <radialGradient id="orreryBone" cx="38%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#fbfaf7" />
            <stop offset="100%" stopColor="#cfc8ba" />
          </radialGradient>
          <radialGradient id="orreryOrange" cx="38%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#ffb07a" />
            <stop offset="55%" stopColor="#fa7a35" />
            <stop offset="100%" stopColor="#b2501c" />
          </radialGradient>
        </defs>

        <g className={styles.frame}>
          {/* Cardinal construction cross */}
          <line className={styles.axis} x1={CX} y1="54" x2={CX} y2="606" />
          <line className={styles.axis} x1="150" y1={CY} x2="850" y2={CY} />
          <text className={styles.cardinal} x={CX} y="44" textAnchor="middle">N</text>
          <text className={styles.cardinal} x={CX} y="624" textAnchor="middle">S</text>
          <text className={styles.cardinal} x="132" y={CY + 4} textAnchor="middle">E</text>
          <text className={styles.cardinal} x="868" y={CY + 4} textAnchor="middle">W</text>

          {/* Drifting outer construction ring */}
          <ellipse className={styles.driftRing} cx={CX} cy={CY} rx="430" ry="168" />

          {/* Orbits */}
          {NODES.map((nd, i) => (
            <ellipse
              key={`o${i}`}
              className={[styles.orbit, i % 2 ? styles.orbitDashed : ""].join(" ")}
              cx={CX}
              cy={CY}
              rx={nd.rx}
              ry={nd.ry}
              transform={`rotate(${nd.deg} ${CX} ${CY})`}
              style={{ ["--d" as string]: `${0.15 + i * 0.12}s` }}
            />
          ))}

          {/* Central brass node + base */}
          <ellipse className={styles.centerBase} cx={CX} cy={CY + 58} rx="70" ry="16" />
          <circle className={styles.centerNode} cx={CX} cy={CY} r="40" fill="url(#orreryBrass)" />
          <circle className={styles.centerRing} cx={CX} cy={CY} r="52" />

          {/* Discipline nodes */}
          {NODES.map((nd, i) => {
            const p = nodeAt(nd.rx, nd.ry, nd.deg, nd.t);
            // Labels grow toward the centre, so long meta text never clips the frame.
            const inward = p.x < CX;
            const labelX = inward ? p.x + nd.r + 12 : p.x - nd.r - 12;
            return (
              <g
                key={`n${i}`}
                className={styles.node}
                data-tone={nd.tone}
                style={{ ["--d" as string]: `${0.5 + i * 0.14}s` }}
              >
                <line className={styles.leader} x1={CX} y1={CY} x2={p.x} y2={p.y} />
                <circle className={styles.halo} cx={p.x} cy={p.y} r={nd.r + 7} />
                <circle className={styles.dot} cx={p.x} cy={p.y} r={nd.r} fill={`url(#orrery${cap(nd.tone)})`} />
                <text
                  className={styles.nodeNum}
                  x={labelX}
                  y={p.y - 4}
                  textAnchor={inward ? "start" : "end"}
                >
                  {nd.n}
                </text>
                <text
                  className={styles.nodeLabel}
                  x={labelX}
                  y={p.y + 12}
                  textAnchor={inward ? "start" : "end"}
                >
                  {nd.label}
                </text>
                <text
                  className={styles.nodeMeta}
                  x={labelX}
                  y={p.y + 27}
                  textAnchor={inward ? "start" : "end"}
                >
                  {nd.meta}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

function cap(s: string): string {
  return s[0].toUpperCase() + s.slice(1);
}
