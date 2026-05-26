"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#6c63ff", "#a29bfe", "#fd79a8", "#7c74ff", "#a29bfe"];

// Octahedron geometry
const OCT_VERTS: [number, number, number][] = [
  [1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1],
];
const OCT_EDGES: [number, number][] = [
  [0,2],[0,3],[1,2],[1,3],[0,4],[0,5],[1,4],[1,5],[2,4],[2,5],[3,4],[3,5],
];

// Torus-like ring (approximated as N-gon rotated around Y)
function buildRingEdges(n: number): { verts: [number,number,number][]; edges: [number,number][] } {
  const verts: [number,number,number][] = [];
  const edges: [number,number][] = [];
  const r = 1, tube = 0.32;
  const tubeSegs = 6;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    for (let j = 0; j < tubeSegs; j++) {
      const b = (j / tubeSegs) * Math.PI * 2;
      const x = (r + tube * Math.cos(b)) * Math.cos(a);
      const y = tube * Math.sin(b);
      const z = (r + tube * Math.cos(b)) * Math.sin(a);
      verts.push([x, y, z]);
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < tubeSegs; j++) {
      const cur = i * tubeSegs + j;
      const nextJ = i * tubeSegs + ((j + 1) % tubeSegs);
      const nextI = ((i + 1) % n) * tubeSegs + j;
      edges.push([cur, nextJ], [cur, nextI]);
    }
  }
  return { verts, edges };
}

interface Shape {
  px: number; py: number; pz: number;
  rx: number; ry: number; rz: number;
  drx: number; dry: number;
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

function rotX(v: [number,number,number], a: number): [number,number,number] {
  return [v[0], v[1]*Math.cos(a)-v[2]*Math.sin(a), v[1]*Math.sin(a)+v[2]*Math.cos(a)];
}
function rotY(v: [number,number,number], a: number): [number,number,number] {
  return [v[0]*Math.cos(a)+v[2]*Math.sin(a), v[1], -v[0]*Math.sin(a)+v[2]*Math.cos(a)];
}
function rotZ(v: [number,number,number], a: number): [number,number,number] {
  return [v[0]*Math.cos(a)-v[1]*Math.sin(a), v[0]*Math.sin(a)+v[1]*Math.cos(a), v[2]];
}

const ring = buildRingEdges(18);

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let W = 0, H = 0;
    let mouseX = 0, mouseY = 0;
    let globalRotY = 0;
    let t = 0;

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / W - 0.5) * 2;
      mouseY = (e.clientY / H - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    // Particles
    const particles: Particle[] = Array.from({ length: 550 }, () => ({
      x: (Math.random() - 0.5) * 2600,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 1400 - 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 2.2 + 0.5,
    }));

    // Shapes
    const shapes: Shape[] = [
      { px:-360, py:-160, pz:80, rx:0,   ry:0,   rz:0,   drx:0.009, dry:0.014, scale:72, color:"#6c63ff", opacity:0.28, verts:OCT_VERTS, edges:OCT_EDGES, floatPhase:0,   floatAmp:18, floatSpeed:0.55 },
      { px:390,  py:100,  pz:40, rx:1,   ry:0.5, rz:0,   drx:0.007, dry:-0.011,scale:58, color:"#a29bfe", opacity:0.22, verts:ring.verts,edges:ring.edges, floatPhase:1.5, floatAmp:14, floatSpeed:0.42 },
      { px:210,  py:-270, pz:-80,rx:0.5, ry:1,   rz:0.3, drx:0.011, dry:0.008, scale:48, color:"#fd79a8", opacity:0.2,  verts:OCT_VERTS, edges:OCT_EDGES, floatPhase:3,   floatAmp:12, floatSpeed:0.65 },
      { px:-310, py:190,  pz:-60,rx:0.8, ry:0.3, rz:0.5, drx:0.008, dry:0.016, scale:52, color:"#6c63ff", opacity:0.2,  verts:ring.verts,edges:ring.edges, floatPhase:2,   floatAmp:16, floatSpeed:0.38 },
    ];

    const FOV = 750;
    const project = (px: number, py: number, pz: number) => {
      const tY = mouseX * 0.25;
      const cosY = Math.cos(globalRotY + tY);
      const sinY = Math.sin(globalRotY + tY);
      const x1 = px * cosY - pz * sinY;
      const z1 = px * sinY + pz * cosY;
      const y1 = py - mouseY * 35;
      const d = FOV / (FOV + z1 + 350);
      return { sx: W/2 + x1*d, sy: H/2 + y1*d, d };
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      globalRotY += 0.004;
      t += 0.016;

      // Particles
      for (const p of particles) {
        p.z -= 0.9;
        if (p.z < -350) { p.z = 1400; p.x = (Math.random()-0.5)*2600; p.y = (Math.random()-0.5)*2000; }
        const { sx, sy, d } = project(p.x, p.y, p.z);
        if (d <= 0 || sx < -5 || sx > W+5 || sy < -5 || sy > H+5) continue;
        ctx.globalAlpha = Math.min(0.85, d * 1.4);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.1, p.size * d), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Shapes
      for (const s of shapes) {
        s.rx += s.drx; s.ry += s.dry;
        const floatY = Math.sin(t * s.floatSpeed + s.floatPhase) * s.floatAmp;

        const pv = s.verts.map(v => {
          let u = rotX(v, s.rx);
          u = rotY(u, s.ry);
          u = rotZ(u, s.rz);
          return project(u[0]*s.scale + s.px, u[1]*s.scale + s.py + floatY, u[2]*s.scale + s.pz);
        });

        ctx.globalAlpha = s.opacity;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1;
        for (const [a, b] of s.edges) {
          ctx.beginPath();
          ctx.moveTo(pv[a].sx, pv[a].sy);
          ctx.lineTo(pv[b].sx, pv[b].sy);
          ctx.stroke();
        }

        ctx.globalAlpha = s.opacity * 1.8;
        ctx.fillStyle = s.color;
        for (const { sx, sy, d } of pv) {
          if (d <= 0) continue;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
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
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
