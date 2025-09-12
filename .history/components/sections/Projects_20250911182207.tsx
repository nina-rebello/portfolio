"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Project = {
  id: string;
  title: string;
  tag: string;
  cover: string;
  images: string[];
  description: string;
  tech?: string[];
  link?: string;
};

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "SaaS Dashboard",
    tag: "Web Dev",
    cover: "/projects/p1.jpg",
    images: ["/projects/p1.jpg", "/projects/p1b.jpg", "/projects/p1c.jpg"],
    description:
      "Dashboard para produto SaaS com charts, dark mode e layout responsivo.",
    tech: ["Next.js", "Recharts", "Tailwind"],
    link: "#",
  },
  {
    id: "2",
    title: "Portfolio Clean",
    tag: "UI/UX",
    cover: "/projects/p2.jpg",
    images: ["/projects/p2.jpg", "/projects/p2b.jpg"],
    description:
      "Portfolio minimal com foco no conteúdo e micro-interações acessíveis.",
    tech: ["Next.js", "Tailwind"],
    link: "#",
  },
  {
    id: "3",
    title: "E-commerce UI",
    tag: "Web Design",
    cover: "/projects/p3.jpg",
    images: ["/projects/p3.jpg", "/projects/p3b.jpg"],
    description:
      "Landing de e-commerce com foco em conversão, tipografia limpa e componentes reusáveis.",
    tech: ["Next.js", "Framer Motion"],
    link: "#",
  },
  // adicione mais projetos...
];

export default function Projects() {
  // modal
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Project | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  // carrossel
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollByCards = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : 340; // largura + gap
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // teclado no modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (!active) return;
      if (e.key === "ArrowRight") setImgIdx((i) => (i + 1) % active.images.length);
      if (e.key === "ArrowLeft") setImgIdx((i) => (i - 1 + active.images.length) % active.images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const openProject = (p: Project) => {
    setActive(p);
    setImgIdx(0);
    setOpen(true);
  };

  return (
    <section id="projects" className="relative overflow-hidden pt-14 pb-14">
      {/* fundo com gradientes (atrás) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/gradients/blur-gradient.png"
          alt=""
          width={860}
          height={860}
          className="absolute -top-[117px] right-[-230px] w-[860px] opacity-70"
          priority
        />
        <Image
          src="/gradients/blur-gradient-purple.png"
          alt=""
          width={700}
          height={700}
          className="absolute -top-10 -right-[70px] w-[700px] opacity-70"
        />
      </div>

      {/* conteúdo (na frente) */}
      <div className="relative z-10 container-hero">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold">My Projects</h2>
        <p className="max-w-3xl mx-auto mt-4 text-center text-gray-700">
          Alguns trabalhos recentes. Arraste para o lado ou use as setas.
        </p>

        {/* carrossel */}
        <div className="relative mt-10">
          {/* trilho */}
          <div
            ref={trackRef}
            className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6"
          >
            {PROJECTS.map((p) => (
              <article
                key={p.id}
                data-card
                className="snap-start shrink-0 w-[320px] sm:w-[360px] rounded-[16px] overflow-hidden
                           backdrop-blur-md border border-black/10
                           shadow-[0_10px_30px_rgba(0,0,0,0.10)] hover:shadow-[0_18px_48px_rgba(0,0,0,0.16)]
                           transition cursor-pointer"
                onClick={() => openProject(p)}
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

          {/* setas laterais centralizadas no carrossel */}
          <button
            onClick={() => scrollByCards(-1)}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
                       rounded-full p-2 bg-white/85 backdrop-blur border border-black/10 hover:bg-white shadow"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scrollByCards(1)}
            aria-label="Próximo"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
                       rounded-full p-2 bg-white/85 backdrop-blur border border-black/10 hover:bg-white shadow"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* overlay / modal do projeto */}
      {open && active && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="container-hero h-full flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full rounded-2xl bg-white/95 backdrop-blur p-4 sm:p-6 lg:p-8 border border-black/10 shadow-2xl">
              {/* fechar */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-3 right-3 rounded-full p-2 bg-black/80 text-white hover:bg-black"
              >
                <X size={18} />
              </button>

              <div className="grid gap-6 md:grid-cols-2">
                {/* galeria esquerda */}
                <div className="space-y-3">
                  <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      key={active.images[imgIdx]}
                      src={active.images[imgIdx]}
                      alt={`${active.title} image ${imgIdx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar">
                    {active.images.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setImgIdx(i)}
                        className={`relative h-16 w-24 rounded-lg overflow-hidden border
                          ${i === imgIdx ? "border-black/60" : "border-black/10"}`}
                        aria-label={`Imagem ${i + 1}`}
                      >
                        <Image src={src} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* texto direita */}
                <div className="flex flex-col">
                  <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">
                    {active.tag}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold">{active.title}</h3>
                  <p className="mt-3 text-gray-700 leading-relaxed">{active.description}</p>
                  {active.tech && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {active.tech.map((t) => (
                        <li key={t} className="text-xs rounded-full border border-black/10 px-3 py-1 bg-white/80">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                  {active.link && (
                    <div className="mt-6">
                      <a
                        href={active.link}
                        target="_blank"
                        className="inline-flex items-center rounded-full px-4 py-2 bg-black text-white hover:bg-black/90"
                      >
                        Visit project
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* navegação de imagens */}
              {active.images.length > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() =>
                      setImgIdx((i) => (i - 1 + active.images.length) % active.images.length)
                    }
                    className="rounded-full p-2 border border-black/10 bg-white hover:bg-white/90"
                  >
                    <ChevronLeft />
                  </button>
                  <div className="text-xs text-gray-500">
                    {imgIdx + 1} / {active.images.length}
                  </div>
                  <button
                    onClick={() => setImgIdx((i) => (i + 1) % active.images.length)}
                    className="rounded-full p-2 border border-black/10 bg-white hover:bg-white/90"
                  >
                    <ChevronRight />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
