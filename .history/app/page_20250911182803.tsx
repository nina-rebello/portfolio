// app/page.tsx
import Header from "@/components/header/Header";
import AboutMe from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutMe />
        <Services />
        <Projects />
        <WorkExperience />
      </main>
    </>
  );
}