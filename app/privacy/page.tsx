import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — HSII™ Society's Backbone™",
  description: "Privacy Policy for Human Systems Integration & Infrastructure™ (HSII™) Society's Backbone™.",
};

const sections = [
  {
    title: "Information We Collect",
    content: null,
    bullets: [
      "Contact information (such as name, email address, or phone number if voluntarily submitted)",
      "Information submitted through forms, waitlists, newsletters, demos, or inquiries",
      "Website usage information (such as pages visited, browser/device type, and general analytics)",
    ],
    note: "We do not sell personal information.",
  },
  {
    title: "How We Use Information",
    content: "We may use information to:",
    bullets: [
      "Respond to inquiries",
      "Provide updates, newsletters, or product information",
      "Improve website functionality and user experience",
      "Support product development, research, educational materials, and service delivery",
      "Communicate about services, consulting, pilot programs, or applications",
    ],
    note: null,
  },
  {
    title: "Cookies & Analytics",
    content:
      "Our website may use cookies or analytics tools to understand website performance and improve user experience. You may disable cookies through your browser settings.",
    bullets: null,
    note: null,
  },
  {
    title: "Third-Party Services",
    content:
      "We may use third-party services for website hosting, analytics, scheduling, payment processing, communication, or product functionality. These services operate under their own privacy policies.",
    bullets: null,
    note: null,
  },
  {
    title: "Data Security",
    content:
      "We make reasonable efforts to protect information shared with us. However, no digital system can guarantee complete security.",
    bullets: null,
    note: null,
  },
  {
    title: "Children's Privacy",
    content: "Our website and services are not directed toward children under 13.",
    bullets: null,
    note: null,
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy periodically. Updates will be reflected on this page.",
    bullets: null,
    note: null,
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-32" style={{ backgroundColor: "var(--bg-page)" }}>
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          ← Back to home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-[#6c63ff] text-sm font-semibold uppercase tracking-widest mb-3">
            Legal
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-3" style={{ color: "var(--text-primary)" }}>
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Effective Date: May 26, 2026
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Welcome to HSII Systems™, HSII™ Society's Backbone™, and affiliated platforms
            ("Company," "we," "our," or "us"). We respect your privacy and are committed to
            protecting any information you choose to share with us.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px mb-12" style={{ backgroundColor: "var(--border-color)" }} />

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                {sec.title}
              </h2>
              {sec.content && (
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                  {sec.content}
                </p>
              )}
              {sec.bullets && (
                <ul className="space-y-2 mb-3">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[#6c63ff]" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {sec.note && (
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {sec.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="h-px my-12" style={{ backgroundColor: "var(--border-color)" }} />
        <div>
          <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Contact
          </h2>
          <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Questions?</p>
          <a
            href="mailto:hello@hsii.systems"
            className="text-sm font-medium text-[#6c63ff] hover:text-[#a29bfe] transition-colors"
          >
            hello@hsii.systems
          </a>
        </div>
      </div>
    </main>
  );
}
