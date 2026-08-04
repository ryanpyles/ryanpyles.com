"use client";

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./SiteProgressObject.module.css";

const PAPER = "#f5f1ea";
const INK = "#1c1a16";
const BRASS = "#c69c5d";

const POINTS = 9;
const MAX_PAIRS = (POINTS * (POINTS - 1)) / 2; // 36
const LINK_DISTANCE = 1.2;

type Vec3 = [number, number, number];

// ── Fibonacci sphere (for the orrery state) ──────────────────────────────────
function fibSphere(n: number, r: number): Vec3[] {
  const pts: Vec3[] = [];
  const off = 2 / n;
  const inc = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = i * off - 1 + off / 2;
    const rr = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * inc;
    pts.push([Math.cos(phi) * rr * r, y * r, Math.sin(phi) * rr * r]);
  }
  return pts;
}

// ── Per-section constellation layouts (each is POINTS × [x,y,z]) ──────────────
const SHAPES: Record<string, Vec3[]> = {
  origin: [
    [0, 0, 0], [0.15, 0.1, 0.05], [-0.12, 0.08, -0.06], [0.05, -0.14, 0.1],
    [-0.1, -0.1, 0.08], [0.18, -0.05, -0.1], [-0.05, 0.16, 0.04],
    [0.02, 0.02, 0.16], [-0.16, -0.02, -0.12],
  ],
  orbit: [
    [0, 0, 0],
    [0.55, 0.05, 0], [-0.275, -0.05, 0.476], [-0.275, 0.05, -0.476],
    [0.909, 0.12, 0.525], [-0.218, -0.18, 1.027], [-1.044, 0.15, 0.11],
    [-0.427, -0.12, -0.96], [0.78, 0.18, -0.703],
  ],
  network: [
    [0, 0.15, 0], [0.9, -0.1, 0.3], [-0.85, 0.35, 0.2], [0.5, -0.75, -0.4],
    [-0.4, -0.6, -0.65], [0.1, 0.85, -0.55], [0.7, 0.5, 0.2],
    [-0.7, -0.15, 0.5], [0.2, -0.1, 0.9],
  ],
  shelf: [
    [-0.7, 0.7, 0], [0, 0.7, 0.1], [0.7, 0.7, -0.1],
    [-0.7, 0, -0.05], [0, 0, 0.05], [0.7, 0, 0],
    [-0.7, -0.7, 0.1], [0, -0.7, -0.1], [0.7, -0.7, 0],
  ],
  scatter: [
    [-1.0, 0.5, 0.05], [-0.4, 0.9, -0.1], [0.3, 0.7, 0.08], [1.0, 0.3, -0.05],
    [-0.9, -0.3, 0.1], [-0.2, -0.1, -0.08], [0.5, -0.4, 0.06],
    [1.05, -0.7, 0], [0.0, -0.9, 0.1],
  ],
  duality: [
    [-0.85, 0.4, 0.1], [-1.0, 0.0, -0.1], [-0.75, -0.4, 0.15], [-0.95, -0.05, 0.3],
    [0.85, 0.4, -0.1], [1.0, 0.0, 0.1], [0.75, -0.4, -0.15], [0.95, -0.05, -0.3],
    [0, 0, 0],
  ],
  sphere: fibSphere(POINTS, 1.05),
  lattice: [
    [0.55, 0.55, 0.55], [0.55, 0.55, -0.55], [0.55, -0.55, 0.55], [0.55, -0.55, -0.55],
    [-0.55, 0.55, 0.55], [-0.55, 0.55, -0.55], [-0.55, -0.55, 0.55], [-0.55, -0.55, -0.55],
    [0, 0, 0],
  ],
  converge: [
    [0.32, 0, 0], [0.226, 0.226, 0], [0, 0.32, 0], [-0.226, 0.226, 0],
    [-0.32, 0, 0], [-0.226, -0.226, 0], [0, -0.32, 0], [0.226, -0.226, 0],
    [0, 0, 0],
  ],
};

// ── Homepage sections, in scroll order. `dark` = section paints a dark bg ─────
const SECTIONS: { id: string; label: string; shape: Vec3[]; dark: boolean }[] = [
  { id: "hero", label: "Origin", shape: SHAPES.origin, dark: false },
  { id: "ecosystem", label: "Ecosystem", shape: SHAPES.orbit, dark: false },
  { id: "continuity-atlas", label: "Continuity Atlas", shape: SHAPES.network, dark: false },
  { id: "books", label: "Fiction", shape: SHAPES.shelf, dark: false },
  { id: "field-notes", label: "Field Notes", shape: SHAPES.scatter, dark: false },
  { id: "voigt", label: "The Voigt Project", shape: SHAPES.duality, dark: true },
  { id: "orrery", label: "Language Orrery", shape: SHAPES.sphere, dark: true },
  { id: "in-progress", label: "In Progress", shape: SHAPES.lattice, dark: false },
  { id: "contact", label: "Contact", shape: SHAPES.converge, dark: false },
];

type ScrollState = { f: number; progress: number; dark: number };

function Constellation({
  scrollRef,
  reducedMotion,
}: {
  scrollRef: React.MutableRefObject<ScrollState>;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const pointRefs = useRef<(THREE.Mesh | null)[]>([]);
  const lineRef = useRef<THREE.LineSegments>(null);

  // Shared materials so colour can invert with the section background
  const outerMat = useMemo(
    () => new THREE.MeshStandardMaterial({ roughness: 0.5, emissiveIntensity: 0.2 }),
    []
  );
  const centerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: BRASS,
        emissive: BRASS,
        emissiveIntensity: 0.3,
        roughness: 0.5,
      }),
    []
  );
  const lineMat = useMemo(
    () => new THREE.LineBasicMaterial({ transparent: true, opacity: 0.32 }),
    []
  );
  const inkC = useMemo(() => new THREE.Color(INK), []);
  const paperC = useMemo(() => new THREE.Color(PAPER), []);
  const darkCurr = useRef(0);

  useEffect(() => {
    return () => {
      outerMat.dispose();
      centerMat.dispose();
      lineMat.dispose();
    };
  }, [outerMat, centerMat, lineMat]);

  // Live positions (eased toward the interpolated target each frame)
  const curr = useMemo<Vec3[]>(
    () => SECTIONS[0].shape.map((p) => [p[0], p[1], p[2]]),
    []
  );
  const linePositions = useMemo(() => new Float32Array(MAX_PAIRS * 2 * 3), []);

  useFrame((_, delta) => {
    const { f } = scrollRef.current;
    const i0 = Math.max(0, Math.min(SECTIONS.length - 1, Math.floor(f)));
    const i1 = Math.min(SECTIONS.length - 1, i0 + 1);
    const t = f - i0;
    const a = SECTIONS[i0].shape;
    const b = SECTIONS[i1].shape;
    const ease = Math.min(1, delta * 6);

    for (let k = 0; k < POINTS; k++) {
      const tx = a[k][0] + (b[k][0] - a[k][0]) * t;
      const ty = a[k][1] + (b[k][1] - a[k][1]) * t;
      const tz = a[k][2] + (b[k][2] - a[k][2]) * t;
      const c = curr[k];
      c[0] += (tx - c[0]) * ease;
      c[1] += (ty - c[1]) * ease;
      c[2] += (tz - c[2]) * ease;
      const mesh = pointRefs.current[k];
      if (mesh) mesh.position.set(c[0], c[1], c[2]);
    }

    // Rebuild links: connect any two points closer than the threshold
    let ptr = 0;
    for (let i = 0; i < POINTS; i++) {
      for (let j = i + 1; j < POINTS; j++) {
        const dx = curr[i][0] - curr[j][0];
        const dy = curr[i][1] - curr[j][1];
        const dz = curr[i][2] - curr[j][2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < LINK_DISTANCE) {
          linePositions[ptr++] = curr[i][0];
          linePositions[ptr++] = curr[i][1];
          linePositions[ptr++] = curr[i][2];
          linePositions[ptr++] = curr[j][0];
          linePositions[ptr++] = curr[j][1];
          linePositions[ptr++] = curr[j][2];
        }
      }
    }
    if (lineRef.current) {
      const geo = lineRef.current.geometry;
      const attr = geo.getAttribute("position") as THREE.BufferAttribute;
      attr.needsUpdate = true;
      geo.setDrawRange(0, ptr / 3);
    }

    // Invert colour toward paper on dark sections, ink on light ones
    darkCurr.current += (scrollRef.current.dark - darkCurr.current) *
      Math.min(1, delta * 4);
    outerMat.color.lerpColors(inkC, paperC, darkCurr.current);
    outerMat.emissive.copy(outerMat.color);
    lineMat.color.lerpColors(inkC, paperC, darkCurr.current);

    if (group.current && !reducedMotion) {
      group.current.rotation.y += delta * 0.16;
      group.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 3, 2]} intensity={0.7} color={PAPER} />

      {SECTIONS[0].shape.map((p, k) => (
        <mesh
          key={k}
          position={p}
          material={k === 0 ? centerMat : outerMat}
          ref={(el) => {
            pointRefs.current[k] = el;
          }}
        >
          <sphereGeometry args={[0.075, 16, 16]} />
        </mesh>
      ))}

      <lineSegments ref={lineRef} material={lineMat}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
      </lineSegments>
    </group>
  );
}

const SEG_R = 52;
const SEG_GAP_DEG = 7;

function polar(angleFromTopDeg: number): [number, number] {
  const a = ((angleFromTopDeg - 90) * Math.PI) / 180;
  return [60 + SEG_R * Math.cos(a), 60 + SEG_R * Math.sin(a)];
}

function segmentPath(i: number, count: number): string {
  const step = 360 / count;
  const a0 = i * step + SEG_GAP_DEG / 2;
  const a1 = (i + 1) * step - SEG_GAP_DEG / 2;
  const [x0, y0] = polar(a0);
  const [x1, y1] = polar(a1);
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${SEG_R} ${SEG_R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

export default function SiteProgressObject() {
  const reducedMotion = usePrefersReducedMotion();
  const scrollRef = useRef<ScrollState>({ f: 0, progress: 0, dark: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const lastIdx = useRef(-1);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const refY = scrollY + vh / 2;

      const centers = ids.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.top + scrollY + r.height / 2;
      });

      const valid = centers
        .map((c, i) => ({ c, i }))
        .filter((o): o is { c: number; i: number } => o.c != null);

      let f = 0;
      if (valid.length) {
        const first = valid[0];
        const last = valid[valid.length - 1];
        if (refY <= first.c) {
          f = first.i;
        } else if (refY >= last.c) {
          f = last.i;
        } else {
          for (let k = 0; k < valid.length - 1; k++) {
            const a = valid[k];
            const b = valid[k + 1];
            if (refY >= a.c && refY <= b.c) {
              const t = (refY - a.c) / (b.c - a.c || 1);
              f = a.i + (b.i - a.i) * t;
              break;
            }
          }
        }
      }

      const docH = document.documentElement.scrollHeight;
      const progress =
        docH > vh ? Math.min(1, Math.max(0, scrollY / (docH - vh))) : 0;

      scrollRef.current.f = f;
      scrollRef.current.progress = progress;

      const idx = Math.round(f);
      if (idx !== lastIdx.current) {
        lastIdx.current = idx;
        const s = SECTIONS[idx];
        scrollRef.current.dark = s && s.dark ? 1 : 0;
        if (rootRef.current) {
          rootRef.current.dataset.tone = s && s.dark ? "dark" : "light";
        }
        setActiveIdx(idx);
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
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const shown = hoverIdx ?? activeIdx;

  return (
    <nav className={styles.root} data-tone="light" ref={rootRef} aria-label="Jump to section">
      <div className={styles.dial}>
        <svg className={styles.ring} viewBox="0 0 120 120">
          {SECTIONS.map((s, i) => {
            const d = segmentPath(i, SECTIONS.length);
            const state =
              i === activeIdx ? "active" : i < activeIdx ? "visited" : "upcoming";
            return (
              <g key={s.id}>
                <path
                  className={styles.segHit}
                  d={d}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to ${s.label}`}
                  onClick={() => go(s.id)}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx((h) => (h === i ? null : h))}
                  onFocus={() => setHoverIdx(i)}
                  onBlur={() => setHoverIdx((h) => (h === i ? null : h))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      go(s.id);
                    }
                  }}
                />
                <path
                  className={styles.seg}
                  d={d}
                  data-state={state}
                  data-hover={i === hoverIdx || undefined}
                />
              </g>
            );
          })}
        </svg>
        <div className={styles.canvasWrap}>
          <Canvas
            camera={{ position: [0, 0, 4], fov: 40 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <Constellation scrollRef={scrollRef} reducedMotion={reducedMotion} />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className={styles.label}>
        <span className={styles.labelNum}>
          {String(shown + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
        </span>
        <span className={styles.labelName}>{SECTIONS[shown].label}</span>
      </div>
    </nav>
  );
}
