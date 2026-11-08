// app/page.tsx
// Main page – assembles all portfolio sections
import Navbar from "./components/layout/Navbar";
import Home from "./components/sections/home/Home";
import About from "./components/sections/about/About";
import Projects from "./components/sections/projects/Projects";
import Skills from "./components/sections/skills/Skills";
import Experience from "./components/sections/experience/Experience";
import Contact from "./components/sections/contact/Contact";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
