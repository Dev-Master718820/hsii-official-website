"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScanSearch, Building2, Users, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });

const values = [
  {
    icon: ScanSearch,
    title: "Operational Analysis",
    description: "We map the full system before optimizing any part of it — friction is rarely where surface metrics say it is.",
    color: "#ffd166",
  },
  {
    icon: Building2,
    title: "Enterprise Modernization",
    description: "7+ years modernizing complex government and enterprise systems — from legacy CRM workflows to AI-assisted infrastructure.",
    color: "#a29bfe",
  },
  {
    icon: Users,
    title: "Human Systems Focus",
    description: "We account for the people sustaining the system — continuity, adaptation load, and hidden operational strain are part of the design.",
    color: "#55efc4",
  },
  {
    icon: TrendingUp,
    title: "Measurable Outcomes",
    description: "SOPs, backlog reduction, and response standards that translate directly into operational performance you can see and report on.",
    color: "#fd79a8",
  },
];

const stats = [
  { value: "36,000+", label: "Case backlog resolved" },
  { value: "7+", label: "Years enterprise systems modernization" },
  { value: "40+", label: "SOPs & operational artifacts" },
  { value: "24–72hr", label: "Operational response standards maintained" },
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
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroCanvas />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeUp>
          <div className="max-w-3xl mb-20">
            <p className="text-[#6c63ff] text-sm font-semibold uppercase tracking-widest mb-4">
              About HSII-SB
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              Built for human systems,
              <br />
              driven by{" "}
              <span className="bg-gradient-to-r from-[#6c63ff] to-[#a29bfe] bg-clip-text text-transparent">
                clarity.
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Human Systems Integration & Infrastructure™ (HSII™) Society's Backbone™ is a team
              dedicated to operational clarity and sustainable performance. In partnership, we design
              and engineer tools that help organizations understand, diagnose, and improve the systems
              their people depend on every day.
            </p>
          </div>
        </FadeUp>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.1}>
              <div
                className="group relative p-6 rounded-2xl border bg-[var(--bg-surface)] transition-all duration-300 overflow-hidden"
                style={{ borderColor: "var(--border-color)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hi)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
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
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{v.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ backgroundColor: "var(--border-color)" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="bg-[var(--bg-surface)] px-8 py-10 flex flex-col gap-1"
            >
              <span className="text-4xl font-bold bg-gradient-to-r from-[#6c63ff] to-[#a29bfe] bg-clip-text text-transparent">
                {s.value}
              </span>
              <span className="text-sm text-[var(--text-muted)]">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
