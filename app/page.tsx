// app/page.tsx
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import AboutMe from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import LanguageSwitcher from "@/components/sections/LanguageSwitcher";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import WorkExperience from "@/components/sections/WorkExperience";

export default function HomePage() {
  return (
    <>
      <Header />
      <LanguageSwitcher />
      <main className="pt-10 sm:pt-12 md:pt-12">
        <Hero />
        <AboutMe />
        <Services />
        <Projects />
        <WorkExperience />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}