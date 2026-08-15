"use client";

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, Line, Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import NotebookPanel from "./NotebookPanel";
import WebGLBoundary from "./WebGLBoundary";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useWebGLAvailable } from "@/lib/useWebGLAvailable";
import { languages, type LanguageProfile, type LanguageRing } from "@/content/languages";
import styles from "./LanguageOrrery.module.css";

const PAPER = "#f5f1ea";
const BRASS = "#c69c5d";
const SKY = "#0c0e16";

const RING_RADIUS: Record<LanguageRing, number> = { 1: 1.9, 2: 3.05, 3: 4.2 };
const RING_SPEED: Record<LanguageRing, number> = { 1: 0.05, 2: -0.035, 3: 0.025 };
const REST_CAMERA = new THREE.Vector3(0, 3.6, 6.8);
const REST_LOOK = new THREE.Vector3(0, 0, 0);
// Wide establishing shot the scroll-zoom pushes in from.
const ESTABLISH_CAMERA = new THREE.Vector3(0, 8.5, 15);
const clampUnit = (v: number) => Math.max(0, Math.min(1, v));
const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

function ringLayout(): Record<LanguageRing, LanguageProfile[]> {
  const grouped: Record<LanguageRing, LanguageProfile[]> = { 1: [], 2: [], 3: [] };
  languages.forEach((language) => grouped[language.ring].push(language));
  return grouped;
}

function OrbitRing({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const segments = 96;
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= segments; i += 1) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return pts;
  }, [radius]);

  return <Line points={points} color={PAPER} transparent opacity={0.16} lineWidth={1} />;
}

function CentralNode() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial color={PAPER} emissive={PAPER} emissiveIntensity={0.18} roughness={0.55} />
      </mesh>
      <Text
        position={[0, 0.42, 0]}
        fontSize={0.16}
        letterSpacing={0.18}
        color={PAPER}
        anchorX="center"
        anchorY="middle"
      >
        LANGUAGE
      </Text>
    </group>
  );
}

interface LanguageNodeProps {
  language: LanguageProfile;
  startAngle: number;
  radius: number;
  speed: number;
  reducedMotion: boolean;
  selected: boolean;
  onHover: (language: LanguageProfile | null) => void;
  onSelect: (language: LanguageProfile, position: THREE.Vector3) => void;
}

function LanguageNode({
  language,
  startAngle,
  radius,
  speed,
  reducedMotion,
  selected,
  onHover,
  onSelect,
}: LanguageNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(startAngle);
  const scaleRef = useRef(1);
  const expanded = hovered || selected;

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (!reducedMotion) {
      angleRef.current += speed * delta;
    }
    const angle = angleRef.current;
    group.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

    const target = expanded ? 1.7 : 1;
    scaleRef.current += (target - scaleRef.current) * 0.12;
    group.scale.setScalar(scaleRef.current);
  });

  const handlePointerOver = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setHovered(true);
      onHover(language);
      document.body.style.cursor = "pointer";
    },
    [language, onHover]
  );

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    onHover(null);
    document.body.style.cursor = "auto";
  }, [onHover]);

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      const group = groupRef.current;
      if (group) onSelect(language, group.position.clone());
    },
    [language, onSelect]
  );

  const tint = expanded ? BRASS : PAPER;

  return (
    <group
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <mesh>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshStandardMaterial
          color={tint}
          emissive={expanded ? BRASS : "#000000"}
          emissiveIntensity={expanded ? 0.55 : 0}
          roughness={0.5}
        />
      </mesh>
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.1}
        color={tint}
        fillOpacity={expanded ? 1 : 0.62}
        anchorX="center"
        anchorY="middle"
      >
        {language.name}
      </Text>

      {hovered && !selected && (
        <Html position={[0, -0.32, 0]} center distanceFactor={7.5} zIndexRange={[20, 0]}>
          <div className={styles.hoverCard}>
            <p className={styles.hoverLevel}>{language.level}</p>
            <ul className={styles.hoverFocus}>
              {language.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Html>
      )}
    </group>
  );
}

function CameraRig({
  target,
  reducedMotion,
  scrollZoomRef,
}: {
  target: THREE.Vector3 | null;
  reducedMotion: boolean;
  scrollZoomRef?: React.MutableRefObject<number>;
}) {
  const lookRef = useRef(REST_LOOK.clone());

  useFrame(({ camera }) => {
    let destination = REST_CAMERA;
    let lookAt = REST_LOOK;

    if (target) {
      destination = REST_CAMERA.clone().lerp(
        new THREE.Vector3(target.x, 1.5, target.z),
        0.6
      );
      lookAt = target;
    } else if (scrollZoomRef) {
      // Scroll drives a push-in from the wide establishing shot to rest.
      const z = easeIO(clampUnit(scrollZoomRef.current));
      destination = ESTABLISH_CAMERA.clone().lerp(REST_CAMERA, z);
    }

    const factor = reducedMotion ? 1 : 0.045;
    camera.position.lerp(destination, factor);
    lookRef.current.lerp(lookAt, factor);
    camera.lookAt(lookRef.current);
  });

  return null;
}

interface SceneProps {
  reducedMotion: boolean;
  selected: LanguageProfile | null;
  selectedPosition: THREE.Vector3 | null;
  onHover: (language: LanguageProfile | null) => void;
  onSelect: (language: LanguageProfile, position: THREE.Vector3) => void;
  scrollZoomRef?: React.MutableRefObject<number>;
}

function Scene({ reducedMotion, selected, selectedPosition, onHover, onSelect, scrollZoomRef }: SceneProps) {
  const grouped = useMemo(ringLayout, []);

  return (
    <>
      <color attach="background" args={[SKY]} />
      <Stars radius={70} depth={32} count={1600} factor={2.2} fade speed={reducedMotion ? 0 : 0.3} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 4.5, 3.5]} intensity={0.7} color={PAPER} />

      <CentralNode />

      {([1, 2, 3] as LanguageRing[]).map((ring) => (
        <React.Fragment key={ring}>
          <OrbitRing radius={RING_RADIUS[ring]} />
          {grouped[ring].map((language, index) => (
            <LanguageNode
              key={language.id}
              language={language}
              startAngle={(index / grouped[ring].length) * Math.PI * 2}
              radius={RING_RADIUS[ring]}
              speed={RING_SPEED[ring]}
              reducedMotion={reducedMotion}
              selected={selected?.id === language.id}
              onHover={onHover}
              onSelect={onSelect}
            />
          ))}
        </React.Fragment>
      ))}

      <CameraRig
        target={selectedPosition}
        reducedMotion={reducedMotion}
        scrollZoomRef={scrollZoomRef}
      />
    </>
  );
}

export default function LanguageOrrery({
  scrollZoomRef,
  hideCaption,
}: {
  scrollZoomRef?: React.MutableRefObject<number>;
  hideCaption?: boolean;
} = {}) {
  const [hovered, setHovered] = useState<LanguageProfile | null>(null);
  const [selected, setSelected] = useState<LanguageProfile | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<THREE.Vector3 | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const webgl = useWebGLAvailable();
  // Reduced-motion users default to list view; others can toggle at will.
  const [listMode, setListMode] = useState(false);
  // WebGL context failure (creation or later loss) → fall back to the list.
  const [glFailed, setGlFailed] = useState(false);
  // Lazy-mount the Canvas only once the section nears the viewport.
  const [near, setNear] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  const canUse3D = webgl === true && !glFailed;
  // The list is the single source of truth whenever 3D can't or shouldn't run.
  const showList = listMode || webgl === false || glFailed;

  const handleSelect = useCallback((language: LanguageProfile, position: THREE.Vector3) => {
    setSelected(language);
    setSelectedPosition(position);
    setHovered(null);
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
    setSelectedPosition(null);
  }, []);

  // Respect reduced-motion preference once the hook resolves (client only).
  useEffect(() => {
    if (reducedMotion) setListMode(true);
  }, [reducedMotion]);

  // Only spin up WebGL once the orrery is close to the viewport.
  useEffect(() => {
    if (near) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <section ref={rootRef} className={styles.root} aria-label="Language Orrery — the languages I study, charted as orbits">
      <div className={styles.canvasWrap} aria-hidden="true" data-hidden={showList || undefined}>
        {canUse3D && near && !listMode && (
          <WebGLBoundary fallback={null} onError={() => setGlFailed(true)}>
            <Canvas
              className={styles.canvas}
              camera={{ position: [REST_CAMERA.x, REST_CAMERA.y, REST_CAMERA.z], fov: 46 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true }}
              onCreated={({ gl }) => {
                // Context loss (driver reset, tab backgrounding) → list fallback.
                gl.domElement.addEventListener(
                  "webglcontextlost",
                  (e) => {
                    e.preventDefault();
                    setGlFailed(true);
                  },
                  { once: true }
                );
              }}
            >
              <Suspense fallback={null}>
                <Scene
                  reducedMotion={reducedMotion}
                  selected={selected}
                  selectedPosition={selectedPosition}
                  onHover={setHovered}
                  onSelect={handleSelect}
                  scrollZoomRef={scrollZoomRef}
                />
              </Suspense>
            </Canvas>
          </WebGLBoundary>
        )}
      </div>

      {!hideCaption && (
        <div className={styles.caption}>
          <p className={styles.captionEyebrow}>The Language Orrery</p>
          <p className={styles.captionBody}>
            Twelve languages, charted in orbit by how I hold them — fluency near the
            center, curiosity further out. Hover a node for its bearings; click one to
            open its notebook.
          </p>
          {hovered && !showList && (
            <p className={styles.captionHint}>
              <span className={styles.captionHintName}>{hovered.name}</span> — {hovered.level}
            </p>
          )}
          {canUse3D && (
            <button
              type="button"
              className={styles.viewToggle}
              onClick={() => setListMode((m) => !m)}
              aria-pressed={listMode}
              title={listMode ? "Switch to orrery view" : "Switch to list view"}
            >
              {listMode ? "⊙ Orrery view" : "≡ List view"}
            </button>
          )}
        </div>
      )}

      <div className={styles.fallback} data-visible={showList || undefined}>
        <p className={styles.fallbackEyebrow}>Languages, by orbit</p>
        <dl className={styles.fallbackList}>
          {languages.map((language) => (
            <div
              key={language.id}
              className={styles.fallbackEntry}
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(language, new THREE.Vector3(0, 0, 0))}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSelect(language, new THREE.Vector3(0, 0, 0)); }}
            >
              <dt>{language.name}</dt>
              <dd>
                {language.level} · {language.focus.join(", ")} · since {language.started}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <NotebookPanel
        open={selected !== null}
        onClose={handleClose}
        eyebrow={selected ? `${selected.level} · Started ${selected.started}` : undefined}
        title={selected?.name ?? ""}
      >
        {selected && (
          <>
            <p>{selected.notes}</p>
            {selected.books && selected.books.length > 0 && (
              <div className={styles.notebookBlock}>
                <p className={styles.notebookLabel}>Books</p>
                <ul className={styles.notebookList}>
                  {selected.books.map((book) => (
                    <li key={book}>{book}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className={styles.notebookBlock}>
              <p className={styles.notebookLabel}>Focus</p>
              <ul className={styles.notebookChips}>
                {selected.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </NotebookPanel>
    </section>
  );
}
