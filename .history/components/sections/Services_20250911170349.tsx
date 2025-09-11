import Image from "next/image";
import { Code, Globe, Layout } from "lucide-react";

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
    <section id="services" className="relative overflow-hidden py-28">
      {/* === background gradients === */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/gradients/light-leak-blur-transparent-free-png.png"
          alt=""
          width={1400}
          height={1000}
          className="absolute -top-80 left-200 w-[1000px] opacity-80"
          priority
        />
        <Image
          src="/gradients/blur-gradient.png"
          alt=""
          width={600}
          height={600}
          className="absolute top-4 right-250 w-[760px] opacity-70"
        />
      </div>

      {/* === conteúdo (fica acima do fundo) === */}
      <div className="container-hero relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Services</h2>
        <p className="max-w-2xl mx-auto mb-12 text-gray-700">
          Lorem ipsum dolor sit amet consectetur. Mollis erat duis aliquam
          mauris est risus lectus. Phasellus consequat urna tellus.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl p-8 backdrop-blur-md hover:shadow-xl transition
                       bg-white/0 border border-white/20"
              >
              <Image
                src={s.icon}
                alt={s.title}
                width={50}
                height={50}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}