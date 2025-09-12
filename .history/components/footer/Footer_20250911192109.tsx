"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Glow/gradiente suave atrás do topo do footer */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-50 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(139,213,227,0.35),rgba(139,213,227,0)_60%)]" />

      {/* Card principal do footer */}
      <div className="rounded-[28px] bg-white shadow-[0_1px_0_rgba(2,6,23,0.04),0_24px_48px_-24px_rgba(2,6,23,0.18),0_60px_120px_-48px_rgba(2,6,23,0.22)]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3">
          {/* Left: Título grande */}
          <div>
            <h2 className="text-[52px] leading-[1.05] font-light sm:text-[64px]">
              <span className="block">Get in</span>
              <span className="font-extrabold italic">Touch</span>
              <span className="text-[var(--brand,#8bd5e3)]">.</span>
            </h2>
          </div>

          {/* Middle: Menu */}
          <nav aria-label="Footer menu">
            <h3 className="mb-4 font-semibold text-slate-900">Menu</h3>
            <ul className="space-y-3 text-slate-600">
              <li><a href="#about" className="hover:text-[var(--brand,#8bd5e3)] transition">About me</a></li>
              <li><a href="#services" className="hover:text-[var(--brand,#8bd5e3)] transition">Services</a></li>
              <li><a href="#experience" className="hover:text-[var(--brand,#8bd5e3)] transition">Experience</a></li>
              <li><a href="#testimonials" className="hover:text-[var(--brand,#8bd5e3)] transition">Testimonials</a></li>
            </ul>
          </nav>

          {/* Right: Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Contact</h3>
            <ul className="space-y-3 text-slate-600">
              <li><a href="mailto:hello@yourdomain.com" className="hover:text-[var(--brand,#8bd5e3)] transition">E-mail</a></li>
              <li><a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="hover:text-[var(--brand,#8bd5e3)] transition">Whatsapp</a></li>
              <li><a href="https://www.linkedin.com/in/username" target="_blank" rel="noreferrer" className="hover:text-[var(--brand,#8bd5e3)] transition">Linkedin</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-6 text-sm text-slate-500 md:flex-row">
            <p>©2025 BR Nina Rebello. All rights reserved</p>

            {/* Socials – SVG inline, minimalista */}
            <div className="flex items-center gap-4">
              {/* Gmail */}
             <a href="mailto:rebellonina@gmail.com" aria-label="Gmail">
                <Image src="/icons8-gmail-logo-144.png" alt="Gmail" width={20} height={20} />
            </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/nina-rebello" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:opacity-80 transition">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0A66C2"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.1c.5-.9 1.7-2.3 3.9-2.3 4.2 0 5 2.8 5 6.4V24h-4v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V24h-4V8.5z"/></svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/@niarebs" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:opacity-80 transition">
                <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="#FF0000" d="M23.5 6.2a3.1 3.1 0 0 0-2.2-2.2C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.3.5A3.1 3.1 0 0 0 .5 6.2 32 32 0 0 0 0 12a32 32 0 0 0 .5 5.8 3.1 3.1 0 0 0 2.2 2.2c1.8.5 9.3.5 9.3.5s7.5 0 9.3-.5a3.1 3.1 0 0 0 2.2-2.2A32 32 0 0 0 24 12a32 32 0 0 0-.5-5.8z"/><path fill="#fff" d="M9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/5511988004848" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:opacity-80 transition">
                <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="#25D366" d="M20.5 3.5A11.9 11.9 0 0 0 12 0 12 12 0 0 0 1.8 17.7L0 24l6.5-1.7A12 12 0 1 0 20.5 3.5z"/><path fill="#fff" d="M17.6 14.2c-.3.8-1.4 1.5-2.2 1.7-.6.1-1.4.2-4-.8-3.3-1.3-5.5-4.8-5.7-5S5 8.6 5.5 7.8c.2-.3.6-.7.8-.8.2-.1.4-.2.6 0 .2 0 .4.6.5.8.1.2.3.4.2.6 0 .2-.1.3-.2.5-.1.1-.2.3-.3.4-.1.1-.2.2-.1.4.1.2.5.8 1.1 1.4.8.9 1.5 1.2 1.7 1.3.2.1.4.1.5 0s.8-.3 1-.6c.2-.3.4-.3.6-.2.2.1 1.6.8 1.8.9.2.1.4.2.5.3.1.2.1.4 0 .6z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
