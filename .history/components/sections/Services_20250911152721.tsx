import Image from "next/image";
import { Code, Globe, Layout } from "lucide-react";

const services = [
  {
    icon: "/icons/icons8-source-code-96.png",
    title: "Software Development",
    desc: "Custom applications built to solve real problems.",
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "Modern, scalable and optimized websites.",
  },
  {
    icon: Layout,
    title: "Web Design",
    desc: "In partnership with Luana Rebello, focused on elegant UI.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 overflow-hidden">
      {/* background blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Image
          src="/gradients/light-leak-blur-transparent-free-png.png"
          alt=""
          width={1200}
          height={1200}
          className="absolute top-[-200px] left-[-200px] w-[700px] opacity-70"
        />
        <Image
          src="/gradients/blur-gradient-circle-transparent-ball-gradient-shining-circle-holographic-blurred-circles-rainbow-color-dots-abstract-gradient-shape-design-elements-free-png-2.png"
          alt=""
          width={500}
          height={500}
          className="absolute bottom-[-100px] left-[10%] w-[400px] opacity-60"
        />
        <Image
          src="/gradients/blur-gradient-circle-transparent-ball-gradient-shining-circle-holographic-blurred-circles-rainbow-color-dots-abstract-gradient-shape-design-elements-free-png.png"
          alt=""
          width={500}
          height={500}
          className="absolute top-[100px] right-[-100px] w-[450px] opacity-60"
        />
      </div>

      {/* content */}
      <div className="container-hero text-center relative">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Services</h2>
        <p className="max-w-2xl mx-auto mb-12 text-gray-700">
          Lorem ipsum dolor sit amet consectetur. Mollis erat duis aliquam
          mauris est risus lectus. Phasellus consequat urna tellus.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="glass p-8 rounded-2xl backdrop-blur-md hover:shadow-xl transition"
            >
              <s.icon
                className="mx-auto mb-4 text-[var(--brand)]"
                size={40}
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
