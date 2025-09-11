import { Code, Palette, Smartphone } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    desc: "Modern, scalable and optimized websites built with the latest technologies.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Clean, minimal and user-friendly interfaces that focus on great experiences.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    desc: "Websites that adapt seamlessly to all devices and screen sizes.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="container-hero text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-12">
          Services
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="glass p-8 rounded-2xl hover:shadow-xl transition"
            >
              <s.icon className="mx-auto mb-4 text-[var(--brand)]" size={40} />
              <h3 className="font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
