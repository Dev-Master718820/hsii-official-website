"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScanSearch, Gauge, ArrowRightCircle, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";

const FrictionOrb = dynamic(() => import("@/components/three/FrictionOrb"), { ssr: false });

const features = [
  {
    icon: ScanSearch,
    title: "Automated Classification",
    description:
      "Describe any operational problem and the system instantly categorizes it into structured failure types — no manual triage required.",
    color: "#6c63ff",
  },
  {
    icon: Gauge,
    title: "Severity Scoring",
    description:
      "Every issue is assessed and scored for urgency, helping teams focus energy where it matters most instead of guessing at priorities.",
    color: "#a29bfe",
  },
  {
    icon: ArrowRightCircle,
    title: "Action Pathways",
    description:
      "Receive concrete recommended next steps tailored to each problem — so your team moves from diagnosis to resolution faster.",
    color: "#fd79a8",
  },
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

export default function FrictionMapSection() {
  return (
    <section id="friction-map" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#6c63ff]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#fd79a8]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
            {/* Text */}
            <div className="flex-1 max-w-2xl">
              <p className="text-[#6c63ff] text-sm font-semibold uppercase tracking-widest mb-4">
                HSII-SB Operational Intelligence
              </p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                Introducing the{" "}
                <span className="bg-gradient-to-r from-[#6c63ff] via-[#a29bfe] to-[#fd79a8] bg-clip-text text-transparent">
                  Operational Friction Map™
                </span>
              </h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                A diagnostic tool that turns complex operational breakdowns into clear,
                actionable intelligence. Describe the problem — get structured answers in seconds.
              </p>
            </div>

            {/* 3D Orb */}
            <div className="w-full lg:w-[420px] h-[340px] lg:h-[420px] shrink-0">
              <FrictionOrb />
            </div>
          </div>
        </FadeUp>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.12}>
              <div
                className="group relative p-7 rounded-2xl border bg-[var(--bg-surface)] transition-all duration-300 overflow-hidden h-full"
                style={{ borderColor: "var(--border-color)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hi)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"
                  style={{ background: f.color }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${f.color}18` }}
                >
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="font-semibold text-base mb-3">{f.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA banner */}
        <FadeUp delay={0.2}>
          <div
            className="relative rounded-2xl border bg-[var(--bg-surface)] overflow-hidden p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6c63ff]/5 via-transparent to-[#fd79a8]/5 pointer-events-none" />

            <div className="relative">
              <p className="text-lg font-semibold mb-1">Ready to map your friction?</p>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-lg">
                Submit any operational challenge and receive a severity-scored breakdown with
                recommended action pathways — no setup, no friction.
              </p>
            </div>

            <a
              href="https://operational-friction-map-service.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#6c63ff] hover:bg-[#7c74ff] text-white font-semibold text-sm transition-all duration-200 hover:shadow-2xl hover:shadow-[#6c63ff]/30 hover:-translate-y-0.5"
            >
              Launch the tool
              <ExternalLink size={15} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
