export default function AboutMe() {
  return (
    <section id="about" className="bg-[#111] text-white  py-11 sm:py-15 mt-4 sm:mt-20 scroll-mt-24">
      <div className="container-hero text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
          About Me
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed">
          I’m a passionate website developer focused on building
          clean, responsive, and user-friendly websites.
          {/* <br /> */}
          With strong attention to detail and a love for design,
          I combine creativity with functionality.
        </p>
      </div>
    </section>
  );
}
