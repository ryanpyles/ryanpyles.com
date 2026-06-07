"use client";

import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import type * as THREE from "three";
import NotebookPanel from "./NotebookPanel";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import {
  manuscriptFragments,
  type ManuscriptFragment,
} from "@/content/manuscriptFragments";
import styles from "./LivingManuscript.module.css";

type TroikaTextMesh = THREE.Mesh & { fillOpacity: number };

const KIND_LABEL: Record<ManuscriptFragment["kind"], string> = {
  note: "Marginal Note",
  greeting: "Greeting, Translated",
  coordinate: "Coordinate",
  snippet: "Typesetting Fragment",
};

const REST_OPACITY = 0.14;
const HOVER_OPACITY = 0.65;

interface FragmentTextProps {
  fragment: ManuscriptFragment;
  index: number;
  reducedMotion: boolean;
  onSelect: (fragment: ManuscriptFragment) => void;
}

function FragmentText({ fragment, index, reducedMotion, onSelect }: FragmentTextProps) {
  const textRef = useRef<TroikaTextMesh>(null);
  const [hovered, setHovered] = useState(false);
  const opacityRef = useRef(REST_OPACITY);
  const seed = index * 1.31;

  useFrame(({ clock }) => {
    const text = textRef.current;
    if (!text) return;

    if (!reducedMotion) {
      const t = clock.getElapsedTime();
      text.position.x = fragment.position[0] + Math.sin(t * 0.06 + seed) * 0.2;
      text.position.y = fragment.position[1] + Math.cos(t * 0.05 + seed) * 0.16;
    }

    const target = hovered ? HOVER_OPACITY : REST_OPACITY;
    opacityRef.current += (target - opacityRef.current) * 0.08;
    text.fillOpacity = opacityRef.current;
  });

  const handleOver = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  }, []);

  const handleOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = "auto";
  }, []);

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      onSelect(fragment);
    },
    [fragment, onSelect]
  );

  return (
    <Text
      ref={textRef}
      position={fragment.position}
      fontSize={fragment.kind === "snippet" ? 0.13 : 0.17}
      color="#1a1a1a"
      anchorX="center"
      anchorY="middle"
      fillOpacity={REST_OPACITY}
      maxWidth={3.4}
      textAlign="center"
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={handleClick}
    >
      {fragment.label}
    </Text>
  );
}

interface SceneProps {
  reducedMotion: boolean;
  onSelect: (fragment: ManuscriptFragment) => void;
}

function Scene({ reducedMotion, onSelect }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.7} />
      {manuscriptFragments.map((fragment, index) => (
        <FragmentText
          key={fragment.id}
          fragment={fragment}
          index={index}
          reducedMotion={reducedMotion}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

export default function LivingManuscript() {
  const [selected, setSelected] = useState<ManuscriptFragment | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const handleSelect = useCallback((fragment: ManuscriptFragment) => {
    setSelected(fragment);
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div className={styles.root} aria-hidden="true">
        <Canvas
          className={styles.canvas}
          camera={{ position: [0, 0, 4], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene reducedMotion={reducedMotion} onSelect={handleSelect} />
          </Suspense>
        </Canvas>
      </div>

      <NotebookPanel
        open={selected !== null}
        onClose={handleClose}
        eyebrow={selected ? KIND_LABEL[selected.kind] : undefined}
        title={selected?.label ?? ""}
      >
        {selected && <p>{selected.detail}</p>}
      </NotebookPanel>
    </>
  );
}
