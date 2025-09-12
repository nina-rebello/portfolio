"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;  // caminho local em /public ou URL
  rating: number;  // 0–5
  text: string;
};

const DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Jayesh Patil",
    role: "CEO, Lirante",
    avatar: "/avatars/jayesh.jpg",
    rating: 5,
    text:
      "Sed congue interdum ligula a dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis orci elementum egestas lobortis.",
  },
  {
    id: "t2",
    name: "Amira Khalid",
    role: "Head of Product, Noon",
    avatar: "/avatars/amira.jpg",
    rating: 5,
    text:
      "Trabalho impecável do início ao fim. Otimizou nossos fluxos e trouxe clareza ao roadmap. Recomendo sem pensar duas vezes.",
  },
  {
    id: "t3",
    name: "Lucas Prado",
    role: "CTO, Cidvise",
    avatar: "/avatars/lucas.jpg",
    rating: 4.5,
    text:
      "Entrega consistente, documentação excelente e olho clínico para design de sistemas. A parceria elevou nosso padrão.",
  },
  {
    id: "t4",
    name: "Maha Al-Thani",
    role: "Program Director, Expo",
    avatar: "/avatars/maha.jpg",
    rating: 5,
    text:
      "Execução rápida e com muita atenção aos detalhes visuais. A experiência final ficou elegante e performance ótima.",
  },
];

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={"f" + i} viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
          <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9 5.06 16.8 6 11.3l-4-3.9 5.53-.8L10 1.6z" fill="#ff8c32" />
        </svg>
      ))}
      {half && (
        <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#ff8c32" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9 5.06 16.8 6 11.3l-4-3.9 5.53-.8L10 1.6z" fill="url(#half)" stroke="#ff8c32" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={"e" + i} viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
          <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9 5.06 16.8 6 11.3l-4-3.9 5.53-.8L10 1.6z" fill="none" stroke="#ff8c32" />
        </svg>
      ))}
      <span className="ml-2 font-semibold text-slate-800">{value.toFixed(1)}</span>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  // Atualiza card ativo com base no scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let rAF = 0;

    const update = () => {
      const { scrollLeft, clientWidth } = el;
      const idx = Math.round(scrollLeft / (clientWidth * 0.84)); // 84% = largura do card + gap
      setActive(idx);
    };

    const onScroll = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rAF);
    };
  }, []);

  // teclas ← →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLDivElement>('[data-card="t"]');
    const next = Math.max(0, Math.min(cards.length - 1, active + dir));
    const target = cards[next];
    target?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section id="testimonials" className="relative py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Testimonials That
          </h2>
          <h3 className="mt-1 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Speak to <span className="text-[var(--brand,#8bd5e3)]">My Results</span>
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum
            ligula a dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed lobortis orci elementum egestas lobortis.
          </p>
        </div>

        {/* deco doodles (opcional) */}
        <div className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 hidden sm:block">
          <div className="h-6 w-6 -rotate-12 rounded-full border-2 border-black border-t-transparent" />
        </div>

        {/* Track */}
        <div className="relative mt-10">
          {/* controls */}
          <div className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 md:block">
            <button
              aria-label="Previous"
              onClick={() => go(-1)}
              className="rounded-full bg-white/90 p-2 shadow ring-1 ring-slate-200 hover:bg-white transition"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:block">
            <button
              aria-label="Next"
              onClick={() => go(1)}
              className="rounded-full bg-white/90 p-2 shadow ring-1 ring-slate-200 hover:bg-white transition"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
            </button>
          </div>

          {/* scroller */}
          <div
            ref={trackRef}
            className="no-scrollbar relative -mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-6 overflow-x-auto px-4 py-2"
          >
            {DATA.map((t, i) => (
              <div
                key={t.id}
                data-card="t"
                className={`group relative w-[84%] min-w-[84%] max-w-[84%] snap-center rounded-2xl bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_20px_40px_-20px_rgba(2,6,23,0.2)] ring-1 ring-slate-200 transition-transform md:w-[560px] md:min-w-[560px] md:max-w-[560px] ${i === active ? "translate-y-0" : "translate-y-1"}`}
              >
                {/* quote mark */}
                <div className="pointer-events-none absolute right-6 top-6 opacity-30">
                  <svg viewBox="0 0 60 60" className="h-12 w-12">
                    <path
                      d="M18 12h10v12H18v12h10v12H6V36c0-6 2-12 6-18 4-6 10-6 12-6zm26 0h10v12H44v12h10v12H32V36c0-6 2-12 6-18 4-6 10-6 12-6z"
                      fill="#cbd5e1"
                    />
                  </svg>
                </div>

                <div className="p-5 sm:p-6">
                  {/* header */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-slate-200">
                      <Image src={t.avatar} alt={t.name} width={40} height={40} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.role}</div>
                    </div>
                  </div>

                  {/* rating */}
                  <div className="mt-3">
                    <Stars value={t.rating} />
                  </div>

                  {/* text */}
                  <p className="mt-3 leading-relaxed text-slate-700">
                    {t.text}
                  </p>
                </div>

                {/* subtle hover glow */}
                <div className="pointer-events-none absolute inset-x-6 bottom-0 h-24 translate-y-8 rounded-[28px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(139,213,227,0.35),rgba(139,213,227,0)_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>

          {/* dots */}
          <div className="mt-6 flex justify-center gap-2">
            {DATA.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir para depoimento ${i + 1}`}
                onClick={() => {
                  const el = trackRef.current?.querySelectorAll<HTMLDivElement>('[data-card="t"]')[i];
                  el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                }}
                className={`h-2.5 w-2.5 rounded-full transition ${i === active ? "bg-slate-900" : "bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* gradient de fundo suave como no mock */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(139,213,227,0.35),rgba(139,213,227,0)_60%)]" />

      <style jsx global>{`
        .no-scrollbar { scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
