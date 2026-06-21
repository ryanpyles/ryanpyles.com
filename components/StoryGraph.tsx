"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./StoryGraph.module.css";

const PAPER = "#f5f1ea";
const BRASS = "#c69c5d";

type Vec3 = THREE.Vector3Tuple;

const NODES: { id: number; label: string; pos: Vec3; size: number; color: string }[] = [
  { id: 0, label: "Meridian",   pos: [ 0,     0.15,  0    ], size: 0.115, color: PAPER },
  { id: 1, label: "Archive",    pos: [ 0.95, -0.10,  0.30 ], size: 0.095, color: BRASS },
  { id: 2, label: "Voigt",      pos: [-0.85,  0.35,  0.20 ], size: 0.095, color: PAPER },
  { id: 3, label: "Chapter IV", pos: [ 0.50, -0.75, -0.40 ], size: 0.075, color: PAPER },
  { id: 4, label: "Voice",      pos: [-0.40, -0.60, -0.65 ], size: 0.080, color: PAPER },
  { id: 5, label: "Liminal",    pos: [ 0.10,  0.85, -0.55 ], size: 0.075, color: BRASS },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [0, 5], [1, 2],
];

function GraphEdge({ start, end }: { start: Vec3; end: Vec3 }) {
  return (
    <Line
      points={[start, end]}
      color={PAPER}
      transparent
      opacity={0.12}
      lineWidth={0.8}
    />
  );
}

function GraphNode({
  label,
  pos,
  size,
  color,
}: {
  label: string;
  pos: Vec3;
  size: number;
  color: string;
}) {
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[size, 18, 18]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.16}
          roughness={0.6}
        />
      </mesh>
      <Text
        position={[0, size + 0.14, 0]}
        fontSize={0.09}
        letterSpacing={0.10}
        color={color}
        anchorX="center"
        anchorY="bottom"
        fillOpacity={0.55}
      >
        {label}
      </Text>
    </group>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.09;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[1, 2, 2]} intensity={0.65} color={PAPER} />

      {EDGES.map(([a, b], i) => (
        <GraphEdge key={i} start={NODES[a].pos} end={NODES[b].pos} />
      ))}

      {NODES.map((node) => (
        <GraphNode
          key={node.id}
          label={node.label}
          pos={node.pos}
          size={node.size}
          color={node.color}
        />
      ))}
    </group>
  );
}

export default function StoryGraph() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className={styles.root} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.6, 3.0], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
