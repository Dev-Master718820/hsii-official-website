"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown, ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";

const slides = [
  { src: "/images/landings/img1.jpeg", alt: "Human Systems Integration & Infrastructure™ (HSII™) Society's Backbone™" },
  { src: "/images/landings/img2.jpeg", alt: "Work is Performance. Practice is Power. Progress is Progress." },
  { src: "/images/landings/img3.jpeg", alt: "Collapse is not Mystery. Collapse is Mathematics." },
];

const INTERVAL = 5500;

export default function HeroSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="overflow-hidden">
      {/* Slideshow */}
      <div ref={imageRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={current}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Image
                src={slides[current].src}
                alt={slides[current].alt}
                fill
                priority={current === 0}
                sizes="100vw"
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom vignette */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, var(--bg-page), transparent)" }}
        />

        {/* Slide dots */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="transition-all duration-300"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1 text-white/40 text-xs">
            <span className="uppercase tracking-widest">scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={16} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Hero text — below the images */}
      <motion.div
        className="px-6 py-24 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[#6c63ff] text-sm font-semibold uppercase tracking-widest mb-6">
          Operational Intelligence
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
          Where is your system{" "}
          <span className="bg-gradient-to-r from-[#6c63ff] via-[#a29bfe] to-[#fd79a8] bg-clip-text text-transparent">
            breaking?
          </span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
          Map operational bottlenecks, workflow failures, hidden load, and continuity risks.
        </p>
        <p className="text-[var(--text-muted)] text-base leading-relaxed mb-10 max-w-2xl mx-auto">
          Identify operational friction, reduce invisible load, and build systems that sustain
          performance without consuming the people who carry them.
        </p>
        <a
          href="#intake"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#6c63ff] hover:bg-[#7c74ff] text-white font-semibold text-base transition-all duration-200 hover:shadow-2xl hover:shadow-[#6c63ff]/40 hover:-translate-y-0.5"
        >
          Start Your Human-Tech Systems Audit™
          <ArrowRight size={18} />
        </a>

        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-2xl mx-auto mt-4">
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1MFhJMv4bpopJ7sQu67y6v9JdmeNcisICg2nObR4FJNswY0VNWuS5IxEOWjAdSSGnTHNOvwdXp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#6c63ff] text-[#6c63ff] hover:bg-[#6c63ff] hover:text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6c63ff]/25"
          >
            <CalendarDays size={17} />
            Free 30 min Operational Analysis Consultation
          </a>
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1MFhJMv4bpopJ7sQu67y6v9JdmeNcisICg2nObR4FJNswY0VNWuS5IxEOWjAdSSGnTHNOvwdXp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#6c63ff] text-[#6c63ff] hover:bg-[#6c63ff] hover:text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6c63ff]/25"
          >
            <CalendarDays size={17} />
            Free 30 min Training Evaluation
          </a>
        </div>
      </motion.div>
    </section>
  );
}
