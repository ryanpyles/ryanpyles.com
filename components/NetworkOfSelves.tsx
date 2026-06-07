"use client";

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import NotebookPanel from "./NotebookPanel";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import {
  networkNodes,
  networkEdges,
  type NetworkNode,
} from "@/content/networkOfSelves";
import styles from "./NetworkOfSelves.module.css";

const PAPER = "#f5f1ea";
const BRASS = "#c69c5d";

const DRIFT_SCALE = 0.08;

interface NodeMeshProps {
  node: NetworkNode;
  active: boolean;
  reducedMotion: boolean;
  onHover: (node: NetworkNode | null) => void;
  onSelect: (node: NetworkNode) => void;
}

function NodeMesh({ node, active, reducedMotion, onHover, onSelect }: NodeMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const base = useMemo(() => new THREE.Vector3(...node.position), [node.position]);
  const seed = useMemo(() => node.id.charCodeAt(0) * 1.31, [node.id]);
  const scaleRef = useRef(1);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;

    if (!reducedMotion) {
      const t = clock.getElapsedTime();
      group.position.set(
        base.x + Math.sin(t * 0.05 + seed) * DRIFT_SCALE,
        base.y + Math.cos(t * 0.04 + seed) * DRIFT_SCALE,
        base.z
      );
    }

    const targetScale = hovered || active ? 1.5 : 1;
    scaleRef.current += (targetScale - scaleRef.current) * 0.1;
    group.scale.setScalar(scaleRef.current);
  });

  const handleOver = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setHovered(true);
      onHover(node);
      document.body.style.cursor = "pointer";
    },
    [node, onHover]
  );

  const handleOut = useCallback(() => {
    setHovered(false);
    onHover(null);
    document.body.style.cursor = "auto";
  }, [onHover]);

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      onSelect(node);
    },
    [node, onSelect]
  );

  const lit = hovered || active;
  const tint = lit ? BRASS : PAPER;

  return (
    <group
      ref={groupRef}
      position={node.position}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={handleClick}
    >
      <mesh>
        <sphereGeometry args={[0.055, 14, 14]} />
        <meshStandardMaterial
          color={tint}
          emissive={lit ? BRASS : "#000000"}
          emissiveIntensity={lit ? 0.65 : 0}
          roughness={0.5}
        />
      </mesh>
      <Text
        position={[0, 0.18, 0]}
        fontSize={0.09}
        letterSpacing={0.1}
        color={tint}
        fillOpacity={lit ? 1 : 0.55}
        anchorX="center"
        anchorY="middle"
      >
        {node.label.toUpperCase()}
      </Text>
    </group>
  );
}

interface EdgeLineProps {
  source: NetworkNode;
  target: NetworkNode;
  active: boolean;
}

function EdgeLine({ source, target, active }: EdgeLineProps) {
  const points = useMemo(
    () =>
      [
        new THREE.Vector3(...source.position).toArray(),
        new THREE.Vector3(...target.position).toArray(),
      ] as [number, number, number][],
    [source.position, target.position]
  );

  return (
    <Line
      points={points}
      color={active ? BRASS : PAPER}
      transparent
      opacity={active ? 0.55 : 0.09}
      lineWidth={active ? 1.4 : 0.7}
    />
  );
}

interface SceneProps {
  reducedMotion: boolean;
  selected: NetworkNode | null;
  onHover: (node: NetworkNode | null) => void;
  onSelect: (node: NetworkNode) => void;
}

function Scene({ reducedMotion, selected, onHover, onSelect }: SceneProps) {
  const activeEdges = useMemo(() => {
    if (!selected) return new Set<string>();
    return new Set(
      networkEdges
        .filter((edge) => edge.source === selected.id || edge.target === selected.id)
        .map((edge) => `${edge.source}:${edge.target}`)
    );
  }, [selected]);

  const nodeMap = useMemo(() => {
    const map: Record<string, NetworkNode> = {};
    networkNodes.forEach((node) => (map[node.id] = node));
    return map;
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#f5f1ea" />

      {networkEdges.map((edge) => (
        <EdgeLine
          key={`${edge.source}:${edge.target}`}
          source={nodeMap[edge.source]}
          target={nodeMap[edge.target]}
          active={activeEdges.has(`${edge.source}:${edge.target}`)}
        />
      ))}

      {networkNodes.map((node) => {
        const connectedToSelected = selected
          ? networkEdges.some(
              (edge) =>
                (edge.source === selected.id && edge.target === node.id) ||
                (edge.target === selected.id && edge.source === node.id)
            )
          : false;
        return (
          <NodeMesh
            key={node.id}
            node={node}
            active={node.id === selected?.id || connectedToSelected}
            reducedMotion={reducedMotion}
            onHover={onHover}
            onSelect={onSelect}
          />
        );
      })}
    </>
  );
}

export default function NetworkOfSelves() {
  const [selected, setSelected] = useState<NetworkNode | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const handleSelect = useCallback((node: NetworkNode) => {
    setSelected((prev) => (prev?.id === node.id ? null : node));
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <section className={styles.root} id="network-of-selves" aria-label="Network of Selves — the identities I carry">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Network of Selves</p>
        <p className={styles.intro}>
          Eight identities, connected by how they inform each other. Click any
          node to illuminate its edges and open its notebook.
        </p>
      </header>

      <div className={styles.canvasWrap} aria-hidden="true">
        <Canvas
          className={styles.canvas}
          camera={{ position: [0, 0, 4.2], fov: 44 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene
              reducedMotion={reducedMotion}
              selected={selected}
              onHover={() => {}}
              onSelect={handleSelect}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className={styles.fallback}>
        <dl className={styles.fallbackList}>
          {networkNodes.map((node) => (
            <div key={node.id} className={styles.fallbackEntry}>
              <dt>{node.label}</dt>
              <dd>{node.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      <NotebookPanel
        open={selected !== null}
        onClose={handleClose}
        eyebrow="Identity"
        title={selected?.label ?? ""}
      >
        {selected && (
          <>
            <p>{selected.description}</p>
            {selected.links.length > 0 && (
              <div className={styles.notebookBlock}>
                <p className={styles.notebookLabel}>Connected Work</p>
                <ul className={styles.notebookList}>
                  {selected.links.map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </NotebookPanel>
    </section>
  );
}
