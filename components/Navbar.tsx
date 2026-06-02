"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Intake", href: "/#intake" },
  { label: "Human-Tech Systems Audit™", href: "/#friction-map" },
  { label: "What We Do", href: "/#what-we-do" },
  { label: "About", href: "/#about" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl border-b border-rim" : "bg-transparent"
      }`}
      style={{ backgroundColor: scrolled ? "var(--navbar-scrolled)" : "transparent" }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center group">
          <Image
            src="/images/HSII logo.jpeg"
            alt="HSII-SB logo"
            width={30}
            height={30}
            className="object-contain"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-soft hover:text-ink transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#6c63ff] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-soft hover:text-ink border border-rim hover:border-rim-hi transition-all duration-200"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* CTAs */}
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6c63ff] hover:bg-[#7c74ff] text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#6c63ff]/25"
          >
            Get in touch
          </a>
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1MFhJMv4bpopJ7sQu67y6v9JdmeNcisICg2nObR4FJNswY0VNWuS5IxEOWjAdSSGnTHNOvwdXp"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#6c63ff] text-[#6c63ff] hover:bg-[#6c63ff]/10 text-sm font-medium transition-all duration-200"
          >
            Book a free consultation
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 text-soft hover:text-ink transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="p-2 text-soft hover:text-ink transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden backdrop-blur-xl border-b border-rim overflow-hidden"
            style={{ backgroundColor: "var(--navbar-mobile)" }}
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-soft hover:text-ink text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex px-4 py-2 rounded-lg bg-[#6c63ff] text-white text-sm font-medium"
                >
                  Get in touch
                </a>
              </li>
              <li>
                <a
                  href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1MFhJMv4bpopJ7sQu67y6v9JdmeNcisICg2nObR4FJNswY0VNWuS5IxEOWjAdSSGnTHNOvwdXp"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex px-4 py-2 rounded-lg border border-[#6c63ff] text-[#6c63ff] text-sm font-medium"
                >
                  Book a free consultation
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
