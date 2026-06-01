"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const mistyStats = [
  {
    value: "36,000+",
    label: "Operational backlog eliminated",
    detail: "Cleared in full while maintaining all incoming workflow, continuity, and case adjudication standards.",
  },
  {
    value: "100,000+",
    label: "Federal redress cases processed",
    detail: "QA, adjudication, escalation, reporting, and workflow oversight across high-volume federal redress operations.",
  },
  {
    value: "35+",
    label: "Dashboards, SOPs & operational systems built",
    detail: "Requirements writing, UAT, process architecture, workflow modernization, and ~40 pages of operational template language.",
  },
  {
    value: "1–2 Days",
    label: "Operational response standards maintained",
    detail: "Instituted and sustained during peak intake and backlog elimination periods — not a target, a standard.",
  },
];

const pavloStats = [
  {
    value: "Full‑Stack",
    label: "Frontend to backend, end-to-end",
    detail: "React, Next.js, Node.js, Python — built and shipped across the full application layer.",
  },
  {
    value: "AI‑Native",
    label: "AI-assisted workflow & tooling",
    detail: "Designed and engineered AI-assisted operational tools, including the Human-Tech Systems Audit™ platform.",
  },
  {
    value: "API + DB",
    label: "Integration & database architecture",
    detail: "Enterprise API integrations, database design, and scalable backend systems for operational environments.",
  },
  {
    value: "Rapid",
    label: "Requirements → working system",
    detail: "Works directly with operational stakeholders to translate complex requirements into functional, maintainable systems fast.",
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function StatCard({
  value,
  label,
  detail,
  accent,
  delay,
}: {
  value: string;
  label: string;
  detail: string;
  accent: string;
  delay: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div
        className="group relative p-6 rounded-2xl border bg-[var(--bg-surface)] h-full transition-all duration-300 overflow-hidden"
        style={{ borderColor: "var(--border-color)" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent + "55")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl"
          style={{ background: accent }}
        />
        <p className="text-3xl font-bold mb-1 bg-clip-text text-transparent"
          style={{ backgroundImage: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
          {value}
        </p>
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{label}</p>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{detail}</p>
      </div>
    </FadeUp>
  );
}

export default function CredibilitySection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ backgroundColor: "var(--bg-page)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 60%, rgba(108,99,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-24">

        {/* Header */}
        <FadeUp>
          <div className="max-w-2xl">
            <p className="text-[#6c63ff] text-sm font-semibold uppercase tracking-widest mb-4">
              Operations + Engineering = Continuity
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
              Real operational scale.{" "}
              <span className="bg-gradient-to-r from-[#6c63ff] to-[#a29bfe] bg-clip-text text-transparent">
                Real engineering delivery.
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              This is not a startup concept — it is built by people who have operated and engineered
              at federal scale. The numbers below are not projections. They are work history.
            </p>
          </div>
        </FadeUp>

        {/* Misty block */}
        <div>
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-[#6c63ff]">MM</span>
              </div>
              <div>
                <p className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Misty Moore, MS</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Co-Founder & CEO — Operational Systems & Infrastructure
                </p>
              </div>
              <div
                className="hidden sm:block ml-auto text-xs px-3 py-1 rounded-full border font-medium"
                style={{ borderColor: "#6c63ff44", color: "#6c63ff" }}
              >
                DHS TRIP · Federal Redress Operations
              </div>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mistyStats.map((s, i) => (
              <StatCard key={s.label} {...s} accent="#6c63ff" delay={i * 0.1} />
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div
              className="mt-6 p-5 rounded-xl border text-sm leading-relaxed"
              style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
            >
              <span className="font-semibold" style={{ color: "var(--text-secondary)" }}>Context: </span>
              Serving as DHS TRIP Subject Matter Expert — requirements writing, UAT/QA, dashboard architecture,
              backlog elimination, case adjudication, escalation management, training design, and workflow redesign.
              Trained TSA Contact Center and CBP personnel. Produced ~40 pages of operational template language that
              remain embedded in federal process infrastructure.
            </div>
          </FadeUp>
        </div>

        {/* Divider */}
        <FadeUp>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-color)" }} />
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--text-muted)" }}>
              Technical Engineering
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-color)" }} />
          </div>
        </FadeUp>

        {/* Pavlo block */}
        <div>
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#55efc4]/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-[#55efc4]">PJ</span>
              </div>
              <div>
                <p className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Pavlo Jin</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Co-Founder & CTO — Technical Engineering & Delivery
                </p>
              </div>
              <div
                className="hidden sm:block ml-auto text-xs px-3 py-1 rounded-full border font-medium"
                style={{ borderColor: "#55efc444", color: "#55efc4" }}
              >
                Full‑Stack · AI Systems · Enterprise Infra
              </div>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pavloStats.map((s, i) => (
              <StatCard key={s.label} {...s} accent="#55efc4" delay={i * 0.1} />
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div
              className="mt-6 p-5 rounded-xl border text-sm leading-relaxed"
              style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
            >
              <span className="font-semibold" style={{ color: "var(--text-secondary)" }}>Context: </span>
              Senior Software Engineer with experience across the full development stack — frontend, backend,
              database architecture, and API integration. Builds AI-assisted operational tooling and enterprise
              modernization systems. Currently leading technical development of the Human-Tech Systems Audit™
              platform and HSII-SB's broader infrastructure suite.
            </div>
          </FadeUp>
        </div>

        {/* Combined signal */}
        <FadeUp delay={0.1}>
          <div
            className="relative rounded-2xl border overflow-hidden p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-surface)" }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(108,99,255,0.04) 0%, rgba(85,239,196,0.04) 100%)" }} />
            <div className="relative flex-1">
              <p className="font-semibold text-base mb-1" style={{ color: "var(--text-primary)" }}>
                Operations + Engineering = Continuity
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                We have operated federal-scale systems and engineered the infrastructure to support them.
                We bring both sides of that equation to every engagement — so nothing gets lost in
                translation between operations and technology.
              </p>
            </div>
            <div className="relative flex gap-3 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#6c63ff]/15 flex items-center justify-center text-xs font-bold text-[#6c63ff]">MM</div>
              <div className="w-8 h-8 rounded-lg bg-[#55efc4]/15 flex items-center justify-center text-xs font-bold text-[#55efc4]">PJ</div>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
