import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { useLang } from "../../contexts/LangContext";
import useScrollSpy from "../../hooks/useScrollSpy";
import styles from "./Sidebar.module.css";

const SECTIONS = ["about", "skills", "projects", "education", "contact"];

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/damian-coronel-burgos" },
  { label: "GitHub",   href: "https://github.com/DamianCoronelBurgos" },
  { label: "Email",    href: "mailto:danielcoronelburgos1993@gmail.com" },
];

export default function Sidebar() {
  const { dark, setDark } = useTheme();
  const { lang, t, toggleLang } = useLang();
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SECTIONS);

  /* ── Vertical scroll-progress bar ──────────────────────────────────────── */
  useEffect(() => {
    const bar = document.getElementById("sidebar-progress");
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.height = total > 0 ? `${(window.scrollY / total) * 100}%` : "0%";
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* ── Lock body scroll when mobile menu is open ──────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* ── Mobile hamburger ─────────────────────────────────────────────── */}
      <button
        className={styles.hamburger}
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
      >
        <span /><span /><span />
      </button>

      {/* ── Mobile overlay ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>

        {/* Vertical scroll-progress track */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div id="sidebar-progress" className={styles.progressBar} />
        </div>

        {/* Close button (mobile only) */}
        <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Cerrar menú">
          ✕
        </button>

        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <div className={styles.logo}>DCB.dev</div>

        {/* ── Name block ────────────────────────────────────────────────── */}
        <div className={styles.nameBlock}>
          <span className={styles.firstName}>Damian</span>
          <span className={styles.lastName}>Coronel</span>
          <span className={styles.jobTitle}>{t.hero.role}</span>
        </div>

        {/* ── Navigation ────────────────────────────────────────────────── */}
        <nav className={styles.nav} aria-label="Navegación principal">
          {SECTIONS.map((s) => (
            <button
              key={s}
              className={`${styles.navLink} ${active === s ? styles.navActive : ""}`}
              onClick={() => scrollTo(s)}
            >
              {/* Animated active indicator */}
              {active === s && (
                <motion.span
                  layoutId="nav-indicator"
                  className={styles.indicator}
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={styles.navNum}>0{SECTIONS.indexOf(s) + 1}</span>
              <span className={styles.navLabel}>{t.nav[s]}</span>
            </button>
          ))}
        </nav>

        {/* ── Spacer ────────────────────────────────────────────────────── */}
        <div className={styles.spacer} />

        {/* ── Controls ──────────────────────────────────────────────────── */}
        <div className={styles.controls}>
          <button className={styles.ctrlBtn} onClick={toggleLang} title="Cambiar idioma">
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button className={styles.ctrlBtn} onClick={() => setDark((d) => !d)} aria-label="Cambiar tema">
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* ── Social links ──────────────────────────────────────────────── */}
        <div className={styles.social}>
          {SOCIAL.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className={styles.copy}>© 2026 DCB</p>
      </aside>
    </>
  );
}
