"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export default function Footer() {
  const { t, lang } = useI18n();

  const waHref = useMemo(() => {
    const msgPt =
      "Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.";
    const msgEn =
      "Hi! I saw your portfolio and would love to chat about a project.";
    const text = lang === "pt" ? msgPt : msgEn;
    // se quiser usar outro número, troque aqui:
    return `https://wa.me/5511988004848?text=${encodeURIComponent(text)}`;
  }, [lang]);

  return (
    <footer id="contact" className="relative mt-20 scroll-mt-28">
      {/* Gradiente central acima */}
      <div className="pointer-events-none absolute inset-x-0 -z-0 -top-55 left-1/2 -translate-x-1/2 w-[680px] h-[570px]">
        <img
          src="/gradients/blur-gradient.png"
          alt=""
          className="w-full h-full object-contain opacity-70"
        />
      </div>

      {/* Glow/gradiente suave atrás do topo do footer */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-50 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(139,213,227,0.35),rgba(139,213,227,0)_60%)]" />

      {/* Card principal do footer */}
      <div className="relative z-10 rounded-[28px] bg-white shadow-[0_1px_0_rgba(2,6,23,0.04),0_24px_48px_-24px_rgba(2,6,23,0.18),0_60px_120px_-48px_rgba(2,6,23,0.22)]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3">
          {/* Left: Título grande */}
          <div>
            <h2 className="text-[52px] leading-[1.05] font-light sm:text-[64px]">
              <span className="block">{t("footer.getIn")}</span>
              <span className="font-extrabold italic">{t("footer.touch")}</span>
              <span className="text-[var(--brand,#8bd5e3)]">.</span>
            </h2>
          </div>

          {/* Middle: Menu */}
          <nav aria-label="Footer menu">
            <h3 className="mb-4 font-semibold text-slate-900">{t("footer.menu")}</h3>
            <ul className="space-y-3 text-slate-600">
              <li><a href="#about" className="hover:text-[var(--brand,#8bd5e3)] transition">{t("nav.about")}</a></li>
              <li><a href="#services" className="hover:text-[var(--brand,#8bd5e3)] transition">{t("nav.services")}</a></li>
              <li><a href="#projects" className="hover:text-[var(--brand,#8bd5e3)] transition">{t("nav.projects")}</a></li>
              <li><a href="#experience" className="hover:text-[var(--brand,#8bd5e3)] transition">{t("nav.experience")}</a></li>
              <li><a href="#testimonials" className="hover:text-[var(--brand,#8bd5e3)] transition">{t("nav.testimonials")}</a></li>
            </ul>
          </nav>

          {/* Right: Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-slate-900">{t("footer.contact")}</h3>
            <ul className="space-y-3 text-slate-600">
              <li><a href="mailto:rebellonina@gmail.com" className="hover:text-[var(--brand,#8bd5e3)] transition">{t("footer.email")}</a></li>
              <li><a href={waHref} target="_blank" rel="noreferrer" className="hover:text-[var(--brand,#8bd5e3)] transition">{t("footer.whatsapp")}</a></li>
              <li><a href="https://www.linkedin.com/in/nina-rebello-francisco/" target="_blank" rel="noreferrer" className="hover:text-[var(--brand,#8bd5e3)] transition">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-6 text-sm text-slate-500 md:flex-row">
            <p>©2025 BR Nina Rebello. {t("footer.allRights")}</p>

            {/* Socials */}
            <div className="flex items-center gap-4">
              <a href="mailto:rebellonina@gmail.com" aria-label="Gmail" className="hover:opacity-80 transition">
                <Image src="/icons/gmail.png" alt="Gmail" width={24} height={24} />
              </a>
              <a href="https://www.linkedin.com/in/nina-rebello-francisco/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:opacity-80 transition">
                <Image src="/icons/linkedin.png" alt="LinkedIn" width={24} height={24} />
              </a>
              <a href="https://youtube.com/@ninarebs" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:opacity-80 transition">
                <Image src="/icons/youtube.png" alt="YouTube" width={24} height={24} />
              </a>
              <a href={waHref} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:opacity-80 transition">
                <Image src="/icons/whatsapp.png" alt="WhatsApp" width={24} height={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
