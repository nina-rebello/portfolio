// components/LanguageSwitcher.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

type Lang = "pt" | "en";
const flags: Record<Lang, string> = { pt: "🇧🇷", en: "🇺🇸" };

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  // fecha ao clicar fora
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest?.("[data-lang-switcher]")) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const label = useMemo(() => (lang === "pt" ? "Português" : "English"), [lang]);

  const choose = (l: Lang) => {
    setLang(l);          // troca no contexto (salva em localStorage e seta <html lang>)
    setOpen(false);
    // se quiser manter seu evento custom (opcional), descomente:
    // window.dispatchEvent(new CustomEvent("app:languagechange", { detail: { lang: l } }));
  };

  return (
    <div
      data-lang-switcher
      className="fixed z-[60] top-5 right-24 md:top-10 md:right-32"
      aria-label="Seletor de idioma"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="glass w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg hover:shadow-xl transition"
        title={label}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span aria-hidden>{flags[lang]}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute -right-25 mt-2 glass rounded-2xl py-1 min-w-[160px] shadow-xl backdrop-blur-sm"
        >
          <button
            role="menuitem"
            onClick={() => choose("pt")}
            className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-xl flex items-center gap-2"
          >
            <span className="text-xl">🇧🇷</span>
            <span>Português</span>
          </button>

          <button
            role="menuitem"
            onClick={() => choose("en")}
            className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-xl flex items-center gap-2"
          >
            <span className="text-xl">🇺🇸</span>
            <span>English</span>
          </button>
        </div>
      )}
    </div>
  );
}
