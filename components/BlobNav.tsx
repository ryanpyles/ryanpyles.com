"use client";

import React, {
  useRef,
  useState,
  useCallback,
  Suspense,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import type { Domain } from "@/lib/domain";
import WebGLBoundary from "./WebGLBoundary";
import { useWebGLAvailable } from "@/lib/useWebGLAvailable";
import styles from "./BlobNav.module.css";

interface NavNode {
  label: string;
  href: string;
  theta: number;
  phi: number;
}

const RYAN_NODES: NavNode[] = [
  { label: "Books",    href: "/books",    theta: Math.PI / 2, phi: 0 },
  { label: "Projects", href: "/projects", theta: Math.PI / 2, phi: Math.PI / 2 },
  { label: "About",    href: "/about",    theta: Math.PI / 2, phi: Math.PI },
  { label: "Contact",  href: "/contact",  theta: Math.PI / 2, phi: (3 * Math.PI) / 2 },
];

const FORMAETRIX_NODES: NavNode[] = [
  { label: "Works",   href: "/formaetrix/works",   theta: Math.PI / 2, phi: 0 },
  { label: "Imprint", href: "/formaetrix/imprint", theta: Math.PI / 2, phi: Math.PI / 2 },
  { label: "System",  href: "/formaetrix/system",  theta: Math.PI / 2, phi: Math.PI },
  { label: "Contact", href: "/formaetrix/contact", theta: Math.PI / 2, phi: (3 * Math.PI) / 2 },
];

const RADIUS = 1.35;

function spherePoint(theta: number, phi: number): [number, number, number] {
  return [
    RADIUS * Math.sin(theta) * Math.cos(phi),
    RADIUS * Math.cos(theta),
    RADIUS * Math.sin(theta) * Math.sin(phi),
  ];
}

interface BlobMeshProps {
  domain: Domain;
  hasHover: boolean;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

function BlobMesh({ domain, hasHover, mouseRef }: BlobMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isFormaetrix = domain === "formaetrix";

  const baseGeom = new THREE.IcosahedronGeometry(1, 5);
  const origPositions = Float32Array.from(baseGeom.attributes.position.array);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    const speed = isFormaetrix ? 0.28 : 0.18;
    const amp = isFormaetrix ? 0.11 : 0.07;
    const hoverAmp = hasHover ? 0.04 : 0;

    const positions = mesh.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const ix = origPositions[i * 3];
      const iy = origPositions[i * 3 + 1];
      const iz = origPositions[i * 3 + 2];
      const noise =
        Math.sin(ix * 3.2 + t * speed) *
        Math.cos(iy * 2.8 + t * speed * 1.1) *
        Math.sin(iz * 3.0 + t * speed * 0.9);
      positions.setXYZ(
        i,
        ix + noise * amp + mouseRef.current.x * 0.04,
        iy + noise * amp + mouseRef.current.y * 0.04 + hoverAmp,
        iz + noise * amp
      );
    }
    positions.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.rotation.y += isFormaetrix ? 0.0018 : 0.001;
    mesh.rotation.x += isFormaetrix ? 0.0009 : 0.0005;
  });

  return (
    <mesh ref={meshRef} geometry={baseGeom}>
      <meshStandardMaterial
        color={isFormaetrix ? "#1e1e35" : "#2a2018"}
        roughness={isFormaetrix ? 0.08 : 0.25}
        metalness={isFormaetrix ? 0.85 : 0.55}
        emissive={isFormaetrix ? "#0e0e30" : "#1a1008"}
        emissiveIntensity={1.2}
        envMapIntensity={2.0}
      />
    </mesh>
  );
}

interface SceneProps {
  domain: Domain;
  nodes: NavNode[];
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  onSelect: (href: string, label: string) => void;
  onHoverLabel: (label: string | null) => void;
}

function Scene({ domain, nodes, mouseRef, onSelect, onHoverLabel }: SceneProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isFormaetrix = domain === "formaetrix";

  const handleHover = useCallback(
    (i: number | null) => {
      setHoveredIndex(i);
      onHoverLabel(i !== null ? nodes[i].label : null);
    },
    [nodes, onHoverLabel]
  );

  return (
    <>
      <Environment preset={isFormaetrix ? "studio" : "apartment"} />
      <ambientLight intensity={isFormaetrix ? 0.1 : 0.35} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={isFormaetrix ? 3.0 : 2.0}
        color={isFormaetrix ? "#c8c8ff" : "#ffffff"}
      />
      <pointLight
        position={[-4, -3, -4]}
        intensity={isFormaetrix ? 1.2 : 0.6}
        color={isFormaetrix ? "#ff6030" : "#f0a060"}
      />
      <pointLight
        position={[-2, 1, -4]}
        intensity={isFormaetrix ? 1.5 : 0.4}
        color={isFormaetrix ? "#2040ff" : "#ffffff"}
      />
      <BlobMesh domain={domain} hasHover={hoveredIndex !== null} mouseRef={mouseRef} />
      {nodes.map((node, i) => {
        const pos = spherePoint(node.theta, node.phi);
        const isHovered = hoveredIndex === i;
        return (
          <mesh
            key={node.label}
            position={pos}
            onPointerEnter={() => handleHover(i)}
            onPointerLeave={() => handleHover(null)}
            onClick={() => onSelect(node.href, node.label)}
          >
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial
              color={isHovered ? "#f26a21" : isFormaetrix ? "#888" : "#aaa"}
              emissive={isHovered ? "#f26a21" : "#000000"}
              emissiveIntensity={isHovered ? 0.6 : 0}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </>
  );
}

interface BlobNavProps {
  domain: Domain;
  onNodeClick?: (node: { label: string; href: string }) => void;
}

export default function BlobNav({ domain, onNodeClick }: BlobNavProps) {
  const router = useRouter();
  const webgl = useWebGLAvailable();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [labelPos, setLabelPos] = useState({ x: 0, y: 0 });

  const nodes = domain === "formaetrix" ? FORMAETRIX_NODES : RYAN_NODES;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
    };
    setLabelPos({ x: e.clientX - rect.left, y: e.clientY - rect.top - 24 });
  }, []);

  const handleSelect = useCallback(
    (href: string, label: string) => {
      if (onNodeClick) {
        onNodeClick({ href, label });
      } else {
        router.push(href);
      }
    },
    [router, onNodeClick]
  );

  // No GPU (or not yet probed) → the accessible nav list, never a crash.
  if (webgl !== true) return <BlobNavFallback domain={domain} />;

  return (
    <div
      className={[styles.root, domain === "formaetrix" ? styles.formaetrix : styles.ryan].join(" ")}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredLabel(null)}
    >
      <WebGLBoundary fallback={<BlobNavFallback domain={domain} />}>
        <Canvas
          className={styles.canvas}
          camera={{ position: [0, 0, 3.2], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene
              domain={domain}
              nodes={nodes}
              mouseRef={mouseRef}
              onSelect={handleSelect}
              onHoverLabel={setHoveredLabel}
            />
          </Suspense>
        </Canvas>
      </WebGLBoundary>

      {hoveredLabel && (
        <div
          className={styles.label}
          style={{ left: labelPos.x, top: labelPos.y }}
          aria-hidden
        >
          {hoveredLabel}
        </div>
      )}
    </div>
  );
}

export function BlobNavFallback({ domain }: { domain: Domain }) {
  const nodes = domain === "formaetrix" ? FORMAETRIX_NODES : RYAN_NODES;
  return (
    <nav className={styles.fallback} aria-label="Site navigation">
      <ul role="list">
        {nodes.map((node) => (
          <li key={node.label}>
            <a href={node.href} className={styles.fallbackLink}>
              {node.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
