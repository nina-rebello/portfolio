import React from "react";

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
  return (
    <section id="experience" className="relative overflow-hidden py-20">
      <div className="container-hero">
        {/* título */}
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold">
          My{" "}
          <span style={{ color: "var(--brand)" }} className="font-extrabold">
            Work Experince
          </span>
        </h2>

        {/* grid principal */}
        <div className="mt-12 space-y-10">
          {ITEMS.map((it, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === ITEMS.length - 1;
            return (
              <div
                key={it.company + idx}
                className="grid grid-cols-[1fr,64px,1fr] items-start gap-6"
              >
                {/* coluna esquerda: empresa + período */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">
                    {it.company}
                  </h3>
                  <p className="mt-1 text-slate-500">{it.period}</p>
                </div>

                {/* coluna central: linha pontilhada + nodes */}
                <div className="relative h-full flex items-stretch justify-center">
                  {/* linha pontilhada (cobre a célula inteira) */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-slate-300 ${
                      isFirst ? "top-6" : "top-0"
                    } ${isLast ? "bottom-6" : "bottom-0"}`}
                    aria-hidden
                  />
                  {/* node */}
                  <div className="relative z-10 mt-0.5 h-12 flex items-center justify-center">
                    <span className="relative inline-flex h-10 w-10 items-center justify-center">
                      {/* aro tracejado externo (igual ao mock) */}
                      <span className="absolute inset-0 rounded-full border-2 border-dashed border-slate-400" />
                      {/* círculo preenchido (azul alternando com escuro no meio, como no mock) */}
                      <span
                        className={`inline-block h-6 w-6 rounded-full ${
                          idx === 1 ? "bg-slate-900" : "bg-[var(--brand)]"
                        } shadow`}
                      />
                    </span>
                  </div>
                </div>

                {/* coluna direita: cargo + descrição */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">
                    {it.role}
                  </h3>
                  {it.description && (
                    <p className="mt-2 text-slate-500 leading-relaxed">
                      {it.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* responsivo: empilha em telas muito estreitas */}
      <style jsx>{`
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
