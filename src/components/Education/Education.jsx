import { useLang } from "../../contexts/LangContext";
import useInView from "../../hooks/useInView";
import SectionLabel from "../ui/SectionLabel";
import styles from "./Education.module.css";

export default function Education() {
  const { t } = useLang();
  const [ref, inView] = useInView();

  return (
    <section id="education" className={styles.section}>
      <SectionLabel title={t.nav.education}>{t.education.label}</SectionLabel>

      <div
        ref={ref}
        className={`${styles.grid} ${inView ? styles.visible : ""}`}
      >
        {t.eduList.map((edu, i) => (
          <div
            key={i}
            className={styles.card}
            style={{ transitionDelay: `${i * 45}ms` }}
          >
            <div className={styles.cardTop}>
              <span className={styles.cardYear}>{edu.year}</span>
              <span className={styles.cardIndex}>0{i + 1}</span>
            </div>
            <p className={styles.cardName}>{edu.name}</p>
            <div className={styles.cardBottom}>
              <span className={styles.cardInst}>{edu.inst}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
