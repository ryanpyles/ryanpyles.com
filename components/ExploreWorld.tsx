"use client";

/**
 * ExploreWorld — the immersive 3D environment behind /explore.
 *
 * Sections are gallery bays along a fixed lateral rail; items are framed
 * panels stacked vertically within a bay. The section title, its index, and
 * each item's title are rendered IN the scene (drei Text), so you fly through
 * the content rather than reading it off a card. A cinematic rig dollies to
 * the focused cell with pointer parallax, a slow idle sway, and an entrance
 * push-in; fog and distance-fade give depth.
 *
 * Panels are interactive: clicking a focused panel opens it, clicking another
 * flies there first (handled by the parent). All real links and the keyboard
 * model live in the DOM layer above — this scene is aria-hidden, and the
 * parent drops it entirely when WebGL or motion is unavailable.
 */

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import type { ExploreSection } from "@/content/exploreMap";

const PAPER = "#f8f6f3";
const INK = "#1a1a1a";
const ORANGE = "#fa7a35";
const MUTED = "#6a6a6a";
const GRID = "#e3ddd2";

const SX = 9; // lateral spacing between section bays
const SY = 2.4; // vertical spacing between item panels
const PW = 3.6; // panel width
const PH = 1.8; // panel height
const CAM_Z = 6.6; // eye distance from the panel plane
const FLOOR_Y = -4.4;

function rect(w: number, h: number): [number, number, number][] {
  return [
    [-w / 2, -h / 2, 0],
    [w / 2, -h / 2, 0],
    [w / 2, h / 2, 0],
    [-w / 2, h / 2, 0],
    [-w / 2, -h / 2, 0],
  ];
}

const PANEL_PTS = rect(PW, PH);

interface WorldProps {
  map: ExploreSection[];
  s: number;
  i: number;
  lowPower?: boolean;
  onPanelClick: (section: number, item: number) => void;
}

export default function ExploreWorld(props: WorldProps) {
  const { map, s, i, lowPower = false } = props;
  const n = map[s]?.items.length ?? 1;
  const focusX = s * SX;
  const focusY = ((n - 1) / 2 - i) * SY;

  return (
    <Canvas
      camera={{ position: [focusX, focusY, CAM_Z + 6], fov: 46 }}
      dpr={lowPower ? [1, 1] : [1, 1.75]}
      gl={{ antialias: !lowPower, powerPreference: lowPower ? "low-power" : "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={[PAPER]} />
      <fog attach="fog" args={[PAPER, 9, 34]} />
      <ambientLight intensity={0.95} />

      <Floor focusX={focusX} />
      <Ceiling focusX={focusX} />

      {map.map((section, si) => (
        <Bay
          key={si}
          section={section}
          si={si}
          activeSection={s}
          activeItem={i}
          onPanelClick={props.onPanelClick}
        />
      ))}

      <Rig focusX={focusX} focusY={focusY} lowPower={lowPower} />
    </Canvas>
  );
}

/* A receding floor grid that carries the sense of travel. */
function Floor({ focusX }: { focusX: number }) {
  return (
    <gridHelper
      args={[160, 80, GRID, GRID]}
      position={[focusX, FLOOR_Y, 0]}
    />
  );
}

function Ceiling({ focusX }: { focusX: number }) {
  return <gridHelper args={[160, 80, GRID, GRID]} position={[focusX, -FLOOR_Y, 0]} />;
}

function sectionOpacity(distance: number): number {
  return Math.max(0.06, 1 - distance * 0.46);
}

function Bay({
  section,
  si,
  activeSection,
  activeItem,
  onPanelClick,
}: {
  section: ExploreSection;
  si: number;
  activeSection: number;
  activeItem: number;
  onPanelClick: (section: number, item: number) => void;
}) {
  const x = si * SX;
  const dist = Math.abs(si - activeSection);
  const op = sectionOpacity(dist);
  const isActiveSection = si === activeSection;
  const n = section.items.length;
  const topY = ((n - 1) / 2) * SY + PH / 2 + 1.1;

  return (
    <group position={[x, 0, 0]}>
      {/* Back wall frame, set behind the panels for depth. */}
      <Line
        points={rect(PW + 3.2, SY * n + 2.2)}
        position={[0, 0, -2.4]}
        color={INK}
        lineWidth={1}
        transparent
        opacity={op * 0.25}
      />

      {/* Section index + title, rendered into the bay. */}
      <Text
        position={[-(PW / 2) - 1.3, topY, -1.2]}
        fontSize={0.6}
        color={isActiveSection ? ORANGE : MUTED}
        anchorX="left"
        anchorY="middle"
        fillOpacity={op}
        letterSpacing={0.1}
      >
        {String(si + 1).padStart(2, "0")}
      </Text>
      <Text
        position={[-(PW / 2) - 1.3, topY - 0.95, -1.2]}
        fontSize={0.95}
        maxWidth={PW + 3}
        color={INK}
        anchorX="left"
        anchorY="top"
        fillOpacity={op}
        letterSpacing={-0.01}
      >
        {section.title}
      </Text>

      {section.items.map((item, ii) => {
        const y = ((n - 1) / 2 - ii) * SY;
        const focused = isActiveSection && ii === activeItem;
        return (
          <ItemPanel
            key={ii}
            title={item.title}
            y={y}
            focused={focused}
            opacity={op}
            onClick={() => onPanelClick(si, ii)}
          />
        );
      })}
    </group>
  );
}

function ItemPanel({
  title,
  y,
  focused,
  opacity,
  onClick,
}: {
  title: string;
  y: number;
  focused: boolean;
  opacity: number;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const frameColor = focused ? ORANGE : INK;
  const textColor = focused ? ORANGE : INK;

  function over(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    setHover(true);
    document.body.style.cursor = "pointer";
  }
  function out() {
    setHover(false);
    document.body.style.cursor = "";
  }

  return (
    <group position={[0, y, 0]}>
      {/* Interactive fill — faint, but the ray target and the glow surface. */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={over}
        onPointerOut={out}
      >
        <planeGeometry args={[PW, PH]} />
        <meshBasicMaterial
          color={focused ? ORANGE : INK}
          transparent
          opacity={focused ? 0.1 : hover ? 0.05 : 0.015}
        />
      </mesh>
      <Line
        points={PANEL_PTS}
        color={frameColor}
        lineWidth={focused ? 2.5 : 1}
        transparent
        opacity={focused ? 1 : opacity * (hover ? 0.9 : 0.6)}
      />
      <Text
        position={[0, 0, 0.05]}
        fontSize={0.32}
        maxWidth={PW * 0.82}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        fillOpacity={focused ? 1 : opacity}
        letterSpacing={0.02}
      >
        {title}
      </Text>
    </group>
  );
}

function Rig({
  focusX,
  focusY,
  lowPower,
}: {
  focusX: number;
  focusY: number;
  lowPower: boolean;
}) {
  const look = useRef(new THREE.Vector3(focusX, focusY, 0));
  const intro = useRef(0);

  useFrame((state, delta) => {
    const { camera, pointer, clock } = state;
    // Entrance push-in, once.
    if (intro.current < 1) {
      intro.current = Math.min(1, intro.current + delta / 1.3);
    }
    const ease = 1 - Math.pow(1 - intro.current, 3);
    const introZ = (1 - ease) * 6;

    // Pointer parallax + a slow idle sway for presence (muted on low power).
    const amp = lowPower ? 0 : 1;
    const t = clock.elapsedTime;
    const parX = pointer.x * 0.7 * amp;
    const parY = pointer.y * 0.45 * amp;
    const swayX = Math.sin(t * 0.25) * 0.14 * amp;
    const swayY = Math.cos(t * 0.19) * 0.1 * amp;

    const targetX = focusX + parX + swayX;
    const targetY = focusY + parY + swayY;
    const targetZ = CAM_Z + introZ;

    const k = 1 - Math.pow(0.0018, delta);
    camera.position.x += (targetX - camera.position.x) * k;
    camera.position.y += (targetY - camera.position.y) * k;
    camera.position.z += (targetZ - camera.position.z) * k;

    look.current.lerp(new THREE.Vector3(focusX, focusY, 0), k);
    camera.lookAt(look.current);
  });

  return null;
}
