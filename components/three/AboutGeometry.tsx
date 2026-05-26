"use client";

import { useEffect, useRef } from "react";

function rX(v: [number,number,number], a: number): [number,number,number] {
  return [v[0], v[1]*Math.cos(a)-v[2]*Math.sin(a), v[1]*Math.sin(a)+v[2]*Math.cos(a)];
}
function rY(v: [number,number,number], a: number): [number,number,number] {
  return [v[0]*Math.cos(a)+v[2]*Math.sin(a), v[1], -v[0]*Math.sin(a)+v[2]*Math.cos(a)];
}
function rZ(v: [number,number,number], a: number): [number,number,number] {
  return [v[0]*Math.cos(a)-v[1]*Math.sin(a), v[0]*Math.sin(a)+v[1]*Math.cos(a), v[2]];
}

// Octahedron
const OCT_V: [number,number,number][] = [
  [1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1],
];
const OCT_E: [number,number][] = [
  [0,2],[0,3],[1,2],[1,3],[0,4],[0,5],[1,4],[1,5],[2,4],[2,5],[3,4],[3,5],
];

// Simple cube wireframe
const CUBE_V: [number,number,number][] = [
  [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
  [-1,-1, 1],[1,-1, 1],[1,1, 1],[-1,1, 1],
];
const CUBE_E: [number,number][] = [
  [0,1],[1,2],[2,3],[3,0], [4,5],[5,6],[6,7],[7,4], [0,4],[1,5],[2,6],[3,7],
];

const COLORS = ["#6c63ff","#a29bfe","#fd79a8","#55efc4","#ffd166","#6c63ff"];

interface FloatingShape {
  px: number; py: number; pz: number;
  rx: number; ry: number; rz: number;
  drx: number; dry: number; drz: number;
  scale: number;
  color: string;
  opacity: number;
  verts: [number,number,number][];
  edges: [number,number][];
  floatPhase: number;
  floatAmp: number;
  floatSpeed: number;
}

interface Particle {
  x: number; y: number; z: number;
  color: string;
  size: number;
}

export default function AboutGeometry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let W = 0, H = 0;
    let t = 0;
    let globalRotY = 0;

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const shapes: FloatingShape[] = [
      { px:-0.7, py:-0.25, pz:0,   rx:0,   ry:0,   rz:0,   drx:0.009, dry:0.013, drz:0.003, scale:0.09, color:COLORS[0], opacity:0.18, verts:OCT_V, edges:OCT_E, floatPhase:0,   floatAmp:0.04, floatSpeed:0.55 },
      { px:0.72, py:-0.15, pz:-0.1,rx:1,   ry:0.5, rz:0,   drx:0.006, dry:-0.01, drz:0.004, scale:0.07, color:COLORS[1], opacity:0.14, verts:CUBE_V,edges:CUBE_E,floatPhase:1.5, floatAmp:0.03, floatSpeed:0.42 },
      { px:0,    py:-0.45, pz:0.05,rx:0.5, ry:1,   rz:0.3, drx:0.011, dry:0.008, drz:0.005, scale:0.065,color:COLORS[2], opacity:0.13, verts:OCT_V, edges:OCT_E, floatPhase:3,   floatAmp:0.035,floatSpeed:0.65 },
      { px:-0.55,py:0.3,   pz:-0.1,rx:0.8, ry:0.3, rz:0.5, drx:0.008, dry:0.016, drz:0.002, scale:0.075,color:COLORS[3], opacity:0.12, verts:CUBE_V,edges:CUBE_E,floatPhase:2,   floatAmp:0.03, floatSpeed:0.38 },
      { px:0.5,  py:0.35,  pz:0.05,rx:0.3, ry:0.7, rz:0.2, drx:0.007, dry:0.012, drz:0.006, scale:0.06, color:COLORS[4], opacity:0.11, verts:OCT_V, edges:OCT_E, floatPhase:4,   floatAmp:0.028,floatSpeed:0.48 },
      { px:-0.3, py:0.42,  pz:0.1, rx:0.2, ry:0.9, rz:0.1, drx:0.01,  dry:-0.008,drz:0.004, scale:0.055,color:COLORS[5], opacity:0.1,  verts:CUBE_V,edges:CUBE_E,floatPhase:5,   floatAmp:0.025,floatSpeed:0.6  },
    ];

    const particles: Particle[] = Array.from({ length: 280 }, () => ({
      x: Math.random(), y: Math.random(),
      z: Math.random() * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 1.8 + 0.5,
    }));

    const FOV = 1.8;

    const proj = (v: [number,number,number]) => {
      const d = FOV / (FOV + v[2]);
      return { sx: v[0] * d, sy: v[1] * d, d };
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.014;
      globalRotY += 0.003;

      // Particles
      for (const p of particles) {
        const sz = p.size + Math.sin(t * 0.5 + p.x * 10) * 0.3;
        const alpha = 0.3 + Math.sin(t * 0.4 + p.y * 8) * 0.12;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, sz, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Shapes
      for (const s of shapes) {
        s.rx += s.drx; s.ry += s.dry; s.rz += s.drz;
        const floatY = Math.sin(t * s.floatSpeed + s.floatPhase) * s.floatAmp;

        const worldVerts = s.verts.map(v => {
          let u = rX(v, s.rx);
          u = rY(u, s.ry + globalRotY * 0.4);
          u = rZ(u, s.rz);
          return [u[0]*s.scale + s.px, u[1]*s.scale + s.py + floatY, u[2]*s.scale + s.pz] as [number,number,number];
        });

        const pv = worldVerts.map(v => {
          const { sx, sy, d } = proj(v);
          return { sx: sx * W, sy: sy * H, d };
        });

        ctx.strokeStyle = s.color;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = s.opacity;
        for (const [a, b] of s.edges) {
          ctx.beginPath();
          ctx.moveTo(pv[a].sx, pv[a].sy);
          ctx.lineTo(pv[b].sx, pv[b].sy);
          ctx.stroke();
        }

        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.opacity * 1.8;
        for (const { sx, sy } of pv) {
          ctx.beginPath();
          ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

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
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
