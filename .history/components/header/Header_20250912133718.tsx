"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // fecha o menu ao navegar/scroll
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, []);

  return (
    <header className="sticky top-7 z-50">
      <div className="container-hero">
        <div
          className="glass flex items-center justify-between rounded-[32px] px-4 sm:px-6 py-1.5"
          role="navigation"
          aria-label="Primary"
        >
          {/* logo / nome */}
          <Link href="/" className="font-bold tracking-tight text-xl sm:text-2xl">
            Nina
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((i) => (
              <a key={i.href} href={i.href} className="nav-link">
                {i.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <a
+              href="https://wa.me/5511988004848?text=Ol%C3%A1%2C%20acabei%20de%20visitar%20o%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto%21"
+              target="_blank"
+              rel="noreferrer"
+              className="btn-pill"
+            >
+              Let’s Talk
            </a>
          </div>

          {/* mobile toggle */}
          <button
            aria-label="Abrir menu"
            className="md:hidden p-2 rounded-xl hover:bg-black/5"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* mobile sheet */}
        {open && (
          <div className="md:hidden mt-2 glass rounded-3xl p-3">
            <nav className="grid gap-1">
              {NAV.map((i) => (
                <a
                  key={i.href}
                  href={i.href}
                  className="nav-link"
                  onClick={() => setOpen(false)}
                >
                  {i.label}
                </a>
              ))}
              <a href="#contact" className="btn-pill text-center mt-1">
                Let’s Talk
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
