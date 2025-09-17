"use client";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const bubbleVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.6, rotate: -5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 220,
      damping: 18,
    },
  },
};

function HelloBubble() {
  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className="inline-flex items-center gap-2"
    >
      <span className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur">
        Hello!
      </span>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="pt-20 sm:pt-28 overflow-hidden">
      <div className="container-hero">
        {/* bloco principal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="text-center"
        >
          <motion.div variants={bubbleVariants} className="mb-6 sm:mb-8">
            <HelloBubble />
          </motion.div>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          >
            I’m <span style={{ color: "var(--brand)" }}>Nina</span>,
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="mt-2 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight"
          >
            Website Developer
          </motion.h1>
        </motion.div>

        {/* faixa inferior */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        >
          {/* quote */}
          <div className="flex gap-3">
            <motion.div
              initial={{ rotate: -30, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.8 }}
              className="mt-1"
            >
              <Quote className="text-[var(--brand)]" />
            </motion.div>
            <div>
              <p className="font-semibold">
                Crafting digital experiences and empowering brands through web development.
              </p>
              <p className="text-[var(--muted)]">
                Criando experiências digitais e impulsionando marcas através do desenvolvimento web.
              </p>
            </div>
          </div>

          {/* rating */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 20, delay: 1 }}
            className="flex md:justify-end"
          >
            <div className="text-right">
              <div className="flex justify-end gap-1 mb-2" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="text-[var(--brand)]"
                    fill="currentColor"
                    size={22}
                  />
                ))}
              </div>
              <div className="text-3xl sm:text-4xl font-bold">2 Years</div>
              <div className="text-[var(--muted)]">Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
