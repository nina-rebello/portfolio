import Image from "next/image";

const PROJECTS = [
  { id: "1", title: "Web Design" },
  { id: "2", title: "Web Design" },
  { id: "3", title: "Web Design" },
  // adicione mais itens aqui...
];

export default function Projects() {
  return (
    // nada de faixa branca aqui; fundo continua com gradiente
    <section id="projects" className="relative overflow-hidden pt-14 pb-14">
  {/* NÃO coloque bg branco aqui */}
  {/* se quiser aquele blob da direita, pode manter este: */}
   <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
                  src="/gradients/blur-gradient.png"
                  alt=""
                  width={760}
                  height={760}
                  className="absolute -top-117 right-230 w-[860px] opacity-70"
        />
        <Image
                  src="/gradients/blur-gradient-purple.png"
                  alt=""
                  width={760}
                  height={760}
                  className="absolute -top-117 right-230 w-[860px] opacity-70"
        />
      </div>

  <div className="container-hero text-center">
    <h2 className="text-3xl sm:text-4xl font-extrabold">My Projects</h2>
    <p className="max-w-3xl mx-auto mt-4 text-gray-700">
      Lorem ipsum dolor sit amet consectetur. Mollis erat duis aliquam mauris est risus lectus.
      Phasellus consequat urna tellus
    </p>

    <div className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article key={p.id} className="text-left">
              {/* placeholder da capa */}
              <div className="aspect-[1/1] rounded-[14px] bg-gray-200/70 border border-black/10" />
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


//  {/* === background gradients === */}
    //   <div className="absolute inset-0 z-0 pointer-events-none select-none">
        
    //     <Image
    //       src="/gradients/blur-gradient.png"
    //       alt=""
    //       width={600}
    //       height={600}
    //       className="absolute top-4 right-250 w-[760px] opacity-70"
    //     />
    //   </div>