"use client";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

export default function AboutMe() {
  const { t } = useI18n();

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
          {t("about.title")}
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed">
          {t("about.text")}
        </p>
      </motion.div>
    </section>
  );
}
