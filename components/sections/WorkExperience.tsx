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
    company: "The Walt Disney & ESPN, Brazil",
    period: "April 2023– July 2024",
    role: "Engineering and Technical Support",
    description:
      "Engineered Python automation and monitoring tooling that accelerated delivery and elevated live-broadcast performance.",
  },
  {
    company: "Snoonu, Qatar",
    period: "Jan 2025– July 2025",
    role: "Full Stack Developer",
    description:
      "Project planning and execution with a strong focus on automation, integrations, and DevOps, ensuring availability, performance, and security of critical systems. \nCloud infrastructure management, continuous improvement initiatives, and strategic documentation for high-efficiency IT operations.",
  },
  {
    company: "Freelancer",
    period: "July 2025 – Present",
    role: "Full Stack Developer",
    description:
      "Creating responsive and user-friendly websites using modern web technologies. Collaborating with clients to understand their requirements and deliver tailored solutions that meet their business goals.",
  },
];

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [lineOn, setLineOn] = useState(false);
  const [seen, setSeen] = useState<boolean[]>(Array(ITEMS.length).fill(false));
  const rowsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ioLine = new IntersectionObserver(
      ([entry]) => setLineOn(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) ioLine.observe(sectionRef.current);
    return () => ioLine.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
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
      },
      { threshold: 0.45 }
    );
    rowsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden py-20 scroll-mt-28">
      <div className="container-hero">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold">
          My <span className="text-[var(--brand)]">Work Experience</span>
        </h2>

        {/* wrapper com LINHA ÚNICA ao centro */}
        <div className="relative mt-12">
          {/* linha vertical única (tracejada) que atravessa tudo — visível a partir de sm */}
          <div
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0
                        hidden sm:block w-0.5 border-l-2 border-dashed border-slate-300 origin-top
                        transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${lineOn ? "scale-y-100" : "scale-y-0"}`}
            aria-hidden
          />

          {/* linhas/itens */}
<div className="space-y-12">
  {ITEMS.map((it, idx) => {
    const active = seen[idx];
    return (
      <div
        key={it.company + idx}
        ref={(el) => { rowsRef.current[idx] = el; }}
        data-index={idx}
        className="grid gap-6 items-start grid-cols-1 sm:[grid-template-columns:1fr_64px_1fr]"
      >
        {/* ===== MOBILE: card compacto (empresa + role + período juntos) ===== */}
        <div
          className={`sm:hidden rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-4
                      transition-all duration-700
                      ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          style={{ transitionDelay: `${idx * 120}ms` }}
        >
          <h3 className="text-lg font-bold text-slate-900">
            <span>{it.company}</span>
            <span className="mx-2 text-slate-400">•</span>
            <span className="font-semibold text-slate-800">{it.role}</span>
          </h3>
          <p className="mt-1 text-sm text-slate-500">{it.period}</p>

          {it.description && (
            <p className="mt-2 text-slate-600 leading-relaxed">{it.description}</p>
          )}
        </div>

        {/* ===== DESKTOP (sm+): layout original com linha central ===== */}
        {/* ESQUERDA: company + period */}
        <div
          className={`hidden sm:block transition-all duration-700
                      ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
          style={{ transitionDelay: `${idx * 120}ms` }}
        >
          <h3 className="text-2xl font-extrabold text-slate-800">{it.company}</h3>
          <p className="mt-1 text-slate-500">{it.period}</p>
        </div>

        {/* PONTO CENTRAL */}
        <div className="hidden sm:flex items-center justify-center h-12">
          <span
            className={`relative inline-flex h-10 w-10 items-center justify-center
                        transition-transform duration-500
                        ${active ? "scale-100" : "scale-75"}`}
            style={{ transitionDelay: `${220 + idx * 120}ms` }}
          >
            <span className="absolute inset-0 rounded-full border-2 border-dashed border-slate-400" />
            <span
              className={`absolute inset-0 rounded-full ${active ? "animate-[pulseRing_1.6s_ease-out_1]" : ""}`}
              style={{ animationDelay: `${260 + idx * 120}ms` }}
            />
            <span className={`inline-block h-6 w-6 rounded-full shadow ${idx === 1 ? "bg-slate-900" : "bg-[var(--brand)]"}`} />
          </span>
        </div>

        {/* DIREITA: role + description */}
        <div
          className={`hidden sm:block transition-all duration-700 sm:text-right
                      ${active ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
          style={{ transitionDelay: `${180 + idx * 120}ms` }}
        >
          <h3 className="text-2xl font-extrabold text-slate-800">{it.role}</h3>
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

      {/* estilos das animações */}
      <style jsx>{`
        @keyframes pulseRing {
          0% {
            box-shadow: 0 0 0 0 rgba(154, 209, 227, 0.55);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(154, 209, 227, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(154, 209, 227, 0);
          }
        }
      `}</style>
    </section>
  );
}
