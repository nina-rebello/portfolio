"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Project = {
  id: string;
  title: string;
  tag: string;
  cover: string; // coloque suas imagens em /public/projects/...
};

const PROJECTS: Project[] = [
  { id: "1", title: "E-commerce UI", tag: "Web Design", cover: "/projects/p1.jpg" },
  { id: "2", title: "Portfolio Clean", tag: "Web Dev", cover: "/projects/p2.jpg" },
  { id: "3", title: "SaaS Dashboard", tag: "UI/UX", cover: "/projects/p3.jpg" },
  { id: "4", title: "Landing Minimal", tag: "Web Dev", cover: "/projects/p4.jpg" },
  { id: "5", title: "Restaurant Site", tag: "Web Design", cover: "/projects/p5.jpg" },
  { id: "6", title: "Fitness App", tag: "Web Dev", cover: "/projects/p6.jpg" },
];

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : 320; // largura aproximada + gap
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative overflow-hidden">
      {/* gradientes de fundo nas bordas */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none">
        <Image
          src="/gradients/light-leak-blur-transparent-free-png.png"
          alt=""
          width={1200}
          height={900}
          className="absolute -top-24 -left-40 w-[720px] opacity-70"
          priority
        />
        <Image
          src="/gradients/blur-gradient.png"
          alt=""
          width={900}
          height={900}
          className="absolute -top-10 -right-52 w-[620px] opacity-75"
        />
      </div>

      {/* topo branco com título/descrição */}
      <div className="bg-white pt-16 pb-10 text-center relative z-10">
        <div className="container-hero">
          <h2 className="text-3xl sm:text-4xl font-extrabold">My Projects</h2>
          <p className="max-w-3xl mx-auto mt-4 text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Mollis erat duis aliquam mauris est risus lectus.
            Phasellus consequat urna tellus
          </p>
        </div>
        {/* fade branco para a faixa de cards */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* carrossel */}
      <div className="relative z-10 container-hero pb-16">
        {/* setas */}
        <div className="flex justify-end gap-3 mb-3">
          <button
            onClick={() => scrollByCards(-1)}
            aria-label="Previous projects"
            className="rounded-full p-2 bg-white/80 backdrop-blur border border-black/10 hover:bg-white"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scrollByCards(1)}
            aria-label="Next projects"
            className="rounded-full p-2 bg-white/80 backdrop-blur border border-black/10 hover:bg-white"
          >
            <ChevronRight />
          </button>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar relative flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-4"
        >
          {/* máscara nas bordas para sumir o corte do gradiente */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent z-10" />

          {PROJECTS.map((p) => (
            <article
              key={p.id}
              data-card
              className="snap-start shrink-0 w-[320px] sm:w-[360px] rounded-[18px] overflow-hidden
                         bg-white/60 backdrop-blur-md border border-black/10
                         shadow-[0_12px_36px_rgba(0,0,0,0.12)] hover:shadow-[0_18px_48px_rgba(0,0,0,0.16)]
                         transition"
            >
              <div className="relative aspect-[16/12] bg-gray-100">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 320px, 360px"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <span className="text-xs uppercase tracking-wide text-gray-500">{p.tag}</span>
                <h3 className="text-lg font-semibold mt-1">{p.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}



//  {/* === background gradients === */}
//       <div className="absolute inset-0 z-0 pointer-events-none select-none">
        
//         <Image
//           src="/gradients/blur-gradient.png"
//           alt=""
//           width={600}
//           height={600}
//           className="absolute top-4 right-250 w-[760px] opacity-70"
//         />
//       </div>