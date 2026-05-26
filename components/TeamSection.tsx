"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const team = [
  {
    name: "Misty Moore",
    role: "Co-CEO, Human Systems Integration & Infrastructure™ (HSII™) Society’s Backbone™",
    initials: "MM",
    color: "#6c63ff",
    image: "/images/team/misty.png",
    bio: "Systems architect, operational analyst, and framework developer focused on the intersection of human systems, infrastructure, workflow design, and AI-assisted modernization.",
    fullBio: {
      paragraphs: [
        "With a background spanning enterprise operations, CRM-based systems, workflow architecture, quality assurance, reporting environments, and organizational process analysis, her work centers on identifying hidden operational friction inside complex systems.",
        "Misty previously spent more than 7 years helping lead the development, operational management, modernization, and testing of a CRM-based Redress Management System supporting DHS TRIP workflows. Her experience includes requirements development, operational analysis, system testing, SOP creation, training coordination, reporting visibility, backlog reduction, and cross-functional collaboration between operational and technical teams.",
        "She is the creator of Human Systems Integration & Infrastructure (HSII™), an operational analysis framework focused on continuity, operational strain, adaptation load, and the hidden human infrastructure that sustains organizational performance.",
        "Her work combines systems thinking, operational analysis, enterprise modernization, and AI-assisted development to help organizations better understand where operational instability, hidden load, and structural friction emerge beneath surface-level performance metrics.",
      ],
      currentWork: [
        "Operational Friction Map™ (OFM™)",
        "AI-assisted workflow modernization",
        "Operational analysis systems",
        "Enterprise process mapping",
        "Human-centered systems architecture",
        "Continuity and resilience modeling",
        "Workflow and infrastructure diagnostics",
      ],
    },
  },
  {
    name: "Monte White",
    role: "Co-CEO | Operations & Business Infrastructure",
    initials: "MW",
    color: "#74b9ff",
    image: "/images/team/monte.jpeg",
    bio: "Systems-based researcher and co-architect of HSII™, contributing expertise in somatic efficiency, autonomic state tracking, heart-rate variability mapping, and behavioral systems engineering.",
    fullBio: {
      paragraphs: [
        "He provides the biological, measurable, and practical scaffolding that grounds HSII™ in physiology, performance science, and human capacity modeling.",
        "His work focuses on optimizing human systems through low-drag architecture, coherence engineering, and capacity-safe design — ensuring that intelligence, performance, and growth remain sustainable across cycles.",
      ],
      currentWork: [
        "Owner of skitrucks.com",
      ],
    },
  },
  {
    name: "Pavlo Jin",
    role: "Co-Founder & CTO",
    initials: "PJ",
    color: "#55efc4",
    image: "/images/team/pavlo.png",
    bio: "Senior Software Engineer focused on scalable web applications, operational systems, workflow modernization, and AI-assisted development.",
    fullBio: {
      paragraphs: [
        "His work centers on building practical infrastructure that improves usability, reduces operational friction, and supports long-term system maintainability. He has experience across frontend and backend development, enterprise workflows, API integrations, database architecture, and modern web technologies.",
        "Pavlo works closely with operational stakeholders to rapidly translate complex requirements into functional, maintainable systems. His engineering approach emphasizes clarity, scalability, adaptability, and real-world operational performance.",
        "Current projects include operational analysis tooling, AI-assisted workflow systems, enterprise modernization initiatives, and the development of the Operational Friction Map™ platform as part of Human Systems Integration & Infrastructure (HSII™).",
      ],
      currentWork: [
        "Full Stack Development",
        "AI/ML Engineering",
        "AI-Assisted Engineering",
        "Workflow Modernization",
        "Operational Systems",
        "API & Database Integration",
        "Frontend & Backend Architecture",
        "Enterprise Infrastructure",
        "Scalable Web Applications",
      ],
    },
  },
  {
    name: "Krystal Hatch",
    role: "Education & Trading",
    initials: "KH",
    color: "#fd79a8",
    image: null,
    bio: "Driving HSII's education initiatives and trading operations, bridging knowledge-sharing with real-world market strategy.",
    fullBio: {
      paragraphs: [
        "Krystal leads HSII's education and trading verticals, bringing structure and clarity to how the organization teaches, trains, and applies market intelligence.",
        "Her work spans curriculum development, knowledge transfer, and trading strategy — ensuring that HSII's insights translate into practical, actionable outcomes for partners and stakeholders.",
      ],
      currentWork: [
        "Education & Training Programs",
        "Trading Strategy",
        "Curriculum Development",
        "Knowledge Transfer",
        "Market Intelligence",
      ],
    },
  },
  {
    name: "Jessica Mantel",
    role: "Marketing",
    initials: "JM",
    color: "#ffd166",
    image: null,
    bio: "Leading HSII's marketing efforts — shaping brand presence, audience engagement, and the strategic communication of HSII's mission.",
    fullBio: {
      paragraphs: [
        "Jessica drives HSII's marketing strategy, translating complex operational concepts into compelling narratives that resonate with diverse audiences across sectors.",
        "Her work spans brand development, content strategy, campaign execution, and audience growth — ensuring HSII's mission and tools reach the people and organizations that need them most.",
      ],
      currentWork: [
        "Brand Strategy",
        "Content & Campaign Marketing",
        "Audience Engagement",
        "Strategic Communications",
        "Social Media & Outreach",
      ],
    },
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function TeamCard({ person }: { person: (typeof team)[number] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group relative rounded-2xl border bg-[var(--bg-surface)] transition-colors duration-300 overflow-hidden flex flex-col h-full"
      style={{ borderColor: "var(--border-color)" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hi)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none"
        style={{ background: person.color }}
      />

      <div className="p-8 flex flex-col flex-1">
        {/* Avatar */}
        {person.image ? (
          <div
            className="w-20 h-20 rounded-2xl overflow-hidden mb-6 shrink-0"
            style={{ boxShadow: `0 0 32px ${person.color}33` }}
          >
            <Image
              src={person.image}
              alt={person.name}
              width={80}
              height={80}
              className="w-full h-full object-cover object-top"
            />
          </div>
        ) : (
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-6 shrink-0"
            style={{
              background: `linear-gradient(135deg, ${person.color}, ${person.color}66)`,
              boxShadow: `0 0 32px ${person.color}22`,
            }}
          >
            {person.initials}
          </div>
        )}

        <h3 className="text-lg font-semibold mb-1">{person.name}</h3>
        <p className="text-sm font-medium mb-4" style={{ color: person.color }}>
          {person.role}
        </p>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{person.bio}</p>

        {/* Expanded bio */}
        <AnimatePresence initial={false}>
          {expanded && person.fullBio && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-4 border-t mt-5" style={{ borderColor: "var(--border-color)" }}>
                {person.fullBio.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {p}
                  </p>
                ))}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-3">
                    Current work
                  </p>
                  <ul className="space-y-1.5">
                    {person.fullBio.currentWork.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: person.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand toggle */}
        {person.fullBio && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-5 flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 self-start"
            style={{ color: person.color }}
          >
            {expanded ? "Show less" : "Read full bio"}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={14} />
            </motion.span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[#6c63ff]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="max-w-2xl mb-16">
            <p className="text-[#6c63ff] text-sm font-semibold uppercase tracking-widest mb-4">
              The team
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              The people behind{" "}
              <span className="bg-gradient-to-r from-[#6c63ff] to-[#a29bfe] bg-clip-text text-transparent">
                HSII.
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              A founding team that combines systems thinking, entrepreneurial execution, and deep
              technical craft.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((person, i) => (
            <FadeUp key={person.name} delay={i * 0.12}>
              <TeamCard person={person} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
