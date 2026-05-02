import { useLang } from "../../contexts/LangContext";
import useInView from "../../hooks/useInView";
import SectionLabel from "../ui/SectionLabel";
import styles from "./About.module.css";

const PHOTO = null; // Reemplazar con: import photo from "../../assets/photo.jpg"

const META_ES = [
  { label: "Ubicación",     value: "Buenos Aires, AR" },
  { label: "Disponibilidad", value: "Disponible" },
  { label: "Idiomas",       value: "ES nativo · EN B1" },
];

const META_EN = [
  { label: "Location",      value: "Buenos Aires, AR" },
  { label: "Availability",  value: "Available" },
  { label: "Languages",     value: "ES native · EN B1" },
];

export default function About() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView();
  const meta = lang === "es" ? META_ES : META_EN;

  return (
    <section id="about" className={styles.section}>
      <SectionLabel title={t.nav.about}>{t.about.label}</SectionLabel>
      <div
        ref={ref}
        className={`${styles.grid} ${inView ? styles.visible : ""}`}
      >
        {/* ── Bio ── */}
        <div className={styles.bio}>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>

        {/* ── Foto + meta ── */}
        <div className={styles.profile}>
          <div className={styles.photoWrap}>
            {PHOTO ? (
              <img src={PHOTO} alt="Damian Coronel" className={styles.photo} />
            ) : (
              <div className={styles.photoPlaceholder} aria-hidden="true">
                <span className={styles.initials}>DCB</span>
              </div>
            )}
          </div>

          <ul className={styles.metaList}>
            {meta.map(({ label, value }, i) => (
              <li
                key={i}
                className={styles.metaItem}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className={styles.metaLabel}>{label}</span>
                <span className={styles.metaValue}>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
