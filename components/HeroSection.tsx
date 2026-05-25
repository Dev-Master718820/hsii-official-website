"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const slides = [
  { src: "/images/landings/img1.jpeg", alt: "HSII — Human Systems Integration & Infrastructure" },
  { src: "/images/landings/img2.jpeg", alt: "Work is Performance. Practice is Power. Progress is Progress." },
  { src: "/images/landings/img3.jpeg", alt: "Collapse is not Mystery. Collapse is Mathematics." },
];

const INTERVAL = 5500;

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Slideshow */}
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
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-10" style={{ background: "linear-gradient(to top, var(--bg-page), transparent)" }} />

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
    </section>
  );
}
