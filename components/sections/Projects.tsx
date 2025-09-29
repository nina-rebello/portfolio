"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, GraduationCap, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";  // <- import corrigido

// ⬇️ apenas o tipo muda aqui:
type Contributor = { name: string; url: string };
type Project = {
  id: string;
  title: string;
  tag: string;
  cover: string;
  images: string[];
  desc: { pt: string; en: string };   // <- antes era "description: string"
  tech?: string[];
  link?: string;
  academic?: boolean;
  contributors?: Contributor[];
  repo?: string;
};

// ⬇️ o array agora tem desc.pt e desc.en para cada item
const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Atelier of Experience",
    tag: "Web Development",
    cover: "/projects/p1a.png",
    images: ["/projects/p1a.png", "/projects/p1b.png", "/projects/p1c.png", "/projects/p1d.png", "/projects/p1e.png"],
    desc: {
      pt: "Landing page para empresa do Qatar de consultoria para empresas, com design moderno e responsivo.",
      en: "Landing page for a Qatari business consulting company, featuring a modern, responsive design.",
    },
    tech: ["Next.js", "Typescript", "Tailwind", "Python"],
    link: "https://atelierofexperience.com",
    contributors: [{ name: "Luana Rebello", url: "https://www.linkedin.com/in/luanarebello/" }],
  },
  {
    id: "2",
    title: "IT Asset Management",
    tag: "Software Development",
    cover: "/projects/p2a.jpeg",
    images: ["/projects/p2a.jpeg", "/projects/p2b.jpeg", "/projects/p2c.jpeg"],
    desc: {
      pt: "Automação de inventário de hardware e software para empresa de TI, integrando com APIs e automatizando ações repetitivas.",
      en: "Automation of hardware and software inventory for an IT company, integrating with APIs and streamlining repetitive tasks.",
    },
    tech: ["React.js", "Tailwind", "Python", "Django", "OpenAI API", "Pandadoc API"],
  },
  {
    id: "3",
    title: "vMix Playlist",
    tag: "Software Development",
    cover: "/projects/p3a.jpeg",
    images: ["/projects/p3a.jpeg"],
    desc: {
      pt: "Aplicação desenvolvida para fazer integração com o vMix e criar listas de arquivos dentro do software.",
      en: "Application built to integrate with vMix and create file playlists within the software.",
    },
    tech: ["Python", "QtDesigner"],
    contributors: [{ name: "Bianca Rodrigues", url: "https://www.linkedin.com/in/bia-rodrig/" }],
  },
  {
    id: "4",
    title: "InsightWise",
    tag: "Software Development",
    cover: "/projects/p4a.png",
    images: ["/projects/p4a.png"],
    desc: {
      pt: "Ferramenta de análise de produtividade que monitora o uso de softwares corporativos, gerando insights sobre eficiência e engajamento a partir de interações reais (cliques, rolagens, inatividade).",
      en: "Productivity analytics tool that tracks corporate software usage, generating insights on efficiency and engagement from real interactions (clicks, scrolling, idle time).",
    },
    tech: ["Next.js", "Java", "Python", "Ollama API"],
    academic: true,
    contributors: [
      { name: "Breno Santiago", url: "https://www.linkedin.com/in/breno-santiago-66b164227/" },
      { name: "Felipe Guedes", url: "https://www.linkedin.com/in/felipeguedesgoncalves/" },
      { name: "Luiz Felipe Soares", url: "https://www.linkedin.com/in/luizlucena97/" },
      { name: "Vitória Maria de Camargo", url: "https://www.linkedin.com/in/camargovitoria/" },
    ],
    repo: "https://github.com/nina-rebello/InsightWise?tab=readme-ov-file",
  },
  {
    id: "5",
    title: "Hunzer",
    tag: "Software Development",
    cover: "/projects/p5a.png",
    images: ["/projects/p5a.png", "/projects/p5b.png", "/projects/p5c.png", "/projects/p5d.png"],
    desc: {
      pt: "Plataforma gamificada que engaja pessoas no combate à fome com desafios, educação e registro de ações. Pontos são resgatáveis em eventos e lojas parceiras.",
      en: "Gamified platform that engages people in fighting hunger through challenges, education, and action tracking. Points can be redeemed at partner events and stores.",
    },
    tech: ["Next.js", "Java", "Python"],
    academic: true,
    contributors: [
      { name: "Camila Cunha", url: "https://www.linkedin.com/in/camila-cunha-336647266/" },
      { name: "Guilherme Rodrigues", url: "https://www.linkedin.com/in/" },
      { name: "Felipe Guedes", url: "https://www.linkedin.com/in/felipeguedesgoncalves/" },
      { name: "Luiz Felipe Soares", url: "https://www.linkedin.com/in/luizlucena97/" },
    ],
  },
  {
    id: "6",
    title: "BlueHope",
    tag: "Software Development",
    cover: "/projects/p6a.png",
    images: ["/projects/p6a.png", "/projects/p6b.png", "/projects/p6c.png", "/projects/p6d.png"],
    desc: {
      pt: "Plataforma de desafios ambientais para promover ações positivas nos oceanos. Usuários ganham pontos por desafios validados por IA e trocam por certificados/premiações.",
      en: "Environmental challenge platform promoting positive actions for the oceans. Users earn points for AI-validated challenges and redeem them for certificates/awards.",
    },
    tech: ["Next.js", "Tailwind", "Java", "Python", "JavaScript", "TypeScript", "C#"],
    academic: true,
    contributors: [
      { name: "Breno Santiago", url: "https://www.linkedin.com/in/breno-santiago-66b164227/" },
      { name: "Felipe Guedes", url: "https://www.linkedin.com/in/felipeguedesgoncalves/" },
      { name: "Luiz Felipe Soares", url: "https://www.linkedin.com/in/luizlucena97/" },
      { name: "Vitória Maria de Camargo", url: "https://www.linkedin.com/in/camargovitoria/" },
    ],
    repo: "https://github.com/Santlago/BlueHope?tab=readme-ov-file#documentação-da-api",
  },
  {
    id: "7",
    title: "GridHub",
    tag: "Software Development",
    cover: "/projects/p7a.png",
    images: ["/projects/p7a.png"],
    desc: {
      pt: "Marketplace que conecta proprietários de microgrids a donos de imóveis para viabilizar soluções de energia sustentável por meio de locação de espaços.",
      en: "Marketplace connecting microgrid owners with property owners to enable sustainable energy solutions through space rentals.",
    },
    tech: ["Next.js", "Tailwind", "Java", "Python", "JavaScript", "TypeScript", "C#"],
    academic: true,
    contributors: [
      { name: "Breno Santiago", url: "https://www.linkedin.com/in/breno-santiago-66b164227/" },
      { name: "Felipe Guedes", url: "https://www.linkedin.com/in/felipeguedesgoncalves/" },
      { name: "Luiz Felipe Soares", url: "https://www.linkedin.com/in/luizlucena97/" },
      { name: "Vitória Maria de Camargo", url: "https://www.linkedin.com/in/camargovitoria/" },
    ],
    repo: "https://github.com/Santlago/gridhub?tab=readme-ov-file",
  },
];


export default function Projects() {
  const { t, lang } = useI18n(); // ⬅️ i18n

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Project | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const leftColRef = useRef<HTMLDivElement>(null);
  const [leftColH, setLeftColH] = useState<number | null>(null);

  useEffect(() => {
    const el = leftColRef.current;
    if (!el) return;
    const read = () => setLeftColH(el.getBoundingClientRect().height);
    const ro = new ResizeObserver(read);
    ro.observe(el);
    read();
    return () => ro.disconnect();
  }, [open, active, imgIdx]);

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollByCards = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : 340;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

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
    <section id="projects" className="relative overflow-hidden pt-14 pb-14 scroll-mt-28">
      {/* fundo */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/gradients/blur-gradient.png"
          alt=""
          width={860}
          height={860}
          className="absolute -top-117 right-230 w-[860px] opacity-70"
          priority
        />
        <Image
          src="/gradients/blur-gradient-purple.png"
          alt=""
          width={700}
          height={700}
          className="absolute top-10 -right-70 w-[700px] opacity-70"
        />
      </div>

      {/* conteúdo */}
      <div className="relative z-10 container-hero">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold">
          {t("projects.title")}
        </h2>
        <p className="max-w-3xl mx-auto mt-4 text-center text-gray-700">
          {t("projects.lead")}
        </p>

        {/* carrossel */}
        <div className="relative mt-10">
          <div
            ref={trackRef}
            className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 py-4"
          >
            {PROJECTS.map((p) => (
              <article
                key={p.id}
                data-card
                className="snap-start shrink-0 w-[287px] sm:w-[327px] rounded-[16px]
                           bg-white/70 backdrop-blur-md border border-black/10
                           transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => openProject(p)}
              >
                <div className="overflow-hidden rounded-[16px]">
                  <div className="relative aspect-[16/12] bg-white flex items-center justify-center p-2">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 320px, 360px"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs uppercase tracking-wide text-gray-500">{p.tag}</span>
                    <h3 className="text-lg font-semibold mt-1">{p.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* setas */}
          <button
            onClick={() => scrollByCards(-1)}
            aria-label={t("projects.prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
                       rounded-full p-2 bg-white/85 backdrop-blur border border-black/10 hover:bg-white shadow"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scrollByCards(1)}
            aria-label={t("projects.next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-1/2
                       rounded-full p-2 bg-white/85 backdrop-blur border border-black/10 hover:bg-white shadow"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* modal */}
      {open && active && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="container-hero h-[100dvh] flex items-start md:items-center py-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="
                relative w-full mx-auto
                rounded-2xl bg-white/95 backdrop-blur
                p-3 sm:p-6 lg:p-8
                border border-black/10 shadow-2xl
                max-w-[96vw] md:max-w-[980px]
                max-h-[calc(100dvh-24px)] md:max-h-[min(90vh,860px)]
                overflow-y-auto
              "
            >
              <button
                onClick={() => setOpen(false)}
                aria-label={t("projects.modal.close")}
                className="
                  fixed md:absolute
                  top-[max(12px,env(safe-area-inset-top))]
                  right-[max(12px,env(safe-area-inset-right))]
                  z-[60]
                  rounded-full p-3 bg-black/80 text-white hover:bg-black
                "
              >
                <X size={22} />
              </button>

              <div className="grid gap-6 md:grid-cols-2">
                {/* galeria */}
                <div className="space-y-3" ref={leftColRef}>
                  <div className="relative rounded-xl overflow-hidden bg-white flex items-center justify-center w-full max-h-[52vh] sm:max-h-[520px]">
                    <Image
                      key={active.images[imgIdx]}
                      src={active.images[imgIdx]}
                      alt={`${t("projects.image")} ${imgIdx + 1}`}
                      width={1600}
                      height={1200}
                      className="w-full h-auto object-contain"
                      sizes="(min-width: 868px) 50vw, 100vw"
                      priority
                    />
                  </div>

                  <div className="flex gap-3 overflow-x-auto no-scrollbar">
                    {active.images.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setImgIdx(i)}
                        className={`relative h-14 w-20 md:h-16 md:w-24 rounded-lg overflow-hidden border ${
                          i === imgIdx ? "border-black/60" : "border-black/10"
                        }`}
                        aria-label={`${t("projects.image")} ${i + 1}`}
                      >
                        <Image src={src} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* texto */}
                <div
                  className="flex flex-col md:pr-1 md:[scrollbar-gutter:stable]"
                  style={{ ["--panelH" as any]: leftColH ? `${leftColH}px` : undefined }}
                >
                  <div className="md:max-h-[var(--panelH)] md:overflow-y-auto md:min-h-0">
                    <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">
                      {active.tag}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold">{active.title}</h3>
                    <p className="mt-3 text-gray-700 leading-relaxed">{active.desc[lang]}</p>

                    {active.tech && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {active.tech.map((tch) => (
                          <li key={tch} className="text-xs rounded-full border border-black/10 px-3 py-1 bg-white/80">
                            {tch}
                          </li>
                        ))}
                      </ul>
                    )}

                    {active.academic ? (
                      <div className="mt-6 flex items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-black text-white">
                          <GraduationCap className="h-4 w-4" />
                          {t("projects.academicBadge")}
                        </span>
                        {active.repo && (
                          <a
                            href={active.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full px-2 py-1"
                            aria-label={t("projects.openRepoAria")}
                          >
                            <Image src="/icons/github.png" alt="" width={22} height={22} className="opacity-80" />
                          </a>
                        )}
                      </div>
                    ) : active.link ? (
                      <div className="mt-6 mb-16">
                        <a
                          href={active.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-full px-4 py-2 bg-black text-white hover:bg-black/90"
                        >
                          {t("projects.visit")}
                        </a>
                      </div>
                    ) : null}

                    {active.contributors?.length ? (
                      <div className="mt-4">
                        <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                          {t("projects.contributors")}
                        </h4>
                        <ul className="flex flex-wrap gap-2">
                          {active.contributors.map((c) => (
                            <li key={c.url}>
                              <a
                                href={c.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 bg-white/80 hover:bg-white"
                              >
                                <Image src="/icons/linkedin.png" alt="" width={14} height={14} aria-hidden="true" />
                                <span className="text-xs font-medium">{c.name}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="h-2 shrink-0" />
                  </div>
                </div>
              </div>

              {active.images.length > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setImgIdx((i) => (i - 1 + active.images.length) % active.images.length)}
                    className="rounded-full p-2 border border-black/10 bg-white hover:bg-white/90"
                    aria-label={t("projects.prev")}
                  >
                    <ChevronLeft />
                  </button>
                  <div className="text-xs text-gray-500">
                    {imgIdx + 1} / {active.images.length}
                  </div>
                  <button
                    onClick={() => setImgIdx((i) => (i + 1) % active.images.length)}
                    className="rounded-full p-2 border border-black/10 bg-white hover:bg-white/90"
                    aria-label={t("projects.next")}
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
