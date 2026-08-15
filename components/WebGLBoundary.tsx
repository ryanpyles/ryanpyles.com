"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  /** Rendered instead of the 3D subtree once it errors. */
  fallback?: React.ReactNode;
  /** Notified on the first error (e.g. to flip a page to its static view). */
  onError?: () => void;
}

interface State {
  failed: boolean;
}

/**
 * Contains failures from the ornamental 3D layer. WebGL context creation can
 * throw (no GPU, blocked context, driver reset) — without a boundary that
 * throw unwinds the whole React tree and takes the document down with it.
 * Here it degrades to a fallback and the page underneath survives.
 */
export default class WebGLBoundary extends React.Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(): void {
    this.props.onError?.();
  }

  render(): React.ReactNode {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
