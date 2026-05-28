"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, CheckCircle2, CalendarDays } from "lucide-react";

const SocialXIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const SocialGithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const SocialLinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socials = [
  { Icon: SocialXIcon, label: "X (Twitter)", href: "#" },
  { Icon: SocialGithubIcon, label: "GitHub", href: "#" },
  { Icon: SocialLinkedinIcon, label: "LinkedIn", href: "#" },
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

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6c63ff]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-[#6c63ff] text-sm font-semibold uppercase tracking-widest mb-4">
              Contact
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Let&apos;s build something
              <br />
              <span className="bg-gradient-to-r from-[#6c63ff] via-[#a29bfe] to-[#fd79a8] bg-clip-text text-transparent">
                great together.
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto mb-8">
              Whether you have a project in mind or just want to say hello — we&apos;d love to hear
              from you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-2xl mx-auto">
              <a
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1MFhJMv4bpopJ7sQu67y6v9JdmeNcisICg2nObR4FJNswY0VNWuS5IxEOWjAdSSGnTHNOvwdXp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#6c63ff] text-[#6c63ff] hover:bg-[#6c63ff] hover:text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6c63ff]/25"
              >
                <CalendarDays size={17} />
                30 min Operational Analysis Consultation
              </a>
              <a
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1MFhJMv4bpopJ7sQu67y6v9JdmeNcisICg2nObR4FJNswY0VNWuS5IxEOWjAdSSGnTHNOvwdXp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#6c63ff] text-[#6c63ff] hover:bg-[#6c63ff] hover:text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6c63ff]/25"
              >
                <CalendarDays size={17} />
                30 min Training Evaluation
              </a>
            </div>
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info panel */}
          <FadeUp delay={0.1}>
            <div className="space-y-8">
              <div className="p-6 rounded-2xl border bg-[var(--bg-surface)] flex items-start gap-4" style={{ borderColor: "var(--border-color)" }}>
                <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/15 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#a29bfe]" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Email us</p>
                  <p className="text-[var(--text-muted)] text-sm">hello@hsii.systems</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border bg-[var(--bg-surface)] flex items-start gap-4" style={{ borderColor: "var(--border-color)" }}>
                <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/15 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#a29bfe]" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Location</p>
                  <p className="text-[var(--text-muted)] text-sm">Maryland & Utah</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-[var(--text-muted)] mb-4">Follow along</p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-10 h-10 rounded-xl border bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[#6c63ff]/50 transition-all duration-200"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <s.Icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="relative p-6 rounded-2xl border bg-[var(--bg-surface)] overflow-hidden" style={{ borderColor: "var(--border-color)" }}>
                <div className="absolute top-4 right-4 text-6xl leading-none text-[#6c63ff]/10 font-serif select-none">
                  &ldquo;
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic">
                  HSII-SB reframes capacity, safety, resilience, and continuity as design responsibilities — helping organizations identify operational friction, reduce invisible load, and build systems that sustain performance without consuming the people who carry them.
                </p>
                <p className="text-xs text-[var(--text-xmuted)] mt-3">— Misty Moore, Founder</p>
              </div>
            </div>
          </FadeUp>

          {/* Form */}
          <FadeUp delay={0.2}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border border-[#55efc4]/30 bg-[#55efc4]/5 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CheckCircle2 size={48} className="text-[#55efc4]" />
                </motion.div>
                <h3 className="text-xl font-semibold">Message sent!</h3>
                <p className="text-[var(--text-muted)] text-sm max-w-xs">
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-2 text-sm text-[#6c63ff] hover:text-[#a29bfe] transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-2">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors"
                      style={{
                        background: "var(--bg-surface)",
                        borderColor: "var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(108,99,255,0.6)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-2">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors"
                      style={{
                        background: "var(--bg-surface)",
                        borderColor: "var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(108,99,255,0.6)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors resize-none"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(108,99,255,0.6)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-[#6c63ff] hover:bg-[#7c74ff] text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-[#6c63ff]/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      Send message
                      <Send size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
