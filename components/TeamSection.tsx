"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

const team = [
  {
    name: "Misty Moore",
    role: "Co-CEO, Human Systems Integration & Infrastructure™ (HSII™) Society's Backbone™",
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
    image: "/images/team/krystal.jpeg",
    bio: "Dedicated educator of 20+ years inspiring critical thinkers, skilled writers, and lifelong learners across English, ESL, and intervention programs.",
    fullBio: {
      paragraphs: [
        "Krystal Hatch has been a dedicated educator for more than 20 years, inspiring and guiding her students to become critical thinkers, skilled writers, and lifelong learners. Over the years, Ms. Hatch has taught a variety of English courses, including Freshman, Sophomore, and Junior English, Creative Writing, Sheltered ESL English, and Intervention Reading and Writing, and has received recognition for her excellence in teaching.",
        "Her passion for literature and language has enabled her to create a positive and engaging learning environment for her students, allowing them to thrive both academically and personally. In addition to her teaching duties, Ms. Hatch has also been a mentor to her students, providing them with guidance and support as they navigate their academic and personal lives. She has helped her students overcome challenges and achieve their goals, both in and outside of the classroom.",
        "Ms. Hatch's dedication extends beyond her role as a teacher. She works tirelessly to promote literacy and education wherever she goes. Her enthusiasm for teaching and her unwavering dedication to her students has made her a beloved and respected member of the educational community.",
      ],
      currentWork: [
        "Freshman, Sophomore & Junior English Education",
        "Creative Writing",
        "Sheltered ESL English",
        "Intervention Reading & Writing",
        "Student Mentorship",
        "Literacy Promotion",
      ],
    },
  },
  {
    name: "Savannah Fowler",
    role: "Chief Financial Officer (CFO)",
    initials: "SF",
    color: "#00cec9",
    image: "/images/team/savannah.png",
    bio: "People-centered CFO bringing financial stewardship, organizational continuity, and human-centered accountability to HSII™ Society's Backbone™.",
    fullBio: {
      paragraphs: [
        "Savannah Fowler brings a grounded, people-centered approach to operational and financial stewardship at HSII™ Society's Backbone™.",
        "With experience spanning caregiving, education, manufacturing, and service environments, Savannah has developed a practical understanding of responsibility, accountability, and the real-world systems that support people and organizations. Her background reflects a consistent commitment to helping others, maintaining reliability under pressure, and supporting the day-to-day operations that keep systems moving.",
        "Savannah's professional experience includes supporting vulnerable populations, teaching and caregiving, operational manufacturing environments, and customer-focused service roles — experiences that strengthened her ability to manage competing priorities, stay organized, and lead with empathy, consistency, and resilience.",
        "As Chief Financial Officer, Savannah supports financial operations, organizational continuity, and administrative infrastructure while helping ensure the company grows in a sustainable and responsible way. She brings a human-centered perspective to financial stewardship, balancing operational realities with long-term organizational stability.",
        "Savannah believes strong systems are built not only through performance, but through consistency, care, and accountability to the people they serve.",
      ],
      currentWork: [
        "Financial Operations",
        "Organizational Continuity",
        "Administrative Infrastructure",
        "Sustainable Growth Strategy",
        "Human-Centered Stewardship",
      ],
    },
  },
  {
    name: "Jessica Mantell",
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

type Person = (typeof team)[number];

/* ── Bio Modal ──────────────────────────────────────────────────── */
function BioModal({ person, onClose }: { person: Person; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-2xl border bg-[var(--bg-surface)] shadow-2xl"
        style={{ borderColor: `${person.color}44` }}
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: `linear-gradient(to right, transparent, ${person.color}88, transparent)` }}
        />

        <div className="p-7">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-5 mb-7 pr-8">
            {person.image ? (
              <div
                className="w-16 h-16 rounded-2xl overflow-hidden shrink-0"
                style={{ boxShadow: `0 0 24px ${person.color}33` }}
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ) : (
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${person.color}, ${person.color}66)`,
                  boxShadow: `0 0 24px ${person.color}22`,
                }}
              >
                {person.initials}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold mb-1">{person.name}</h3>
              <p className="text-sm font-medium leading-snug" style={{ color: person.color }}>
                {person.role}
              </p>
            </div>
          </div>

          {/* Bio paragraphs */}
          <div className="space-y-4 mb-7">
            {person.fullBio.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-[var(--text-muted)] leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Current work */}
          <div
            className="rounded-xl border p-5"
            style={{ borderColor: "var(--border-color)", background: "var(--bg-page)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-4">
              Current work
            </p>
            <ul className="space-y-2.5">
              {person.fullBio.currentWork.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: person.color }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/* ── Team Card ──────────────────────────────────────────────────── */
function TeamCard({ person, onOpen }: { person: Person; onOpen: () => void }) {
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
        <p className="text-sm font-medium mb-4 leading-snug" style={{ color: person.color }}>
          {person.role}
        </p>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">{person.bio}</p>

        {/* View full bio button */}
        <button
          onClick={onOpen}
          className="mt-6 self-start text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-[1.03]"
          style={{
            color: person.color,
            borderColor: `${person.color}40`,
            background: `${person.color}0d`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = `${person.color}1a`;
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${person.color}80`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = `${person.color}0d`;
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${person.color}40`;
          }}
        >
          View full bio
        </button>
      </div>
    </div>
  );
}

/* ── FadeUp ─────────────────────────────────────────────────────── */
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

/* ── Section ────────────────────────────────────────────────────── */
export default function TeamSection() {
  const [selected, setSelected] = useState<Person | null>(null);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {team.map((person, i) => (
            <FadeUp key={person.name} delay={i * 0.12}>
              <TeamCard person={person} onOpen={() => setSelected(person)} />
            </FadeUp>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <BioModal person={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
