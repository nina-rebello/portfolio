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
  const rowsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [seen, setSeen] = useState<boolean[]>(Array(ITEMS.length).fill(false));

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
      { threshold: 0.4 }
    );

    rowsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="experience" className="relative overflow-hidden py-20">
      <div className="container-hero">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold">
          My{" "}
          <span style={{ color: "var(--brand)" }} className="font-extrabold">
            Work Experince
          </span>
        </h2>

        <div className="mt-12 space-y-12">
          {ITEMS.map((it, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === ITEMS.length - 1;
            const active = seen[idx];

            return (
              <div
                key={it.company + idx}
                ref={(el) => (rowsRef.current[idx] = el)}
                data-index={idx}
                className="grid grid-cols-[1fr,64px,1fr] items-start gap-6"
              >
                {/* esquerda */}
                <div
                  className={`transition-all duration-700 ${
                    active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                  }`}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                >
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">
                    {it.company}
                  </h3>
                  <p className="mt-1 text-slate-500">{it.period}</p>
                </div>

                {/* centro: linha + ponto */}
                <div className="relative h-full flex items-stretch justify-center">
                  {/* linha tracejada com animação de “desenho” */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-slate-300 origin-top
                    timeline-line ${active ? "timeline-line--on" : ""}`}
                    style={{
                      top: isFirst ? "1.5rem" : "0",
                      bottom: isLast ? "1.5rem" : "0",
                      transitionDelay: `${idx * 90}ms`,
                    }}
                    aria-hidden
                  />
                  {/* node */}
                  <div className="relative z-10 mt-0.5 h-12 flex items-center justify-center">
                    <span
                      className={`relative inline-flex h-10 w-10 items-center justify-center
                        transition-transform duration-500 ${
                          active ? "scale-100" : "scale-75"
                        }`}
                      style={{ transitionDelay: `${200 + idx * 120}ms` }}
                    >
                      {/* aro tracejado externo */}
                      <span className="absolute inset-0 rounded-full border-2 border-dashed border-slate-400" />
                      {/* pulso */}
                      <span
                        className={`absolute inset-0 rounded-full ring-0 ${
                          active ? "node-pulse" : ""
                        }`}
                        style={{ animationDelay: `${250 + idx * 120}ms` }}
                      />
                      {/* círculo preenchido */}
                      <span
                        className={`inline-block h-6 w-6 rounded-full shadow ${
                          idx === 1 ? "bg-slate-900" : "bg-[var(--brand)]"
                        }`}
                      />
                    </span>
                  </div>
                </div>

                {/* direita */}
                <div
                  className={`transition-all duration-700 ${
                    active ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
                  }`}
                  style={{ transitionDelay: `${180 + idx * 120}ms` }}
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

      {/* estilos das animações */}
      <style jsx>{`
        /* linha desenhando */
        .timeline-line {
          transform: scaleY(0);
          transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .timeline-line--on {
          transform: scaleY(1);
        }

        /* pulso do ponto */
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
        .node-pulse {
          animation: pulseRing 1.6s ease-out 1;
          border-radius: 9999px;
        }

        /* responsivo: empilha em telas pequenas */
        @media (max-width: 640px) {
          :global(#experience .grid) {
            grid-template-columns: 1fr;
          }
          :global(#experience .grid > div:nth-child(2)) {
            order: 3;
            height: 48px;
          }
        }
      `}</style>
    </section>
  );
}
