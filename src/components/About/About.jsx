import { useLang } from "../../contexts/LangContext";
import useInView from "../../hooks/useInView";
import SectionLabel from "../ui/SectionLabel";
import styles from "./About.module.css";

export default function About() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView();

  const contactItems = [
    ["📍", "Buenos Aires, Argentina"],
    ["📧", "danielcoronelburgos1993@gmail.com"],
    ["📱", "+54 381-448-1920"],
    ["💼", "linkedin.com/in/damian-coronel-burgos"],
    ["🌐", lang === "es" ? "Inglés B1" : "English B1"],
  ];

  return (
    <section id="about" className={styles.section}>
      <SectionLabel title={t.nav.about}>{t.about.label}</SectionLabel>
      <div
        ref={ref}
        className={`${styles.grid} ${inView ? styles.visible : ""}`}
      >
        <div className={styles.bio}>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>
        <div className={styles.info}>
          {contactItems.map(([icon, val], i) => (
            <div
              key={i}
              className={styles.infoItem}
              style={{ transitionDelay: `${i * 55}ms` }}
            >
              <span className={styles.icon}>{icon}</span>
              <span className={styles.value}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
