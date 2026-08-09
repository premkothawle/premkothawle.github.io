import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Articles from "./components/Articles.jsx";
import Credentials from "./components/Credentials.jsx";
import Timeline from "./components/Timeline.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import BackToTop from "./components/BackToTop.jsx";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e) {
      const isK = e.key === "k" || e.key === "K";
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Articles />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
