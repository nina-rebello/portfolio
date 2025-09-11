import Image from "next/image";

const services = [
  { icon: "/icons/icons8-source-code-96.png", title: "Software Development",
    desc: "Custom applications built to solve real problems." },
  { icon: "/icons/icons8-internet-100.png", title: "Web Development",
    desc: "Modern, scalable and optimized websites." },
  { icon: "/icons/icons8-web-100.png", title: "Web Design",
    desc: "In partnership with Luana Rebello, focused on elegant UI." },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden">
      {/* fundo com gradientes */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/gradients/light-leak-blur-transparent-free-png.png"
          alt=""
          width={1400}
          height={1000}
          className="absolute -top-10 left-[-200px] w-[1000px] opacity-80"
          priority
        />
        <Image
          src="/gradients/blur-gradient.png"
          alt=""
          width={860}
          height={860}
          className="absolute top-[176px] right-[-230px] w-[860px] opacity-70"
        />
      </div>

      {/* faixa branca por cima */}
      <div className="relative z-10 bg-white pt-20 pb-16 text-center">
        <div className="container-hero">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Services</h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Mollis erat duis aliquam
            mauris est risus lectus. Phasellus consequat urna tellus
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* cards */}
      <div className="relative z-10 container-hero py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="
                relative overflow-hidden
                rounded-[20px] p-10
                bg-white/55 backdrop-blur-md
                ring-1 ring-black/5
                shadow-[0_12px_36px_rgba(0,0,0,0.12)]
                transition
                hover:shadow-[0_18px_48px_rgba(0,0,0,0.16)]
                min-h-[260px]
              "
            >
              {/* degradê interno suave vindo da esquerda (igual ao mock) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#EAF6FF]/60 via-white/20 to-transparent" />

              <div className="relative flex items-start gap-6">
                <Image
                  src={s.icon}
                  alt={s.title}
                  width={56}
                  height={56}
                  className="mt-1 shrink-0 opacity-90"
                />
                <div>
                  <h3 className="font-semibold leading-tight
                                 text-[26px] md:text-[28px] lg:text-[32px]
                                 tracking-[-0.01em] mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">
                    {s.desc}
                  </p>

                  {s.title === "Web Design" && (
                    <p className="mt-6 text-xs text-gray-500">
                      Em parceria com Luana Rebello
                    </p>
                  )}
                </div>
              </div>

              {/* borda de luz sutil (highlight) no topo como no protótipo */}
              <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-white/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
