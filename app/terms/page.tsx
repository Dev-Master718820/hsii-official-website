import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — HSII™ Society's Backbone™",
  description: "Terms of Use for Human Systems Integration & Infrastructure™ (HSII™) Society's Backbone™.",
};

const sections = [
  {
    title: "Informational & Educational Purpose",
    paragraphs: [
      "Content provided through this website is intended for informational, educational, operational, and professional development purposes.",
      "Nothing on this website constitutes legal, medical, psychological, financial, or professional advice.",
      "Users are responsible for their own decisions and actions.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "All content, frameworks, concepts, language, graphics, trademarks, methods, and materials — including but not limited to HSII™, RAVEN™, MLO™, HOME Framework™, Society's Backbone™, and related materials — are owned by or licensed to the Company unless otherwise stated.",
      "Content may not be copied, reproduced, redistributed, or commercially used without written permission.",
    ],
  },
  {
    title: "No Guarantees",
    paragraphs: [
      "We strive to provide useful information, systems, tools, and services; however, we make no guarantees regarding outcomes, performance, business success, operational improvements, or individual results.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "Use of this website is at your own risk.",
      "To the fullest extent permitted by law, the Company shall not be liable for indirect, incidental, consequential, or damages arising from use of this website, services, tools, or materials.",
    ],
  },
  {
    title: "Third-Party Links",
    paragraphs: [
      "This website may include links to third-party websites or services. We are not responsible for their content, privacy practices, or functionality.",
    ],
  },
  {
    title: "Changes to Terms",
    paragraphs: [
      "We may modify these Terms at any time. Continued use of the website constitutes acceptance of updated terms.",
    ],
  },
];

export default function TermsPage() {
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
            Terms of Use
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Effective Date: May 26, 2026
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            By accessing this website, you agree to the following terms.
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
              <div className="space-y-2">
                {sec.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="h-px my-12" style={{ backgroundColor: "var(--border-color)" }} />
        <div>
          <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Contact
          </h2>
          <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
            Questions regarding these terms?
          </p>
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
