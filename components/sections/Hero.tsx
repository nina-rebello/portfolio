import { Quote, Star } from "lucide-react";

function HelloBubble() {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold">
        Hello!
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="pt-20 sm:pt-28">
      <div className="container-hero">
        {/* bloco principal */}
        <div className="text-center">
          <div className="mb-6 sm:mb-8">
            <HelloBubble />
          </div>

          <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            I’m{" "}
            <span style={{ color: "var(--brand)" }}>
              Nina
            </span>
            , 
          </p>
          <h1 className="mt-2 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            Website Developer
          </h1>
        </div>

        {/* faixa inferior: quote esquerda / rating direita */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* quote */}
          <div className="flex gap-3">
            <div className="mt-1">
              <Quote className="text-[var(--brand)]" />
            </div>
            <div>
              <p className="font-semibold">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <p className="text-[var(--muted)]">
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* rating / experiência */}
          <div className="flex md:justify-end">
            <div className="text-right">
              <div className="flex justify-end gap-1 mb-2" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="text-[var(--brand)]" fill="currentColor" size={22} />
                ))}
              </div>
              <div className="text-3xl sm:text-4xl font-bold">2 Years</div>
              <div className="text-[var(--muted)]">Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
