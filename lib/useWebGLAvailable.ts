"use client";

import { useEffect, useState } from "react";

let cached: boolean | null = null;

/** Probe for a usable WebGL context. Cached — the answer never changes
 *  within a session, and creating throwaway contexts is not free. */
function detect(): boolean {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cached = Boolean(gl);
  } catch {
    cached = false;
  }
  return cached;
}

/**
 * Whether WebGL can be used. `null` until checked on the client (so SSR and
 * the first paint never assume a GPU); then a stable `true`/`false`.
 */
export function useWebGLAvailable(): boolean | null {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    setOk(detect());
  }, []);
  return ok;
}
