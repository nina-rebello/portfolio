import Image from "next/image";

const PROJECTS = [
  { id: "1", title: "Web Design" },
  { id: "2", title: "Web Design" },
  { id: "3", title: "Web Design" },
];

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden pt-14 pb-14">
      {/* gradientes ATRÁS */}
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

      {/* CONTEÚDO na frente */}
      <div className="relative z-10 container-hero text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold">My Projects</h2>
        <p className="max-w-3xl mx-auto mt-4 text-gray-700">
          Lorem ipsum dolor sit amet consectetur. Mollis erat duis aliquam mauris est risus lectus.
          Phasellus consequat urna tellus
        </p>

        <div className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article key={p.id} className="text-left">
              {/* card acima do gradiente */}
              <div
                className="aspect-[1/1] rounded-[14px]
                           bg-white/60 backdrop-blur-md
                           border border-black/10
                           shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
              />
              <div className="mt-3 text-sm">
                <div className="text-gray-800">{p.title}</div>
                <div className="text-gray-500">Design</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
