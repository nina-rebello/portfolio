import Image from "next/image";

const services = [
  {
    icon: "/icons/icons8-source-code-96.png",
    title: "Software Development",
    desc: "Custom applications built to solve real problems.",
  },
  {
    icon: "/icons/icons8-internet-100.png",
    title: "Web Development",
    desc: "Modern, scalable and optimized websites.",
  },
  {
    icon: "/icons/icons8-web-100.png",
    title: "Web Design",
    desc: "In partnership with Luana Rebello, focused on elegant UI.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden">
      {/* === gradientes de fundo === */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/gradients/light-leak-blur-transparent-free-png.png"
          alt=""
          width={1400}
          height={1000}
          className="absolute -top-90 left-200 w-[1000px] opacity-80"
          priority
        />
        <Image
          src="/gradients/blur-gradient.png"
          alt=""
          width={760}
          height={760}
          className="absolute top-4 right-250 w-[760px] opacity-70"
        />
      </div>

      {/* === faixa branca por cima dos gradientes === */}
      <div className="relative z-10 bg-white pt-20 pb-18 text-center">
        <div className="container-hero">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Services</h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Mollis erat duis aliquam
            mauris est risus lectus. Phasellus consequat urna tellus
          </p>
        </div>
        {/* fade branco para transição suave */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* === grid de cards === */}
      <div className="relative z-10 container-hero py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-[16px] p-8 bg-white/55 backdrop-blur-md
                         ring-1 ring-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                         transition hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={s.icon}
                  alt={s.title}
                  width={42}
                  height={42}
                  className="mt-1 shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-2xl mb-2">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.desc}</p>
                  {s.title === "Web Design" && (
                    <p className="mt-6 text-xs text-gray-500">
                      Em parceria com Luana Rebello
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
