import Image from "next/image";

const PROJECTS = [
  { id: "1", title: "Web Design", cover: "" },
  { id: "2", title: "Web Design", cover: "" },
  { id: "3", title: "Web Design", cover: "" },
];

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden">
      {/* gradientes nas bordas (como no seu print) */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none">
        <Image
          src="/gradients/light-leak-blur-transparent-free-png.png"
          alt="" width={1000} height={800}
          className="absolute -top-24 -left-28 w-[520px] opacity-70"
          priority
        />
        <Image
          src="/gradients/blur-gradient.png"
          alt="" width={900} height={900}
          className="absolute -top-8 -right-36 w-[560px] opacity-80"
        />
      </div>

      {/* faixa branca do título */}
      <div className="relative z-10 bg-white pt-10 pb-6 text-center">
        <div className="container-hero">
          <h2 className="text-3xl sm:text-4xl font-extrabold">My Projects</h2>
          <p className="max-w-3xl mx-auto mt-4 text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Mollis erat duis aliquam mauris est risus
            lectus. Phasellus consequat urna tellus
          </p>
        </div>
        <div className="absolute -bottom-2 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* grid como na foto (sem carrossel) */}
      <div className="relative z-10 container-hero pb-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article key={p.id} className="text-left">
              <div
                className="rounded-[14px] bg-gray-200/70 aspect-[1/1]
                           border border-black/10"
                aria-label="Project placeholder"
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
