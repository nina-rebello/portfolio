"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type Item = { key: string; href: string };

const NAV: Item[] = [
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
];

// --- MOBILE-ONLY language button (pequeno, ao lado do menu)
function MobileLangButton() {
  const { lang, setLang } = useI18n() as any;
  const isPt = lang === "pt";
  const next = isPt ? "en" : "pt";
  const label = isPt ? "Mudar para inglês" : "Switch to Portuguese";
  return (
    <button
      aria-label={label}
      className="md:hidden p-2 rounded-xl hover:bg-black/5 active:scale-[0.98] transition"
      onClick={() => setLang?.(next)}
    >
      <span className="text-xl leading-none select-none">
        {isPt ? "🇧🇷" : "🇺🇸"}
      </span>
    </button>
  );
}

export default function Header() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);

  // fecha o menu ao rolar / trocar hash
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("hashchange", close);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("hashchange", close);
    };
  }, []);

  // 🔒 Esconde QUALQUER switcher antigo SÓ no mobile (classes/id comuns)
  useEffect(() => {
    const apply = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const nodes = document.querySelectorAll(
        ".language-switcher, [data-language-switcher], [data-lang-switcher], #language-switcher"
      );
      nodes.forEach((el) => {
        if (isMobile) el.classList.add("hidden");
        else el.classList.remove("hidden");
      });
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  // mensagem do WhatsApp no idioma atual
  const waHref = useMemo(() => {
    const msgPt =
      "Olá, vi o seu portfólio e me interessei! Podemos conversar sobre um projeto?";
    const msgEn =
      "Hi! I saw your portfolio and I'm interested. Can we talk about a project?";
    const text = lang === "pt" ? msgPt : msgEn;
    return `https://wa.me/5511988004848?text=${encodeURIComponent(text)}`;
  }, [lang]);

  const a11y = useMemo(
    () => ({
      openMenu: lang === "pt" ? "Abrir menu" : "Open menu",
      closeMenu: lang === "pt" ? "Fechar menu" : "Close menu",
      primaryNav: lang === "pt" ? "Navegação principal" : "Primary navigation",
      cta: lang === "pt" ? "Vamos conversar" : "Let’s Talk",
    }),
    [lang]
  );

  return (
    <header className="fixed inset-x-0 top-7 z-50">
      <div className="container-hero">
        <div
          className="glass flex items-center justify-between rounded-[32px] px-4 sm:px-6 py-1.5"
          role="navigation"
          aria-label={a11y.primaryNav}
        >
          {/* logo / nome */}
          <Link href="/" className="font-bold tracking-tight text-xl sm:text-2xl">
            Nina
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((i) => (
              <a key={i.href} href={i.href} className="nav-link">
                {t(i.key)}
              </a>
            ))}
          </nav>

          {/* CTA (desktop) */}
          <div className="hidden md:block">
            <a href={waHref} target="_blank" rel="noreferrer" className="btn-pill">
              {a11y.cta}
            </a>
          </div>

          {/* Ações à direita no MOBILE: linguagem + menu */}
          <div className="flex items-center gap-1 md:hidden">
            <MobileLangButton />
            <button
              aria-label={open ? a11y.closeMenu : a11y.openMenu}
              className="p-2 rounded-xl hover:bg-black/5"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* mobile sheet */}
        {open && (
          <div className="md:hidden mt-2 glass rounded-3xl p-3">
            {/* Lingua também acessível dentro do sheet */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm/6 text-black/60 dark:text-white/60">
                {lang === "pt" ? "Idioma" : "Language"}
              </span>
              <MobileLangButton />
            </div>
            <nav className="grid gap-1">
              {NAV.map((i) => (
                <a
                  key={i.href}
                  href={i.href}
                  className="nav-link"
                  onClick={() => setOpen(false)}
                >
                  {t(i.key)}
                </a>
              ))}
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="btn-pill text-center mt-1"
              >
                {a11y.cta}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
