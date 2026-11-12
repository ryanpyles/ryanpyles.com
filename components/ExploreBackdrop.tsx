"use client";

/**
 * ExploreBackdrop — the decorative WebGL layer behind the /explore index.
 * It draws the section/item grid as a wall of hairline frames and dollies a
 * camera along a fixed rail to the focused cell: lateral travel between
 * sections (X), vertical travel within one (Y). Purely ornamental — all real
 * text and links live in the DOM layer above it, so this is aria-hidden and
 * never gates navigation. Mounted only when WebGL is available and motion is
 * allowed; it degrades to nothing behind the 2D index.
 */

import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import type { ExploreSection } from "@/content/exploreMap";

const PAPER = "#f8f6f3";
const INK = "#1a1a1a";
const ORANGE = "#fa7a35";
const GRID = "#e4ded3";

const SX = 5.2; // lateral spacing between sections
const SY = 1.9; // vertical spacing between items
const PW = 2.6; // panel width
const PH = 1.3; // panel height
const CAM_Z = 7.2;

interface Cell {
  s: number;
  i: number;
  x: number;
  y: number;
}

function buildCells(map: ExploreSection[]): Cell[] {
  const cells: Cell[] = [];
  map.forEach((section, s) => {
    const n = section.items.length;
    section.items.forEach((_, i) => {
      // Center each section's stack vertically around y = 0.
      const y = ((n - 1) / 2 - i) * SY;
      cells.push({ s, i, x: s * SX, y });
    });
  });
  return cells;
}

function rect(w: number, h: number): [number, number, number][] {
  return [
    [-w / 2, -h / 2, 0],
    [w / 2, -h / 2, 0],
    [w / 2, h / 2, 0],
    [-w / 2, h / 2, 0],
    [-w / 2, -h / 2, 0],
  ];
}

function Panel({ cell, active, section }: { cell: Cell; active: boolean; section: boolean }) {
  const points = useMemo(() => rect(PW, PH), []);
  const color = active ? ORANGE : INK;
  const opacity = active ? 1 : section ? 0.55 : 0.16;
  const lineWidth = active ? 2 : 1;
  return (
    <group position={[cell.x, cell.y, 0]}>
      {active && (
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[PW, PH]} />
          <meshBasicMaterial color={ORANGE} transparent opacity={0.08} />
        </mesh>
      )}
      <Line points={points} color={color} lineWidth={lineWidth} transparent opacity={opacity} />
      {/* an inner tick, so a focused frame reads as a 'screen' not a box */}
      {active && (
        <Line
          points={[
            [-PW / 2 + 0.25, -PH / 2 + 0.28, 0],
            [-PW / 2 + 0.95, -PH / 2 + 0.28, 0],
          ]}
          color={ORANGE}
          lineWidth={2}
          transparent
          opacity={0.9}
        />
      )}
    </group>
  );
}

function Rig({ focusX, focusY }: { focusX: number; focusY: number }) {
  const target = useRef(new THREE.Vector3(focusX, focusY, CAM_Z));
  const look = useRef(new THREE.Vector3(focusX, focusY, 0));
  const invalidate = useThree((s) => s.invalidate);

  // Render-on-demand: a focus change kicks one frame; the frame loop below
  // sustains itself only while the camera is still settling, then stops. The
  // GPU idles when nothing is moving — the point on a phone's battery.
  useEffect(() => {
    invalidate();
  }, [focusX, focusY, invalidate]);

  useFrame(({ camera }, delta) => {
    const k = 1 - Math.pow(0.0015, delta);
    target.current.set(focusX, focusY, CAM_Z);
    look.current.lerp(new THREE.Vector3(focusX, focusY, 0), k);
    camera.position.lerp(target.current, k);
    camera.lookAt(look.current);
    const dist =
      Math.abs(focusX - camera.position.x) +
      Math.abs(focusY - camera.position.y) +
      Math.abs(CAM_Z - camera.position.z);
    if (dist > 0.002) invalidate();
  });
  return null;
}

export default function ExploreBackdrop({
  map,
  s,
  i,
  lowPower = false,
}: {
  map: ExploreSection[];
  s: number;
  i: number;
  lowPower?: boolean;
}) {
  const cells = useMemo(() => buildCells(map), [map]);
  const n = map[s]?.items.length ?? 1;
  const focusX = s * SX;
  const focusY = ((n - 1) / 2 - i) * SY;

  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [focusX, focusY, CAM_Z], fov: 42 }}
      dpr={lowPower ? [1, 1] : [1, 1.5]}
      gl={{ antialias: !lowPower, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={[PAPER]} />
      <fog attach="fog" args={[PAPER, 10, 26]} />

      {/* Floor + ceiling rails sell the lateral travel. */}
      <gridHelper args={[120, 60, GRID, GRID]} position={[focusX, -4.2, 0]} />
      <gridHelper args={[120, 60, GRID, GRID]} position={[focusX, 4.6, 0]} />

      {cells.map((cell) => (
        <Panel
          key={`${cell.s}-${cell.i}`}
          cell={cell}
          active={cell.s === s && cell.i === i}
          section={cell.s === s}
        />
      ))}

      <Rig focusX={focusX} focusY={focusY} />
    </Canvas>
  );
}
