"use client";

import { useEffect, useMemo, useState } from "react";

type Lang = "pt" | "en";

const flags: Record<Lang, string> = { pt: "🇧🇷", en: "🇺🇸" };

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("lang");
  if (saved === "pt" || saved === "en") return saved;
  const nav = navigator.language?.toLowerCase() || "";
  return nav.startsWith("pt") ? "pt" : "en";
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(getInitialLang);

  // aplica atributo lang no <html>, salva e dispara evento p/ app reagir
  const applyLang = (l: Lang) => {
    setLang(l);
    document.documentElement.setAttribute("lang", l);
    localStorage.setItem("lang", l);
    window.dispatchEvent(new CustomEvent("app:languagechange", { detail: { lang: l } }));
  };

  useEffect(() => {
    applyLang(lang); // garante aplicação na montagem
    // fecha ao clicar fora
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest?.("[data-lang-switcher]")) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const label = useMemo(() => (lang === "pt" ? "Português" : "English"), [lang]);

  return (
    <div
      data-lang-switcher
      className="
        fixed z-[60] top-5 right-24 md:top-10 md:right-32"
      aria-label="Seletor de idioma"
    >
      {/* Botão circular */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          glass
          w-10 h-10
          rounded-full
          flex items-center justify-center
          text-xl
          shadow-lg
          hover:shadow-xl
          transition
        "
        title={label}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span aria-hidden>{flags[lang]}</span>
      </button>

      {/* <button
        onClick={() => setOpen((v) => !v)}
        className="
            w-10 h-10
            flex items-center justify-center
            text-xl
            transition
        "
        >
        <span aria-hidden>{flags[lang]}</span>
        </button> */}


      {/* Menu */}
       {open && (
        <div
            role="menu"
            className="
            absolute
            -right-25
            mt-2
            glass
            rounded-2xl
            py-1
            min-w-[160px]
            shadow-xl
            backdrop-blur-sm
            "
        >
          <button
            role="menuitem"
            onClick={() => {
              applyLang("pt");
              setOpen(false);
            }}
            className="
              w-full text-left px-3 py-2
              hover:bg-white/5 rounded-xl
              flex items-center gap-2
            "
          >
            <span className="text-xl">🇧🇷</span>
            <span>Português</span>
          </button>

          <button
            role="menuitem"
            onClick={() => {
              applyLang("en");
              setOpen(false);
            }}
            className="
              w-full text-left px-3 py-2
              hover:bg-white/5 rounded-xl
              flex items-center gap-2
            "
          >
            <span className="text-xl">🇺🇸</span>
            <span>English</span>
          </button>
        </div>
      )}
    </div>
  );
}
