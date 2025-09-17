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
    desc: "Clean, creative, and user-focused interfaces that bring ideas to life.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden scroll-mt-28">
      {/* === gradientes de fundo === */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/gradients/light-leak-blur-transparent-free-png.png"
          alt=""
          width={1400}
          height={1000}
          className="absolute -top-10 left-200 w-[1000px] opacity-80"
          priority
        />
        <Image
          src="/gradients/blur-gradient.png"
          alt=""
          width={760}
          height={760}
          className="absolute top-44 right-230 w-[860px] opacity-70"
        />
      </div>

      {/* === faixa branca por cima dos gradientes === */}
      <div className="relative z-10 bg-white pt-20 pb-18 text-center">
        <div className="container-hero">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Services</h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Building digital experiences that are clear, modern, effective, and tailored to connect people with brands in meaningful ways.
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
            className="rounded-2xl p-8 backdrop-blur-md bg-white/40 
                      border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                      transition hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
          >
            <div className="flex flex-col items-start text-left">
              <Image
                src={s.icon}
                alt={s.title}
                width={50}
                height={50}
                className="mb-4 opacity-90"
              />
              <h3 className="font-semibold text-2xl mb-3">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              {s.title === "Web Design" && (
                <p className="mt-4 text-xs text-gray-500">
                  In partnership with Luana Rebello
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}
