import { useLang } from "../../contexts/LangContext";
import useInView from "../../hooks/useInView";
import SectionLabel from "../ui/SectionLabel";
import styles from "./Skills.module.css";

export default function Skills() {
  const { t } = useLang();
  const [ref, inView] = useInView();

  return (
    <section id="skills" className={styles.section}>
      <SectionLabel title={t.nav.skills}>{t.skills.label}</SectionLabel>
      <div ref={ref} className={`${styles.list} ${inView ? styles.visible : ""}`}>
        {t.skillGroups.map((group, i) => (
          <div
            key={i}
            className={styles.row}
            style={{ transitionDelay: `${i * 55}ms` }}
          >
            <div className={styles.category}>{group.title}</div>
            <div className={styles.skills}>
              {group.tags.map((tag, j) => (
                <span key={tag} className={styles.skillWrap}>
                  <span className={styles.skill}>{tag}</span>
                  {j < group.tags.length - 1 && (
                    <span className={styles.sep} aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
