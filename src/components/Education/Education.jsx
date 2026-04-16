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
      <div ref={ref} className={`${styles.list} ${inView ? styles.visible : ""}`}>
        {t.eduList.map((edu, i) => (
          <div
            key={i}
            className={styles.row}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <div className={styles.name}>{edu.name}</div>
            <div className={styles.inst}>{edu.inst}</div>
            <div className={styles.year}>{edu.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
