import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLang } from "../../contexts/LangContext";
import useScrollSpy from "../../hooks/useScrollSpy";
import styles from "./Navbar.module.css";

const SECTIONS = ["about", "skills", "projects", "education", "contact"];

export default function Navbar() {
  const { dark, setDark } = useTheme();
  const { lang, t, toggleLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(SECTIONS);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Scroll progress bar + nav shadow on scroll
  useEffect(() => {
    const bar = document.getElementById("nav-progress");
    const update = () => {
      const scrolled = window.scrollY;
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : "0%";
      setScrolled(scrolled > 20);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>DCB.dev</div>

      <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => scrollTo(s)}
            className={`${styles.navLink} ${active === s ? styles.activeLink : ""}`}
          >
            {t.nav[s]}
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={toggleLang}>
          {lang === "es" ? "EN" : "ES"}
        </button>
        <button
          className={`${styles.controlBtn} ${styles.themeBtn}`}
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
        >
          {dark ? "☀️" : "🌙"}
        </button>
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Scroll progress bar */}
      <div id="nav-progress" className={styles.progress} aria-hidden="true" />
    </nav>
  );
}
