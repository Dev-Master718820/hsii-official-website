"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Palette, BarChart3 } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Performance First",
    description: "Every millisecond counts. We build for speed from day one, not as an afterthought.",
    color: "#ffd166",
  },
  {
    icon: Palette,
    title: "Thoughtful Design",
    description: "Interfaces that delight users while solving real problems with clarity and purpose.",
    color: "#a29bfe",
  },
  {
    icon: Shield,
    title: "Built to Last",
    description: "Solid foundations, clean code, and maintainable architectures that scale with you.",
    color: "#55efc4",
  },
  {
    icon: BarChart3,
    title: "Results Driven",
    description: "We measure success by outcomes — not deliverables. Your growth is our metric.",
    color: "#fd79a8",
  },
];

const stats = [
  { value: "120+", label: "Projects delivered" },
  { value: "8", label: "Years of craft" },
  { value: "40+", label: "Happy clients" },
  { value: "99%", label: "Satisfaction rate" },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-32 px-6">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6c63ff]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="max-w-3xl mb-20">
            <p className="text-[#6c63ff] text-sm font-semibold uppercase tracking-widest mb-4">
              About HSII
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              Built for human systems,
              <br />
              driven by{" "}
              <span className="bg-gradient-to-r from-[#6c63ff] to-[#a29bfe] bg-clip-text text-transparent">
                clarity.
              </span>
            </h2>
            <p className="text-[#a0a0b0] text-lg leading-relaxed">
              HSII — Human Systems Integration & Infrastructure — is a team dedicated to operational
              clarity and sustainable performance. In partnership with Moore, we design and engineer
              tools that help organizations understand, diagnose, and improve the systems their
              people depend on every day.
            </p>
          </div>
        </FadeUp>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.1}>
              <div className="group relative p-6 rounded-2xl border border-[#2a2a3e] bg-[#0d0d1a] hover:border-[#3a3a5e] transition-all duration-300 overflow-hidden">
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"
                  style={{ background: v.color }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${v.color}18` }}
                >
                  <v.icon size={20} style={{ color: v.color }} />
                </div>
                <h3 className="font-semibold text-base mb-2">{v.title}</h3>
                <p className="text-sm text-[#7a7a90] leading-relaxed">{v.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#2a2a3e] rounded-2xl overflow-hidden"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="bg-[#0d0d1a] px-8 py-10 flex flex-col gap-1"
            >
              <span className="text-4xl font-bold bg-gradient-to-r from-[#6c63ff] to-[#a29bfe] bg-clip-text text-transparent">
                {s.value}
              </span>
              <span className="text-sm text-[#7a7a90]">{s.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
