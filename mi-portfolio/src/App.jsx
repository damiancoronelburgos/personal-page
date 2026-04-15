import { useState, useEffect, useRef } from "react";

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const T = {
  es: {
    nav: { about: "Sobre mí", skills: "Habilidades", projects: "Proyectos", education: "Formación", contact: "Contacto" },
    hero: {
      available: "Disponible para nuevos proyectos",
      role: "Analista de Datos & Fraude",
      sub: "Transformo datos complejos en inteligencia accionable. Investigación criminal · Ciberseguridad · BI",
      cta1: "Ver proyectos",
      cta2: "Contactar",
    },
    stats: [
      { num: "+1000", label: "Resúmenes bancarios analizados" },
      { num: "+50", label: "Investigados perfilados" },
      { num: "3 años", label: "En PFA / Delitos tecnológicos" },
      { num: "10+", label: "Certificaciones técnicas" },
    ],
    about: {
      label: "Sobre mí",
      p1: "Soy Damian Coronel Burgos, analista de datos y fraude con base en Buenos Aires. Mi trayectoria combina análisis de datos avanzado con investigación criminal en la Policía Federal Argentina, donde trabajé en casos de alcance internacional.",
      p2: "Me especializo en detectar patrones anómalos en grandes volúmenes de datos financieros, análisis forense de criptoactivos y construcción de dashboards que convierten datos técnicos en decisiones claras para autoridades y equipos interdisciplinarios.",
      p3: "Actualmente curso la Licenciatura en Inteligencia Artificial y Ciencia de Datos en UADE, profundizando mi enfoque en ML aplicado a detección de fraude.",
    },
    skills: { label: "Stack & Habilidades" },
    skillGroups: [
      { title: "Análisis de datos & BI", icon: "📊", tags: ["Python", "Pandas", "NumPy", "SQL", "MySQL", "Power BI", "Looker Studio", "Excel avanzado"] },
      { title: "Ciberseguridad & Forense", icon: "🔍", tags: ["OSINT", "Análisis forense", "Chainalysis", "Etherscan", "Blockchain Explorer", "CEH v10"] },
      { title: "Desarrollo & Cloud", icon: "⚙️", tags: ["Git / GitHub", "Docker", "AWS", "Node.js", "SQLite", "Programación Web"] },
      { title: "Marco legal & Compliance", icon: "⚖️", tags: ["Ley 26.388", "Ley 25.246", "Lavado de activos", "Evidencia digital", "Gobernanza de datos"] },
      { title: "Investigación criminal", icon: "🕵️", tags: ["Inteligencia criminal", "Análisis de información", "KPIs de riesgo", "Reportes técnicos"] },
      { title: "Gestión & Colaboración", icon: "🗂️", tags: ["Trello", "Monday", "Figma", "Google Meet", "Inglés B1"] },
    ],
    projects: { label: "Proyectos", tech: "Tecnologías", status: "Estado" },
    projectList: [
      {
        id: 1,
        name: "Changa Yaa!",
        status: "En desarrollo",
        statusColor: "#f59e0b",
        desc: "Aplicación que facilita la conexión entre usuarios y trabajadores independientes profesionales. Ofrece servicios desde reparaciones del hogar hasta servicios personales, con enfoque en seguridad y verificación de identidad. Los usuarios pueden encontrar trabajadores cercanos a su ubicación y contratar con confianza. La plataforma cobra una comisión por facilitar la conexión; los acuerdos y precios se negocian directamente entre las partes.",
        tags: ["React Native", "Node.js", "PostgreSQL", "Geolocalización", "Pagos digitales"],
        highlight: true,
      },
      {
        id: 2,
        name: "Dashboard de Riesgo Transaccional",
        status: "Completado",
        statusColor: "#10b981",
        desc: "Sistema de visualización de KPIs de riesgo para análisis de resúmenes bancarios en investigaciones de lavado de activos. Integración de métricas clave y alertas automáticas para equipos de investigación.",
        tags: ["Python", "Power BI", "SQL", "Pandas", "ETL"],
        highlight: false,
      },
      {
        id: 3,
        name: "Trazabilidad de Criptoactivos",
        status: "Completado",
        statusColor: "#10b981",
        desc: "Herramienta de análisis forense para rastreo de transacciones en blockchain. Integración con Etherscan y Chainalysis para generación de reportes técnicos destinados a fiscalías.",
        tags: ["Python", "Chainalysis", "Etherscan", "APIs REST", "Reportes PDF"],
        highlight: false,
      },
    ],
    education: { label: "Formación & Certificaciones" },
    eduList: [
      { name: "Lic. en Inteligencia Artificial y Ciencia de Datos", inst: "UADE", year: "En curso" },
      { name: "Tec. Superior en Desarrollo de Software", inst: "IFTS N° 29", year: "2025" },
      { name: "Data Analytics con Python · Business Intelligence · Python", inst: "Talento Tech", year: "2025" },
      { name: "Programación en la Nube", inst: "AWS Academy", year: "2025" },
      { name: "Diplomatura en Investigación de Ciberdelitos", inst: "UNLZ", year: "2023" },
      { name: "Evidencia Digital", inst: "Embajada EE.UU. / Agencia Antiterrorismo", year: "2023" },
      { name: "Excel avanzado · Power BI · MySQL", inst: "UTN", year: "2023" },
      { name: "Programación Web con Node.js", inst: "Codo a Codo 4.0", year: "2023" },
      { name: "Lic. en Investigación Criminal", inst: "IUPFA", year: "Tesis pendiente" },
      { name: "Tec. Universitaria en Seguridad Ciudadana", inst: "IUPFA", year: "2022" },
      { name: "CEH v10 — Certified Ethical Hacker", inst: "UTN", year: "2019" },
    ],
    contact: {
      label: "Contacto",
      title: "Hablemos",
      sub: "¿Buscás un analista que combine datos, investigación y ciberseguridad? Estoy disponible.",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar mensaje",
    },
    footer: "Analista de fraude & datos · Investigación criminal",
  },
  en: {
    nav: { about: "About", skills: "Skills", projects: "Projects", education: "Education", contact: "Contact" },
    hero: {
      available: "Available for new projects",
      role: "Data & Fraud Analyst",
      sub: "I turn complex data into actionable intelligence. Criminal investigation · Cybersecurity · BI",
      cta1: "View projects",
      cta2: "Get in touch",
    },
    stats: [
      { num: "+1000", label: "Bank statements analyzed" },
      { num: "+50", label: "Individuals profiled" },
      { num: "3 yrs", label: "Federal Police / Tech crimes" },
      { num: "10+", label: "Technical certifications" },
    ],
    about: {
      label: "About me",
      p1: "I'm Damian Coronel Burgos, a data and fraud analyst based in Buenos Aires. My career combines advanced data analysis with criminal investigation at the Argentine Federal Police, working on internationally scoped cases.",
      p2: "I specialize in detecting anomalous patterns in large volumes of financial data, forensic analysis of crypto assets, and building dashboards that translate technical data into clear decisions for authorities and interdisciplinary teams.",
      p3: "I'm currently pursuing a Bachelor's degree in Artificial Intelligence and Data Science at UADE, deepening my focus on ML applied to fraud detection.",
    },
    skills: { label: "Stack & Skills" },
    skillGroups: [
      { title: "Data Analysis & BI", icon: "📊", tags: ["Python", "Pandas", "NumPy", "SQL", "MySQL", "Power BI", "Looker Studio", "Advanced Excel"] },
      { title: "Cybersecurity & Forensics", icon: "🔍", tags: ["OSINT", "Digital forensics", "Chainalysis", "Etherscan", "Blockchain Explorer", "CEH v10"] },
      { title: "Dev & Cloud", icon: "⚙️", tags: ["Git / GitHub", "Docker", "AWS", "Node.js", "SQLite", "Web Development"] },
      { title: "Legal & Compliance", icon: "⚖️", tags: ["Law 26.388", "Law 25.246", "Money laundering", "Digital evidence", "Data governance"] },
      { title: "Criminal Investigation", icon: "🕵️", tags: ["Criminal intelligence", "Information analysis", "Risk KPIs", "Technical reports"] },
      { title: "Management & Collaboration", icon: "🗂️", tags: ["Trello", "Monday", "Figma", "Google Meet", "English B1"] },
    ],
    projects: { label: "Projects", tech: "Technologies", status: "Status" },
    projectList: [
      {
        id: 1,
        name: "Changa Yaa!",
        status: "In development",
        statusColor: "#f59e0b",
        desc: "An application that connects users with independent professional workers. It offers services ranging from home repairs to personal services, with a strong focus on security and identity verification. Users can find nearby workers and hire with confidence. The platform charges a commission for facilitating the connection; agreements and pricing are negotiated directly between the parties.",
        tags: ["React Native", "Node.js", "PostgreSQL", "Geolocation", "Digital payments"],
        highlight: true,
      },
      {
        id: 2,
        name: "Transactional Risk Dashboard",
        status: "Completed",
        statusColor: "#10b981",
        desc: "Risk KPI visualization system for analyzing bank statements in money laundering investigations. Integration of key metrics and automatic alerts for investigation teams.",
        tags: ["Python", "Power BI", "SQL", "Pandas", "ETL"],
        highlight: false,
      },
      {
        id: 3,
        name: "Crypto Asset Traceability",
        status: "Completed",
        statusColor: "#10b981",
        desc: "Forensic analysis tool for tracking blockchain transactions. Integration with Etherscan and Chainalysis for generating technical reports for prosecutors.",
        tags: ["Python", "Chainalysis", "Etherscan", "REST APIs", "PDF Reports"],
        highlight: false,
      },
    ],
    education: { label: "Education & Certifications" },
    eduList: [
      { name: "B.S. in Artificial Intelligence and Data Science", inst: "UADE", year: "In progress" },
      { name: "Higher Technical Degree in Software Development", inst: "IFTS N° 29", year: "2025" },
      { name: "Data Analytics with Python · Business Intelligence · Python", inst: "Talento Tech", year: "2025" },
      { name: "Cloud Programming", inst: "AWS Academy", year: "2025" },
      { name: "Cybercrime Investigation Diploma", inst: "UNLZ", year: "2023" },
      { name: "Digital Evidence", inst: "US Embassy / Anti-Terrorism Agency", year: "2023" },
      { name: "Advanced Excel · Power BI · MySQL", inst: "UTN", year: "2023" },
      { name: "Web Programming with Node.js", inst: "Codo a Codo 4.0", year: "2023" },
      { name: "B.S. in Criminal Investigation", inst: "IUPFA", year: "Thesis pending" },
      { name: "University Degree in Public Safety", inst: "IUPFA", year: "2022" },
      { name: "CEH v10 — Certified Ethical Hacker", inst: "UTN", year: "2019" },
    ],
    contact: {
      label: "Contact",
      title: "Let's talk",
      sub: "Looking for an analyst who combines data, investigation and cybersecurity? I'm available.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
    },
    footer: "Fraud & data analyst · Criminal investigation",
  },
};

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 100;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrollY) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function Tag({ children, accent }) {
  return (
    <span style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: 11,
      padding: "3px 9px",
      borderRadius: 4,
      border: accent ? "1px solid rgba(0,229,160,0.5)" : "1px solid rgba(128,128,128,0.25)",
      color: accent ? "#00e5a0" : "var(--muted)",
      background: accent ? "rgba(0,229,160,0.06)" : "rgba(128,128,128,0.07)",
      letterSpacing: "0.04em",
      whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: 11,
      color: "#00e5a0",
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      marginBottom: "2.5rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    }}>
      {children}
      <div style={{ width: 60, height: 1, background: "rgba(0,229,160,0.35)" }} />
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const t = T[lang];
  const sections = ["about", "skills", "projects", "education", "contact"];
  const active = useScrollSpy(sections);

  const accent = "#00e5a0";
  const accent2 = "#0077ff";

  const css = {
    bg: dark ? "#0a0c10" : "#f4f5f7",
    bg2: dark ? "#0f1218" : "#ffffff",
    bg3: dark ? "#141820" : "#eef0f3",
    text: dark ? "#e8eaf0" : "#111318",
    muted: dark ? "#7a8099" : "#555a72",
    border: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)",
    navBg: dark ? "rgba(10,12,16,0.88)" : "rgba(244,245,247,0.92)",
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div style={{ background: css.bg, color: css.text, fontFamily: "'Syne', sans-serif", minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap" rel="stylesheet" />

      {/* Global styles via style tag */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        :root { --muted: ${css.muted}; }
        a { color: inherit; text-decoration: none; }
        ::selection { background: rgba(0,229,160,0.25); }
        input, textarea { outline: none; resize: vertical; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .fade-up { animation: fadeUp 0.55s ease both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.22s; }
        .delay-3 { animation-delay: 0.36s; }
        .delay-4 { animation-delay: 0.5s; }
        .skill-card:hover { border-color: rgba(0,229,160,0.3) !important; transform: translateY(-2px); }
        .skill-card { transition: border-color 0.2s, transform 0.2s; }
        .project-card:hover { border-color: rgba(0,119,255,0.35) !important; }
        .project-card { transition: border-color 0.2s; }
        .nav-link { transition: color 0.2s; }
        .nav-link:hover { color: ${accent} !important; }
        .btn { transition: opacity 0.18s, transform 0.15s, background 0.2s; cursor: pointer; }
        .btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .edu-card:hover { border-color: rgba(0,119,255,0.3) !important; }
        .edu-card { transition: border-color 0.2s; }
        .contact-link:hover { color: ${accent} !important; border-color: ${accent} !important; }
        .contact-link { transition: color 0.2s, border-color 0.2s; }
        @media (max-width: 700px) {
          .stats-row { flex-direction: column !important; gap: 0 !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .edu-grid { grid-template-columns: 1fr !important; }
          .hero-h1 { font-size: 2.8rem !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1.1rem 3rem",
        background: css.navBg,
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${css.border}`,
        transition: "background 0.3s",
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: accent, letterSpacing: "0.12em" }}>
          DCB.dev
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {sections.map(s => (
            <button key={s} className="nav-link btn" onClick={() => scrollTo(s)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontSize: 12,
              color: active === s ? accent : css.muted,
              letterSpacing: "0.05em",
              padding: 0,
            }}>
              {t.nav[s]}
            </button>
          ))}

          {/* Lang toggle */}
          <button className="btn" onClick={() => setLang(l => l === "es" ? "en" : "es")} style={{
            background: css.bg3, border: `1px solid ${css.border}`,
            borderRadius: 4, padding: "4px 10px",
            fontFamily: "'Space Mono', monospace", fontSize: 11,
            color: css.muted, cursor: "pointer", letterSpacing: "0.08em",
          }}>
            {lang === "es" ? "EN" : "ES"}
          </button>

          {/* Dark/Light toggle */}
          <button className="btn" onClick={() => setDark(d => !d)} style={{
            background: css.bg3, border: `1px solid ${css.border}`,
            borderRadius: 4, width: 34, height: 28,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 14,
          }}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "9rem 3rem 4rem",
        position: "relative", overflow: "hidden",
        maxWidth: 1100, margin: "0 auto",
      }}>
        {/* Grid bg */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${dark ? "rgba(0,229,160,0.025)" : "rgba(0,100,60,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(0,229,160,0.025)" : "rgba(0,100,60,0.04)"} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }} />
        {/* Glow */}
        <div style={{
          position: "absolute", width: 700, height: 700, borderRadius: "50%",
          background: `radial-gradient(circle, ${dark ? "rgba(0,119,255,0.07)" : "rgba(0,119,255,0.04)"} 0%, transparent 70%)`,
          top: -150, right: -150, pointerEvents: "none",
        }} />

        <div className="fade-up" style={{
          fontFamily: "'Space Mono', monospace", fontSize: 12,
          color: accent, letterSpacing: "0.2em", textTransform: "uppercase",
          marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem",
        }}>
          <div style={{ width: 32, height: 1, background: accent }} />
          <span style={{ animation: "pulse 2.5s ease-in-out infinite" }}>◉</span>
          {t.hero.available}
        </div>

        <h1 className="hero-h1 fade-up delay-1" style={{
          fontSize: "clamp(3rem, 7vw, 5.8rem)", fontWeight: 800,
          lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "0.3rem",
        }}>
          Damian
        </h1>
        <h1 className="hero-h1 fade-up delay-2" style={{
          fontSize: "clamp(3rem, 7vw, 5.8rem)", fontWeight: 800,
          lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "1.2rem",
          color: accent,
        }}>
          Coronel
        </h1>

        <div className="fade-up delay-2" style={{
          fontFamily: "'Space Mono', monospace", fontSize: 13,
          color: accent2, marginBottom: "0.4rem", letterSpacing: "0.04em",
        }}>
          {t.hero.role}
        </div>

        <p className="fade-up delay-3" style={{
          fontFamily: "'Space Mono', monospace", fontSize: 13,
          color: css.muted, marginBottom: "2.5rem", maxWidth: 480, lineHeight: 1.9,
        }}>
          {t.hero.sub}
        </p>

        <div className="fade-up delay-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button className="btn" onClick={() => scrollTo("projects")} style={{
            padding: "0.75rem 1.75rem", background: accent,
            color: "#0a0c10", fontFamily: "'Space Mono', monospace",
            fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
            border: "none", borderRadius: 2,
          }}>{t.hero.cta1}</button>
          <button className="btn" onClick={() => scrollTo("contact")} style={{
            padding: "0.75rem 1.75rem", background: "transparent",
            color: css.text, fontFamily: "'Space Mono', monospace",
            fontSize: 13, letterSpacing: "0.08em",
            border: `1px solid ${css.border}`, borderRadius: 2,
          }}>{t.hero.cta2}</button>
        </div>

        {/* Stats */}
        <div className="stats-row" style={{
          display: "flex", gap: 0, marginTop: "5rem",
          borderTop: `1px solid ${css.border}`, paddingTop: "2rem", flexWrap: "wrap",
        }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ flex: 1, minWidth: 140, padding: "1.25rem 1rem 1.25rem 0" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "2rem", fontWeight: 700, color: accent, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: css.muted, marginTop: 6, letterSpacing: "0.04em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "6rem 3rem", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>{t.about.label}</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          <div>
            <p style={{ color: css.muted, lineHeight: 1.85, marginBottom: "1.25rem", fontSize: 15 }}>{t.about.p1}</p>
            <p style={{ color: css.muted, lineHeight: 1.85, marginBottom: "1.25rem", fontSize: 15 }}>{t.about.p2}</p>
            <p style={{ color: css.muted, lineHeight: 1.85, fontSize: 15 }}>{t.about.p3}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              ["📍", "Buenos Aires, Argentina"],
              ["📧", "danielcoronelburgos1993@gmail.com"],
              ["📱", "+54 381-448-1920"],
              ["💼", "linkedin.com/in/damian-coronel-burgos"],
              ["🌐", lang === "es" ? "Inglés B1" : "English B1"],
            ].map(([icon, val], i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "0.85rem 1.25rem",
                background: css.bg2, border: `1px solid ${css.border}`,
                borderRadius: 6,
              }}>
                <span style={{ fontSize: 15 }}>{icon}</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: css.muted }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "6rem 3rem", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>{t.skills.label}</SectionLabel>
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.1rem" }}>
          {t.skillGroups.map((g, i) => (
            <div key={i} className="skill-card" style={{
              background: css.bg2, border: `1px solid ${css.border}`,
              borderRadius: 8, padding: "1.5rem",
            }}>
              <div style={{
                width: 38, height: 38, background: "rgba(0,229,160,0.07)",
                border: "1px solid rgba(0,229,160,0.18)",
                borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "0.9rem", fontSize: 16,
              }}>{g.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: "0.75rem", color: css.text }}>{g.title}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {g.tags.map(t2 => <Tag key={t2}>{t2}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "6rem 3rem", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>{t.projects.label}</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {t.projectList.map((p) => (
            <div key={p.id} className="project-card" style={{
              background: css.bg2,
              border: `1px solid ${p.highlight ? "rgba(0,119,255,0.3)" : css.border}`,
              borderLeft: `3px solid ${p.highlight ? accent2 : accent}`,
              borderRadius: 8, padding: "2rem 2.5rem",
              position: "relative",
            }}>
              {p.highlight && (
                <div style={{
                  position: "absolute", top: "1.25rem", right: "1.5rem",
                  fontFamily: "'Space Mono', monospace", fontSize: 10,
                  color: accent2, background: "rgba(0,119,255,0.1)",
                  border: "1px solid rgba(0,119,255,0.25)",
                  padding: "3px 10px", borderRadius: 4, letterSpacing: "0.1em",
                }}>FEATURED</div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontSize: "1.15rem", fontWeight: 700, color: css.text, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.statusColor, animation: p.statusColor === "#f59e0b" ? "pulse 2s ease-in-out infinite" : "none" }} />
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: p.statusColor }}>{p.status}</span>
                  </div>
                </div>
              </div>
              <p style={{ color: css.muted, fontSize: 14, lineHeight: 1.75, marginBottom: "1.25rem" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.map(tg => <Tag key={tg} accent>{tg}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" style={{ padding: "6rem 3rem", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>{t.education.label}</SectionLabel>
        <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1rem" }}>
          {t.eduList.map((e, i) => (
            <div key={i} className="edu-card" style={{
              background: css.bg2, border: `1px solid ${css.border}`,
              borderRadius: 8, padding: "1.25rem 1.5rem",
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4, marginBottom: 6, color: css.text }}>{e.name}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: accent2 }}>{e.inst}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: css.muted, marginTop: 5 }}>{e.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "6rem 3rem", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>{t.contact.label}</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.75rem" }}>{t.contact.title}</h2>
            <p style={{ color: css.muted, fontFamily: "'Space Mono', monospace", fontSize: 13, lineHeight: 1.8, marginBottom: "2rem" }}>{t.contact.sub}</p>
            {[
              { icon: "✉", val: "danielcoronelburgos1993@gmail.com", href: "mailto:danielcoronelburgos1993@gmail.com" },
              { icon: "in", val: "linkedin.com/in/damian-coronel-burgos", href: "https://www.linkedin.com/in/damian-coronel-burgos" },
              { icon: "☎", val: "+54 381-448-1920", href: "tel:+5438144481920" },
            ].map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noreferrer" className="contact-link" style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "0.7rem 1.25rem", border: `1px solid ${css.border}`,
                borderRadius: 6, marginBottom: 10, color: css.muted,
                fontFamily: "'Space Mono', monospace", fontSize: 12,
              }}>
                <span style={{ fontSize: 13, minWidth: 16, textAlign: "center" }}>{c.icon}</span>
                {c.val}
              </a>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { key: "name", label: t.contact.name, type: "text" },
              { key: "email", label: t.contact.email, type: "email" },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: css.muted, letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>{label}</label>
                <input
                  type={type}
                  required
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{
                    width: "100%", padding: "0.65rem 1rem",
                    background: css.bg2, border: `1px solid ${css.border}`,
                    borderRadius: 6, color: css.text,
                    fontFamily: "'Space Mono', monospace", fontSize: 13,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = accent}
                  onBlur={e => e.target.style.borderColor = css.border}
                />
              </div>
            ))}
            <div>
              <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: css.muted, letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>{t.contact.message}</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{
                  width: "100%", padding: "0.65rem 1rem",
                  background: css.bg2, border: `1px solid ${css.border}`,
                  borderRadius: 6, color: css.text,
                  fontFamily: "'Space Mono', monospace", fontSize: 13,
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = accent}
                onBlur={e => e.target.style.borderColor = css.border}
              />
            </div>
            <button type="submit" className="btn" style={{
              padding: "0.8rem 2rem",
              background: sent ? "#10b981" : accent,
              color: "#0a0c10", fontFamily: "'Space Mono', monospace",
              fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
              border: "none", borderRadius: 4, alignSelf: "flex-start",
              transition: "background 0.3s, opacity 0.2s, transform 0.15s",
            }}>
              {sent ? (lang === "es" ? "¡Enviado! ✓" : "Sent! ✓") : t.contact.send}
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: `1px solid ${css.border}`, padding: "2rem 3rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "1rem", maxWidth: 1100, margin: "0 auto",
      }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: css.muted }}>
          © 2026 Damian Coronel Burgos <span style={{ color: accent }}>·</span> Buenos Aires
        </p>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: css.muted }}>
          {t.footer}
        </p>
      </footer>
    </div>
  );
}
