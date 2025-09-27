"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "pt" | "en";
type Dict = Record<string, string>;

const DICT: Record<Lang, Dict> = {
  pt: {
    "nav.about": "Sobre",
    "nav.services": "Serviços",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",
    "cta.talk": "Vamos conversar",
  },
  en: {
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "cta.talk": "Let’s Talk",
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nCtx = createContext<Ctx | null>(null);

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("lang");
  if (saved === "pt" || saved === "en") return saved;
  const nav = navigator.language?.toLowerCase() || "";
  return nav.startsWith("pt") ? "pt" : "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.setAttribute("lang", l);
  };

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const t = (key: string) => DICT[lang][key] ?? key;

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
