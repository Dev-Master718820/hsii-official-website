"use client";

import { Component, ReactNode, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { ComponentProps } from "react";

/* Catches "Error creating WebGL context" and other render errors silently */
class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type CanvasProps = ComponentProps<typeof Canvas>;

export default function CanvasShell({ children, ...props }: CanvasProps) {
  const [webglOk, setWebglOk] = useState(false);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl =
        (c.getContext("webgl2") as WebGLRenderingContext | null) ??
        (c.getContext("webgl") as WebGLRenderingContext | null);
      setWebglOk(!!gl);
    } catch {
      setWebglOk(false);
    }
  }, []);

  if (!webglOk) return null;

  return (
    <WebGLBoundary>
      <Canvas {...props}>{children}</Canvas>
    </WebGLBoundary>
  );
}
