"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
    name: "Bianca Rodrigues",
    role: "Desenvolvedora de Software, The Walt Disney Company",
    avatar: "/avatars/bianca.jpeg",
    rating: 5,
    text:
      "Trabalhar com a Nina na área de engenharia da Disney tem sido uma experiência gratificante. Supervisionando alguns projetos dela, posso afirmar com confiança que ela é uma aprendiz excepcional. Ela se destaca por sua capacidade de aprender rapidamente, seu empenho nos estudos e sua criatividade notável. Além disso, ela é extremamente organizada e colabora de maneira exemplar com a equipe, contribuindo significativamente para o sucesso dos projetos. Sua qualidade técnica é complementada por seu bom humor contagiante, que torna o ambiente de trabalho mais agradável e produtivo.",
  },
  {
    id: "t2",
    name: "Abolfazl Shirkavand",
    role: "Head of Digital Innovation, Snoonu",
    avatar: "/avatars/Abosh.jpeg",
    rating: 5,
    text:
      "I managed Nina at the very start of her career. Although she was young and without much experience, she showed great potential and a naturally bright, curious mind. She was disciplined, organized, and eager to learn; always listening carefully and applying feedback well. \nNina also had a strong creative sense, with good taste in design, ideation, and UI/UX. While she was still developing her professional skills, her attitude, openness, and creativity made her stand out. I believe she has the foundation to grow into an excellent professional in her field.",
  },
  {
    id: "t3",
    name: "Carol Ghorayeb",
    role: "Central Planning & Readiness Senior Manager, Supreme Committee",
    avatar: "/avatars/Carol.jpeg",
    rating: 5,
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
    <section id="testimonials" className="relative py-28 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            Testimonials That
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight"
          >
            Speak to{" "}
            <span style={{ color: "var(--brand)" }}>My Results</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-slate-600"
          >
            A small sample of recent collaborations—performance, accessibility, and maintainable code front and center.
          </motion.p>
        </div>

        {/* Track */}
        <div className="relative mt-10">
          {/* scroller */}
          <div
            ref={trackRef}
            className="overflow-hidden no-scrollbar relative -mx-58 flex snap-x snap-mandatory scroll-pl-4 gap-6 overflow-x-auto px-4 py-2"
          >
            {DATA.map((t, i) => (
              <motion.div
                key={t.id}
                data-card="t"
                initial={{ opacity: 0, y: 24, rotateX: -6, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                whileHover={{ y: -2, rotateX: 0.5, rotateY: -0.5, scale: 1.01 }}
                className={`overflow-hidden t-card group relative w-[84%] min-w-[84%] max-w-[84%] snap-center rounded-2xl bg-white ring-1 ring-slate-200 transition-transform md:w-[560px] md:min-w-[560px] md:max-w-[560px] ${i === active ? "translate-y-0" : "translate-y-1"}`}
              >
                {/* quote mark */}
                <div className="pointer-events-none absolute right-6 top-6 opacity-30">
                  <svg viewBox="0 0 60 60" className="h-12 w-12 animate-quote">
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

                {/* subtle hover glow (pseudo-element via CSS) */}
              </motion.div>
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

        /* sweep highlight no título */
        .sweep {
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,0.0) 30%,
            currentColor 50%,
            rgba(255,255,255,0.0) 70%,
            transparent 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: sweep 2200ms cubic-bezier(0.22,1,0.36,1) 400ms both;
        }
        @keyframes sweep {
          0%   { background-position: 200% 0; }
          100% { background-position: 0% 0; }
        }

        /* flutuação sutil do quote */
        .animate-quote {
          animation: floatY 4s ease-in-out infinite;
        }
        @keyframes floatY {
          0%   { transform: translateY(0) rotate(0deg); }
          50%  { transform: translateY(-4px) rotate(-1deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }

        /* glow ao redor do card (sem mudar layout) */
        .t-card {
          position: relative;
          isolation: isolate;
        }
        .t-card::after {
          content: "";
          position: absolute;
          inset: -1px;
          z-index: -1;
          border-radius: 1rem;
          background: radial-gradient(60% 60% at 50% 0%,
            rgba(139,213,227,0.30),
            rgba(139,213,227,0.0) 60%);
          opacity: 0;
          transition: opacity 300ms ease;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
