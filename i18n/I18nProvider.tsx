// context/I18nProvider.tsx
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
    "hero.hello": "Olá!",
    "hero.im": "Eu sou",
    "hero.role": "Desenvolvedora de Websites",
    "hero.quote.pt":
        "Criando experiências digitais e impulsionando marcas através do desenvolvimento web.",
    "hero.quote.en":
        "Crafting digital experiences and empowering brands through web development.",
    "hero.years": "anos",
    "hero.experience": "Experiência",
    "hero.stars_aria": "5 de 5 estrelas",
    "about.title": "Sobre Mim",
    "about.text":
        "Sou uma desenvolvedora de websites apaixonada, focada em construir sites limpos, responsivos e fáceis de usar. Com atenção aos detalhes e amor por design, uno criatividade e funcionalidade.",
         "services.title": "Serviços",
    "services.lead":
        "Criando experiências digitais claras, modernas e eficazes — feitas para conectar pessoas e marcas de forma significativa.",

    "services.software.title": "Software Development",
    "services.software.desc": "Aplicações sob medida para resolver problemas reais.",

    "services.webdev.title": "Web Development",
    "services.webdev.desc": "Sites modernos, escaláveis e otimizados.",

    "services.webdesign.title": "Web Design",
    "services.webdesign.desc":
        "Interfaces limpas, criativas e centradas no usuário que dão vida às ideias.",
    "services.webdesign.partner": "Em parceria com",
    "projects.title": "Meus Projetos",
    "projects.lead": "Alguns trabalhos recentes. Arraste para o lado ou use as setas.",
    "projects.prev": "Anterior",
    "projects.next": "Próximo",
    "projects.modal.close": "Fechar",
    "projects.academicBadge": "Projeto Acadêmico",
    "projects.visit": "Visitar projeto",
    "projects.contributors": "Contribuidores",
    "projects.openRepoAria": "Abrir repositório no GitHub",
    "projects.image": "Imagem",
    "experience.my": "Minha",
    "experience.workExperience": "Experiência Profissional",
    "testi.titleLine1": "Depoimentos que",
    "testi.titleLine2a": "falam sobre",
    "testi.titleLine2b": "meus resultados",
    "testi.lead": "Uma pequena amostra de colaborações recentes — performance, acessibilidade e código sustentável no centro.",
    "testi.carouselAria": "Depoimentos",
    "testi.goto": "Ir para depoimento",
    // navegação extra usada no footer
    "nav.experience": "Experiência",
    "nav.testimonials": "Depoimentos",

    // footer
    "footer.getIn": "Entre em",
    "footer.touch": "Contato",
    "footer.menu": "Menu",
    "footer.contact": "Contato",
    "footer.email": "E-mail",
    "footer.whatsapp": "WhatsApp",
    "footer.allRights": "Todos os direitos reservados",
  },
  en: {
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "cta.talk": "Let’s Talk",
    "hero.hello": "Hello!",
    "hero.im": "I’m",
    "hero.role": "Website Developer",
    "hero.quote.pt":
        "Criando experiências digitais e impulsionando marcas através do desenvolvimento web.",
    "hero.quote.en":
        "Crafting digital experiences and empowering brands through web development.",
    "hero.years": "Years",
    "hero.experience": "Experience",
    "hero.stars_aria": "5 out of 5 stars",
    "about.title": "About Me",
    "about.text":
        "I’m a passionate website developer focused on building clean, responsive, and user-friendly websites. With strong attention to detail and a love for design, I combine creativity with functionality.",
         "services.title": "Services",
    "services.lead":
        "Building digital experiences that are clear, modern, effective, and tailored to connect people with brands in meaningful ways.",

    "services.software.title": "Software Development",
    "services.software.desc": "Custom applications built to solve real problems.",

    "services.webdev.title": "Web Development",
    "services.webdev.desc": "Modern, scalable and optimized websites.",

    "services.webdesign.title": "Web Design",
    "services.webdesign.desc":
        "Clean, creative, and user-focused interfaces that bring ideas to life.",
    "services.webdesign.partner": "In partnership with",
    "projects.title": "My Projects",
    "projects.lead": "Some recent works. Swipe sideways or use the arrows.",
    "projects.prev": "Previous",
    "projects.next": "Next",
    "projects.modal.close": "Close",
    "projects.academicBadge": "Academic Project",
    "projects.visit": "Visit project",
    "projects.contributors": "Contributors",
    "projects.openRepoAria": "Open GitHub repository",
    "projects.image": "Image",
    "experience.my": "My",
    "experience.workExperience": "Work Experience",
    "testi.titleLine1": "Testimonials That",
    "testi.titleLine2a": "Speak to",
    "testi.titleLine2b": "My Results",
    "testi.lead": "A small sample of recent collaborations—performance, accessibility, and maintainable code front and center.",
    "testi.carouselAria": "Testimonials",
    "testi.goto": "Go to testimonial",
    "nav.experience": "Experience",
    "nav.testimonials": "Testimonials",

    "footer.getIn": "Get in",
    "footer.touch": "Touch",
    "footer.menu": "Menu",
    "footer.contact": "Contact",
    "footer.email": "E-mail",
    "footer.whatsapp": "WhatsApp",
    "footer.allRights": "All rights reserved",
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
    // garante que ao montar, o <html lang> reflita o valor atual
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
