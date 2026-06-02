"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, X, CheckCircle2, Loader2 } from "lucide-react";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors";
const inputStyle = {
  background: "var(--bg-surface)",
  borderColor: "var(--border-color)",
  color: "var(--text-primary)",
};
const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  (e.currentTarget.style.borderColor = "rgba(108,99,255,0.6)");
const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  (e.currentTarget.style.borderColor = "var(--border-color)");

export default function IntakeSection() {
  const [form, setForm] = useState({
    clientName: "",
    company: "",
    email: "",
    phone: "",
    keyMetrics: "",
    frictionPoints: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    setFiles((prev) => [...prev, ...Array.from(incoming)]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);
    setError("");

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => fd.append("docs", f));

      const data = await new Promise<{ error?: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/intake");

        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) {
            setProgress(Math.round((ev.loaded / ev.total) * 100));
          }
        };

        xhr.onload = () => {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch {
            reject(new Error("Invalid server response"));
          }
        };

        xhr.onerror = () => reject(new Error("Network error. Please try again."));
        xhr.send(fd);
      });

      if (data.error) throw new Error(data.error);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  if (sent) {
    return (
      <section id="intake" className="relative py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 rounded-2xl border border-[#55efc4]/30 bg-[#55efc4]/5"
          >
            <CheckCircle2 size={48} className="text-[#55efc4] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Intake submitted.</h3>
            <p className="text-[var(--text-muted)] text-sm max-w-xs mx-auto">
              Your submission has been routed to the operator intake queue. We will follow up within
              24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="intake" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6c63ff]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-[#6c63ff] text-sm font-semibold uppercase tracking-widest mb-4">
              Submit Your Intake
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Human-Tech Systems Audit™
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              Describe where your system is breaking. We review every submission and respond with
              findings, severity scoring, and recommended next steps.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Client Info */}
            <div
              className="p-6 rounded-2xl border bg-[var(--bg-surface)]"
              style={{ borderColor: "var(--border-color)" }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6c63ff] mb-5">
                Client Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1.5">
                    Client Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={form.clientName}
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1.5">
                    Company <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Organization or company name"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1.5">
                    Contact Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />
                </div>
              </div>
            </div>

            {/* Operational Inputs */}
            <div
              className="p-6 rounded-2xl border bg-[var(--bg-surface)]"
              style={{ borderColor: "var(--border-color)" }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6c63ff] mb-5">
                Operational Inputs
              </h3>
              <div className="space-y-5">

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Key Metrics</label>
                  <p className="text-xs text-[var(--text-muted)] mb-2 opacity-70">
                    Team size, case volume, turnaround time, error rates — anything you track.
                  </p>
                  <textarea
                    rows={3}
                    placeholder="e.g. 12-person team, 400 cases/month, 5-day average turnaround, ~15% rework rate..."
                    value={form.keyMetrics}
                    onChange={(e) => setForm({ ...form, keyMetrics: e.target.value })}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    Top 5–7 Complaints / Friction Points <span className="text-red-400">*</span>
                  </label>
                  <p className="text-xs text-[var(--text-muted)] mb-2 opacity-70">
                    Where does work break down? What keeps getting dropped, delayed, or done twice?
                  </p>
                  <textarea
                    required
                    rows={7}
                    placeholder={"1. Hand-offs between teams are unclear and cause delays\n2. No consistent SOP for onboarding new clients\n3. Key knowledge lives with one person — no backup\n4. ..."}
                    value={form.frictionPoints}
                    onChange={(e) => setForm({ ...form, frictionPoints: e.target.value })}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    SOPs / Process Documentation
                  </label>
                  <p className="text-xs text-[var(--text-muted)] mb-3 opacity-70">
                    Existing SOPs, org charts, workflow diagrams, or any process documentation you have.
                  </p>
                  <div
                    className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors hover:border-[#6c63ff]/50"
                    style={{ borderColor: "var(--border-color)" }}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      addFiles(e.dataTransfer.files);
                    }}
                  >
                    <Upload size={20} className="mx-auto mb-2 text-[var(--text-muted)]" />
                    <p className="text-sm text-[var(--text-muted)]">
                      Drag & drop or{" "}
                      <span className="text-[#6c63ff] font-medium">click to browse</span>
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1 opacity-60">
                      PDF, DOCX, XLSX, PNG, JPG — up to 10 files
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => addFiles(e.target.files)}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.txt,.csv"
                    />
                  </div>
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {files.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between text-sm px-3 py-2 rounded-lg border"
                          style={{
                            background: "var(--bg-surface)",
                            borderColor: "var(--border-color)",
                          }}
                        >
                          <span className="text-[var(--text-secondary)] truncate">{f.name}</span>
                          <button
                            type="button"
                            onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                            className="ml-3 text-[var(--text-muted)] hover:text-red-400 shrink-0 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-red-400 text-center">{error}</p>}

            {loading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">
                    {progress < 100 ? "Uploading…" : "Processing…"}
                  </span>
                  <span className="font-medium text-[#6c63ff]">
                    {progress < 100 ? `${progress}%` : ""}
                  </span>
                </div>
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden"
                  style={{ background: "var(--border-color)" }}
                >
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#6c63ff] to-[#a29bfe]"
                    initial={{ width: "0%" }}
                    animate={{ width: progress < 100 ? `${progress}%` : "100%" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#6c63ff] hover:bg-[#7c74ff] text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-[#6c63ff]/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {progress < 100 ? `Uploading ${progress}%` : "Processing…"}
                </>
              ) : (
                "Submit for Audit Review →"
              )}
            </button>

            <p className="text-center text-xs text-[var(--text-muted)] opacity-60">
              Every submission is reviewed by a human operator. You will hear back within 24 hours.
            </p>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
