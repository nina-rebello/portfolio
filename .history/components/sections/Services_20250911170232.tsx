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
      {/* === topo branco (título + texto) === */}
      <div className="bg-white py-20 text-center">
        <div className="container-hero">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Services</h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Mollis erat duis aliquam
            mauris est risus lectus. Phasellus consequat urna tellus.
          </p>
        </div>
      </div>

      {/* === parte gradiente com cards === */}
      <div className="relative py-20">
        {/* background blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/gradients/light-leak.png"
            alt=""
            width={1400}
            height={1000}
            className="absolute -top-32 -left-40 w-[900px] opacity-80"
            priority
          />
          <Image
            src="/gradients/blob-big.png"
            alt=""
            width={1200}
            height={1200}
            className="absolute -bottom-40 left-[8%] w-[520px] opacity-70"
          />
          <Image
            src="/gradients/blob-small.png"
            alt=""
            width={600}
            height={600}
            className="absolute top-24 -right-28 w-[460px] opacity-70"
          />
        </div>

        {/* cards */}
        <div className="container-hero relative z-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl p-8 backdrop-blur-md hover:shadow-xl transition
                           bg-white/70 border border-white/20"
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
      </div>
    </section>
  );
}
