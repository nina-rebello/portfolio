"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type Lang = "pt" | "en";
type I18nCtx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };
const useI18nCtx = () => useI18n() as unknown as I18nCtx;

type Item = { key: string; href: string };
const NAV: Item[] = [
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
];

function MobileLangButton() {
  const { lang, setLang } = useI18nCtx();
  const isPt = lang === "pt";
  const next = isPt ? "en" : "pt";
  const label = isPt ? "Mudar para inglês" : "Switch to Portuguese";
  const onToggle = useCallback(() => setLang(next), [setLang, next]);

  return (
    <button
      aria-label={label}
      className="md:hidden p-2 rounded-xl hover:bg-black/5 active:scale-[0.98] transition"
      onClick={onToggle}
      type="button"
    >
      <span className="text-xl leading-none select-none">{isPt ? "🇧🇷" : "🇺🇸"}</span>
    </button>
  );
}

export default function Header() {
  const { t, lang } = useI18nCtx();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("hashchange", close);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("hashchange", close);
    };
  }, []);

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
          <Link href="/" className="font-bold tracking-tight text-xl sm:text-2xl">
            Nina
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((i) => (
              <a key={i.href} href={i.href} className="nav-link">
                {t(i.key)}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href={waHref} target="_blank" rel="noreferrer" className="btn-pill">
              {a11y.cta}
            </a>
          </div>

          {/* Só no header (mobile) */}
          <div className="flex items-center gap-1 md:hidden">
            <MobileLangButton />
            <button
              aria-label={open ? a11y.closeMenu : a11y.openMenu}
              className="p-2 rounded-xl hover:bg-black/5"
              onClick={() => setOpen((v) => !v)}
              type="button"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* mobile sheet */}
        {open && (
          <div className="md:hidden mt-2 glass rounded-3xl p-3">
            {/* 🔕 Removido o bloco de Language dentro do menu */}
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
