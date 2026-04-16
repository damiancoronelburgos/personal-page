import { useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LangProvider } from "./contexts/LangContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function App() {
  /* Cursor glow — direct DOM, no React state → 60 fps */
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    if (!glow) return;
    let rafId;
    const move = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        glow.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <ThemeProvider>
      <LangProvider>
        {/* Global cursor spotlight */}
        <div id="cursor-glow" aria-hidden="true" />

        <div className="app-layout">
          <Sidebar />

          <main className="main-content">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Contact />
            <Footer />
          </main>
        </div>
      </LangProvider>
    </ThemeProvider>
  );
}
