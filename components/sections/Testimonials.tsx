"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
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
      "I managed Nina at the very start of her career. Although she was young and without much experience, she showed great potential and a naturally bright, curious mind. She was disciplined, organized, and eager to learn; always listening carefully and applying feedback well.\nNina also had a strong creative sense, with good taste in design, ideation, and UI/UX. While she was still developing her professional skills, her attitude, openness, and creativity made her stand out. I believe she has the foundation to grow into an excellent professional in her field.",
  },
  {
    id: "t3",
    name: "Carol Ghorayeb",
    role: "Central Planning & Readiness Senior Manager, Supreme Committee",
    avatar: "/avatars/Carol.jpeg",
    rating: 5,
    text:
      "A Nina desenvolveu o website da minha empresa e entregou um trabalho perfeito. Desde a primeira reunião para entender o escopo, passando por desenvolvimento, testes e ajustes até a entrega final, ela foi sempre muito atenciosa e acertiva, além de paciente com as mudanças de última hora. O trabalho ficou lindo, e entregue no prazo e no budget. Obrigada Nina!",
  },
];

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-1" aria-label={`${value.toFixed(1)} de 5 estrelas`}>
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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLDivElement>('[data-card="t"]'));
    if (!cards.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) {
          const idx = cards.findIndex((c) => c === best.target);
          if (idx !== -1) setActive(idx);
        }
      },
      { root: track, threshold: [0.5, 0.75, 0.9] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const go = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLDivElement>('[data-card="t"]');
    const next = Math.max(0, Math.min(cards.length - 1, active + dir));
    cards[next]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const heading = useMemo(
    () => ({
      h2: { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } },
      h3: { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } },
      p: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } },
    }),
    []
  );

  return (
    <section id="testimonials" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <motion.h2
            initial={heading.h2.initial}
            whileInView={heading.h2.animate}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight"
          >
            Testimonials That
          </motion.h2>
          <motion.h3
            initial={heading.h3.initial}
            whileInView={heading.h3.animate}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 text-2xl sm:text-4xl font-bold tracking-tight"
          >
            Speak to <span style={{ color: "var(--brand)" }}>My Results</span>
          </motion.h3>
          <motion.p
            initial={heading.p.initial}
            whileInView={heading.p.animate}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-4 max-w-2xl text-slate-600 text-sm sm:text-base"
          >
            A small sample of recent collaborations—performance, accessibility, and maintainable code front and center.
          </motion.p>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <div
            ref={trackRef}
            className="no-scrollbar relative flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory px-2 -mx-2 sm:px-4 sm:-mx-4 py-1 scroll-smooth [scrollbar-width:none] [overscroll-behavior-x:contain]"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollPaddingLeft: "1rem",
              scrollPaddingRight: "1rem",
            }}
            aria-label="Depoimentos"
          >
            {DATA.map((t, i) => (
              <motion.div
                key={t.id}
                data-card="t"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                className="t-card group relative shrink-0 snap-center w-[88vw] max-w-[88vw] sm:w-[520px] sm:max-w-[520px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden"
              >
                <div className="pointer-events-none absolute right-5 top-5 opacity-30">
                  <svg viewBox="0 0 60 60" className="h-10 w-10 animate-quote">
                    <path
                      d="M18 12h10v12H18v12h10v12H6V36c0-6 2-12 6-18 4-6 10-6 12-6zm26 0h10v12H44v12h10v12H32V36c0-6 2-12 6-18 4-6 10-6 12-6z"
                      fill="#cbd5e1"
                    />
                  </svg>
                </div>
                <div className="p-5 sm:p-6">
                {/* header */}
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-slate-200 shrink-0">
                    {/* usa fill + object-cover para nunca achatar */}
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>

                  {/* permite que o texto quebre sem empurrar o avatar */}
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 text-sm sm:text-base">
                      {t.name}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500">
                      {t.role}
                    </div>
                  </div>
                </div>
                  <div className="mt-3">
                    <Stars value={t.rating} />
                  </div>
                  <p className="mt-3 text-[13px] sm:text-sm leading-relaxed text-slate-700 whitespace-pre-line">{t.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {DATA.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir para depoimento ${i + 1}`}
                onClick={() => {
                  const el = trackRef.current?.querySelectorAll<HTMLDivElement>('[data-card="t"]')[i];
                  el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                }}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === active ? "bg-slate-900" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(139,213,227,0.35),rgba(139,213,227,0)_60%)]" />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .animate-quote { animation: floatY 4s ease-in-out infinite; }
        @keyframes floatY {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-1deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .t-card { position: relative; isolation: isolate; }
        .t-card::after {
          content: "";
          position: absolute; inset: -1px; z-index: -1; border-radius: 1rem;
          background: radial-gradient(60% 60% at 50% 0%, rgba(139,213,227,0.30), rgba(139,213,227,0.0) 60%);
          opacity: 0; transition: opacity 300ms ease; pointer-events: none;
        }
      `}</style>
    </section>
  );
}
