"use client";

import { useEffect, useRef } from "react";

function rX(v: [number,number,number], a: number): [number,number,number] {
  return [v[0], v[1]*Math.cos(a)-v[2]*Math.sin(a), v[1]*Math.sin(a)+v[2]*Math.cos(a)];
}
function rY(v: [number,number,number], a: number): [number,number,number] {
  return [v[0]*Math.cos(a)+v[2]*Math.sin(a), v[1], -v[0]*Math.sin(a)+v[2]*Math.cos(a)];
}

export default function FrictionOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let W = 0, H = 0;
    let rotY = 0;
    let rotXAngle = 0.32;

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Pre-build sphere lat/lon lines as 3D point arrays
    const LAT_COUNT = 9;
    const LON_COUNT = 12;
    const SEGS = 64;

    // Orbiting rings (flat circles at an angle, rotated independently)
    let ringRot1 = 0;
    let ringRot2 = Math.PI / 3;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      rotY += 0.008;
      rotXAngle = 0.32 + Math.sin(rotY * 0.4) * 0.12;
      ringRot1 += 0.012;
      ringRot2 -= 0.009;

      const R = Math.min(W, H) * 0.36;
      const cx = W / 2, cy = H / 2;
      const FOV = 600;

      const proj = (v: [number,number,number]) => {
        let u = rX(v, rotXAngle);
        u = rY(u, rotY);
        const d = FOV / (FOV + u[2] * R * 0.5 + 200);
        return { sx: cx + u[0] * R * d, sy: cy + u[1] * R * d, depth: u[2] };
      };

      // ── Latitude lines ────────────────────────────────────────
      for (let i = 1; i < LAT_COUNT; i++) {
        const lat = (i / LAT_COUNT) * Math.PI - Math.PI / 2;
        const coLat = Math.cos(lat);
        const sinLat = Math.sin(lat);

        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= SEGS; j++) {
          const lon = (j / SEGS) * Math.PI * 2;
          const v: [number,number,number] = [Math.cos(lon)*coLat, sinLat, Math.sin(lon)*coLat];
          const { sx, sy, depth } = proj(v);
          const alpha = Math.max(0, (depth + 1) / 2) * 0.35 + 0.05;
          if (j % Math.ceil(SEGS/24) === 0 && j > 0) {
            ctx.strokeStyle = `rgba(108,99,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
            ctx.beginPath();
            first = true;
          }
          if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = "rgba(108,99,255,0.2)";
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // ── Longitude lines ───────────────────────────────────────
      for (let i = 0; i < LON_COUNT; i++) {
        const lon = (i / LON_COUNT) * Math.PI * 2;
        const cosLon = Math.cos(lon);
        const sinLon = Math.sin(lon);

        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= SEGS; j++) {
          const lat = (j / SEGS) * Math.PI - Math.PI / 2;
          const coLat = Math.cos(lat);
          const v: [number,number,number] = [cosLon*coLat, Math.sin(lat), sinLon*coLat];
          const { sx, sy, depth } = proj(v);
          const alpha = Math.max(0, (depth + 1) / 2) * 0.3 + 0.05;
          if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = "rgba(108,99,255,0.18)";
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // ── Nodes at intersections ────────────────────────────────
      for (let i = 1; i < LAT_COUNT; i++) {
        const lat = (i / LAT_COUNT) * Math.PI - Math.PI / 2;
        const coLat = Math.cos(lat);
        const sinLat = Math.sin(lat);
        for (let j = 0; j < LON_COUNT; j++) {
          const lon = (j / LON_COUNT) * Math.PI * 2;
          const v: [number,number,number] = [Math.cos(lon)*coLat, sinLat, Math.sin(lon)*coLat];
          const { sx, sy, depth } = proj(v);
          if (depth < -0.3) continue;
          const alpha = ((depth + 1) / 2) * 0.9;
          ctx.beginPath();
          ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(162,155,254,${alpha})`;
          ctx.fill();
        }
      }

      // ── Orbiting rings ────────────────────────────────────────
      const drawRing = (baseAngle: number, tilt: number, color: string) => {
        const RSEGS = 80;
        const rR = R * 1.38;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= RSEGS; j++) {
          const a = (j / RSEGS) * Math.PI * 2 + baseAngle;
          const v: [number,number,number] = [Math.cos(a), Math.sin(a) * Math.sin(tilt), Math.sin(a) * Math.cos(tilt)];
          const u = rY(v, rotY);
          const d = FOV / (FOV + u[2] * R * 0.3 + 200);
          const sx = cx + u[0] * rR * d;
          const sy = cy + u[1] * rR * d;
          if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      };
      drawRing(ringRot1, Math.PI / 5, "rgba(108,99,255,0.45)");
      drawRing(ringRot2, -Math.PI / 7, "rgba(253,121,168,0.35)");

      // ── Pulsing core ──────────────────────────────────────────
      const pulse = 0.38 + Math.sin(Date.now() * 0.0022) * 0.18;
      const coreR = R * 0.18 * (1 + Math.sin(Date.now() * 0.0018) * 0.07);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.5);
      grad.addColorStop(0, `rgba(162,155,254,${pulse})`);
      grad.addColorStop(0.4, `rgba(108,99,255,${pulse * 0.5})`);
      grad.addColorStop(1, "rgba(108,99,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210,208,255,${pulse * 0.9})`;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", pointerEvents: "none", display: "block" }}
    />
  );
}
