"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./IdentityOrbit.module.css";

const PAPER = "#f5f1ea";
const BRASS = "#c69c5d";

function OrbitRing({ radius }: { radius: number }) {
  const points = useMemo<THREE.Vector3Tuple[]>(() => {
    const segs = 80;
    const pts: THREE.Vector3Tuple[] = [];
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius]);

  return (
    <Line points={points} color={PAPER} transparent opacity={0.10} lineWidth={0.8} />
  );
}

function Satellite({
  radius,
  speed,
  label,
  color,
  size,
  startAngle,
  reducedMotion,
}: {
  radius: number;
  speed: number;
  label: string;
  color: string;
  size: number;
  startAngle: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const angle = useRef(startAngle);

  useFrame((_, delta) => {
    if (reducedMotion || !ref.current) return;
    angle.current += speed * delta;
    ref.current.position.x = Math.cos(angle.current) * radius;
    ref.current.position.z = Math.sin(angle.current) * radius;
  });

  return (
    <group
      ref={ref}
      position={[Math.cos(startAngle) * radius, 0, Math.sin(startAngle) * radius]}
    >
      <mesh>
        <sphereGeometry args={[size, 18, 18]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.18}
          roughness={0.55}
        />
      </mesh>
      <Text
        position={[0, size + 0.18, 0]}
        fontSize={0.09}
        letterSpacing={0.14}
        color={color}
        anchorX="center"
        anchorY="bottom"
        fillOpacity={0.65}
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
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.07;
    groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.55} />
      <pointLight position={[1.5, 2.5, 2]} intensity={0.7} color={PAPER} />

      {/* Center node — Ryan */}
      <group>
        <mesh>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial
            color={PAPER}
            emissive={PAPER}
            emissiveIntensity={0.16}
            roughness={0.5}
          />
        </mesh>
        <Text
          position={[0, 0.34, 0]}
          fontSize={0.085}
          letterSpacing={0.16}
          color={PAPER}
          anchorX="center"
          anchorY="bottom"
          fillOpacity={0.5}
        >
          RYAN
        </Text>
      </group>

      <OrbitRing radius={0.82} />
      <OrbitRing radius={1.42} />

      <Satellite
        radius={0.82}
        speed={0.32}
        label="FORMAETRIX"
        color={BRASS}
        size={0.10}
        startAngle={Math.PI * 0.3}
        reducedMotion={reducedMotion}
      />
      <Satellite
        radius={1.42}
        speed={-0.19}
        label="ELIAN VOIGT"
        color={PAPER}
        size={0.095}
        startAngle={Math.PI * 1.1}
        reducedMotion={reducedMotion}
      />
    </group>
  );
}

export default function IdentityOrbit() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className={styles.root} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.8, 3.4], fov: 44 }}
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
