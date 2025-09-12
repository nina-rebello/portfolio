"use client";
import { motion } from "framer-motion";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="bg-[#111] text-white py-11 sm:py-15 mt-4 sm:mt-20 scroll-mt-28"
    >
      <motion.div
        className="container-hero text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
          About Me
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed">
          I’m a passionate website developer focused on building
          clean, responsive, and user-friendly websites.
          With strong attention to detail and a love for design,
          I combine creativity with functionality.
        </p>
      </motion.div>
    </section>
  );
}
