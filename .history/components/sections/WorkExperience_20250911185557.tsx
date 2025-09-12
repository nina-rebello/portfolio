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

const thresholds = Array.from({ length: 21 }, (_, i) => i / 20); // 0, 0.05, ..., 1

const ease = (t: number) => {
  // easeOutCubic para resposta mais orgânica
  const x = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - x, 3);
};

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [lineOn, setLineOn] = useState(false);

  const rowsRef = useRef<Array<HTMLDivElement | null>>([]);
  const dotsRef = useRef<Array<HTMLSpanElement | null>>([]);

  const [seen, setSeen] = useState<boolean[]>(Array(ITEMS.length).fill(false));
  const [progress, setProgress] = useState<number[]>(Array(ITEMS.length).fill(0));

  useEffect(() => {
    // anima a LINHA única ao entrar
    const ioLine = new IntersectionObserver(([entry]) => {
      setLineOn(entry.isIntersecting);
    }, { threshold: 0.3 });
    if (sectionRef.current) ioLine.observe(sectionRef.current);
    return () => ioLine.disconnect();
  }, []);

  useEffect(() => {
    // marca "seen" para animar entrada lateral
    const ioSeen = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number((entry.target as HTMLElement).dataset.index);
        if (entry.isIntersecting) {
          setSeen((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }
      });
    }, { threshold: 0.45 });

    rowsRef.current.forEach((el) => el && ioSeen.observe(el));
    return () => ioSeen.disconnect();
  }, []);

  useEffect(() => {
    // progresso scroll-linked da BOLINHA central (0→1)
    const ioProg = new IntersectionObserver((entries) => {
      setProgress((prev) => {
        const next = [...prev];
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          // intersectionRatio já vem normalizado 0..1
          next[idx] = entry.intersectionRatio;
        });
        return next;
      });
    }, { threshold: thresholds });

    dotsRef.current.forEach((el) => el && ioProg.observe(el));
    return () => ioProg.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden py-20">
      <div className="container-hero">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold">
          My <span className="text-[var(--brand)]">Work Experience</span>
        </h2>

        <div className="relative mt-12">
          {/* Linha vertical única (tracejada) — visível ≥ sm */}
          <div
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden sm:block w-0.5 border-l-2 border-dashed border-slate-300 origin-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${lineOn ? "scale-y-100" : "scale-y-0"}`}
            aria-hidden
          />

          <div className="space-y-12">
            {ITEMS.map((it, idx) => {
              const active = seen[idx];
              const p = ease(progress[idx] || 0);
              const dotScale = 0.75 + p * 0.35; // 0.75 → 1.10
              const glow = Math.round(12 + p * 24); // 12px → 36px
              const spinSpeed = 1200 - p * 900; // 1200ms → 300ms

              return (
                <div
                  key={it.company + idx}
                  ref={(el) => { rowsRef.current[idx] = el; }}
                  data-index={idx}
                  className={`grid gap-6 items-start grid-cols-1 sm:[grid-template-columns:1fr_64px_1fr]`}
                >
                  {/* ESQUERDA: company + period */}
                  <div
                    className={`transition-all duration-700 ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
                    style={{ transitionDelay: `${idx * 120}ms` }}
                  >
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">{it.company}</h3>
                    <p className="mt-1 text-slate-500">{it.period}</p>
                  </div>

                  {/* PONTO CENTRAL (bolinha) */}
                  <div className="relative flex items-center justify-center h-12 sm:h-12">
                    <span
                      ref={(el) => { dotsRef.current[idx] = el; }}
                      data-index={idx}
                      className="relative inline-flex h-10 w-10 items-center justify-center mx-auto will-change-transform"
                      style={{
                        transform: `scale(${dotScale.toFixed(3)})`,
                        transition: "transform 120ms linear",
                      }}
                    >
                      {/* aro tracejado externo (gira conforme scroll) */}
                      <span
                        className="absolute inset-0 rounded-full border-2 border-dashed border-slate-400"
                        style={{
                          animation: `spin linear infinite`,
                          animationDuration: `${Math.max(180, spinSpeed)}ms`,
                        }}
                      />
                      {/* glow dinâmico */}
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          boxShadow: `0 0 0 ${Math.round(glow / 3)}px rgba(154,209,227,0) , 0 0 ${glow}px rgba(154,209,227,${0.25 + p * 0.35})`,
                          transition: "box-shadow 120ms linear",
                        }}
                      />
                      {/* círculo preenchido */}
                      <span
                        className={`inline-block h-6 w-6 rounded-full shadow ${idx === 1 ? "bg-slate-900" : "bg-[var(--brand)]"}`}
                        style={{
                          boxShadow: `0 0 ${6 + p * 10}px rgba(0,0,0,0.25)`,
                          transition: "box-shadow 120ms linear",
                        }}
                      />
                    </span>
                  </div>

                  {/* DIREITA: role + description */}
                  <div
                    className={`transition-all duration-700 sm:text-right ${active ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
                    style={{ transitionDelay: `${180 + idx * 120}ms` }}
                  >
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">{it.role}</h3>
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

      {/* keyframes locais */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
