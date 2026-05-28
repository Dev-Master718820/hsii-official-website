"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, RefreshCw, Cpu, GraduationCap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Full Operational Audit",
    description:
      "Following the Friction Map diagnostic, we conduct a full audit — mapping every layer of workflow failure, backlog, and hidden human load to build a complete picture of where the system is breaking and why.",
    color: "#6c63ff",
  },
  {
    number: "02",
    icon: RefreshCw,
    title: "Process Redesign",
    description:
      "With friction mapped and severity scored, we redesign the workflow so the organization can stop wasting time, money, and human capacity — and start operating at the level it is already capable of.",
    color: "#a29bfe",
  },
  {
    number: "03",
    icon: Cpu,
    title: "Systems Build",
    description:
      "We design and build the technical infrastructure the redesign calls for — apps, automations, AI tools, dashboards, and integrations that support the new process rather than fighting it.",
    color: "#74b9ff",
  },
  {
    number: "04",
    icon: GraduationCap,
    title: "Training & Adoption",
    description:
      "We train the team so the new system is actually used. Knowledge transfer, adoption support, and documentation — so continuity doesn't depend on a single person.",
    color: "#55efc4",
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function BusinessModelSection() {
  return (
    <section id="what-we-do" className="relative py-28 px-6 overflow-hidden" style={{ backgroundColor: "var(--bg-page)" }}>
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(108,99,255,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Explainer */}
        <FadeUp>
          <div className="max-w-3xl mb-20">
            <p className="text-[#6c63ff] text-sm font-semibold uppercase tracking-widest mb-4">
              After the Diagnostic
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              The Friction Map identifies where the system is breaking.{" "}
              <span className="bg-gradient-to-r from-[#6c63ff] to-[#a29bfe] bg-clip-text text-transparent">
                These are how we fix it.
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Once friction is mapped and severity is scored, we translate findings into four clear
              action pathways — each tied to a specific operational need.
            </p>
          </div>
        </FadeUp>

        {/* Business model steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeUp key={step.number} delay={i * 0.10}>
                <div
                  className="group relative p-7 rounded-2xl border bg-[var(--bg-surface)] hover:border-[#6c63ff]/40 transition-all duration-300 overflow-hidden h-full"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  {/* Step number watermark */}
                  <span
                    className="absolute top-4 right-5 text-6xl font-black select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-20"
                    style={{ color: step.color, opacity: 0.08, lineHeight: 1 }}
                  >
                    {step.number}
                  </span>

                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${step.color}18` }}
                  >
                    <Icon size={20} style={{ color: step.color }} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {step.description}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
