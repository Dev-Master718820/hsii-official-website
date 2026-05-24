"use client";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a3e] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#6c63ff] to-[#a29bfe] flex items-center justify-center">
            <img src="/images/HSII logo.jpeg" alt="HSII logo" />
          </div>
          <span className="text-sm font-semibold">HSII</span>
        </div>
        <p className="text-xs text-[#6a6a80]">
          © {new Date().getFullYear()} Human Systems Integration & Infrastructure. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs text-[#6a6a80] hover:text-[#a0a0b0] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
