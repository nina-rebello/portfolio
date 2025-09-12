"use client";

import React, { useEffect, useRef, useState } from "react";

type Item = {
  company: string;
  period: string;
  role: string;
  description?: string;
};

const ITEMS: Item[] = [
  {
    company: "The Walt Disney & ESPN, Brasil",
    period: "Sep 2016– July 2020",
    role: "Técnica de Engenharia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacus nunc, posuere in justo vulputate, bibendum sodales.",
  },
  {
    company: "Snoonu, Qatar",
    period: "Sep 2020– July 2023",
    role: "Full Stack Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacus nunc, posuere in justo vulputate, bibendum sodales.",
  },
  {
    company: "Freelancer",
    period: "Sep 2023",
    role: "Full Stack Developer",
  },
];

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [lineOn, setLineOn] = useState(false);
  const [seen, setSeen] = useState<boolean[]>(Array(ITEMS.length).fill(false));
  const rowsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ioLine = new IntersectionObserver(([entry]) => setLineOn(entry.isIntersecting), {
      threshold: 0.3,
    });
    if (sectionRef.current) ioLine.observe(sectionRef.current);
    return () => ioLine.disconnect();
  }, []);

  useEffect(() => {
    // ativa cada linha uma única vez quando cruza ~45% da viewport
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting) {
            setSeen((prev) => {
              if (prev[index]) return prev; // já animou uma vez
              const next = [...prev];
              next[index] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.45 }
    );
    rowsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden py-20">
      <div className="container-hero">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold">
          My <span className="text-[var(--brand)]">Work Experience</span>
        </h2>

        <div className="relative mt-12">
          {/* linha vertical única (tracejada) — visível >= sm */}
          <div
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden sm:block w-0.5 border-l-2 border-dashed border-slate-300 origin-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${lineOn ? "scale-y-100" : "scale-y-0"}`}
            aria-hidden
          />

          <div className="space-y-12">
            {ITEMS.map((it, idx) => {
              const active = seen[idx];
              const delay = idx * 120; // leve stagger
              return (
                <div
                  key={it.company + idx}
                  ref={(el) => {
                    rowsRef.current[idx] = el;
                  }}
                  data-index={idx}
                  className={`grid gap-6 items-start grid-cols-1 sm:[grid-template-columns:1fr_64px_1fr]`}
                >
                  {/* ESQUERDA: company + period */}
                  <div
                    className={`transition-all duration-700 ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
                    style={{ transitionDelay: `${delay}ms` }}
                  >
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">
                      {it.company}
                    </h3>
                    <p className="mt-1 text-slate-500">{it.period}</p>
                  </div>

                  {/* PONTO CENTRAL com pulse de acordo com o scroll (1x) */}
                  <div className="relative flex items-center justify-center h-12 sm:h-12">
                    <span
                      className={`relative inline-flex h-10 w-10 items-center justify-center transition-transform duration-500 mx-auto ${active ? "scale-100" : "scale-75"}`}
                      style={{ transitionDelay: `${220 + delay}ms` }}
                    >
                      {/* aro tracejado externo (ring que expande 1x quando ativo) */}
                      <span
                        className={`absolute inset-0 rounded-full border-2 border-dashed border-slate-400 ${active ? "animate-pulseRing" : ""}`}
                        style={{ animationDelay: `${260 + delay}ms` }}
                      />
                      {/* bolinha preenchida com “bop” 1x ao ativar */}
                      <span
                        className={`inline-block h-6 w-6 rounded-full shadow ${idx === 1 ? "bg-slate-900" : "bg-[var(--brand)]"} ${active ? "animate-dotBop" : ""}`}
                        style={{ animationDelay: `${280 + delay}ms` }}
                      />
                    </span>
                  </div>

                  {/* DIREITA: role + description */}
                  <div
                    className={`transition-all duration-700 sm:text-right ${active ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
                    style={{ transitionDelay: `${180 + delay}ms` }}
                  >
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">
                      {it.role}
                    </h3>
                    {it.description && (
                      <p className="mt-2 text-slate-500 leading-relaxed">{it.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* keyframes e motion-safe */}
      <style jsx>{`
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(154, 209, 227, 0.55); }
          70%  { box-shadow: 0 0 0 14px rgba(154, 209, 227, 0); }
          100% { box-shadow: 0 0 0 0 rgba(154, 209, 227, 0); }
        }
        @keyframes dotBop {
          0%   { transform: translateY(0) scale(1); }
          30%  { transform: translateY(-2px) scale(1.12); }
          60%  { transform: translateY(0) scale(0.98); }
          100% { transform: translateY(0) scale(1); }
        }
        /* classes utilitárias locais para controlar 1x */
        .animate-pulseRing { animation: pulseRing 1.2s ease-out 1 both; }
        .animate-dotBop   { animation: dotBop   420ms cubic-bezier(0.22, 1, 0.36, 1) 1 both; }

        /* respeita usuários com redução de movimento */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulseRing,
          .animate-dotBop {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
