import { useLang } from "../../contexts/LangContext";
import useInView from "../../hooks/useInView";
import SectionLabel from "../ui/SectionLabel";
import styles from "./About.module.css";

export default function About() {
  const { t } = useLang();
  const [ref, inView] = useInView();

  return (
    <section id="about" className={styles.section}>
      <SectionLabel title={t.nav.about}>{t.about.label}</SectionLabel>
      <div
        ref={ref}
        className={`${styles.bio} ${inView ? styles.visible : ""}`}
      >
        <p>{t.about.p1}</p>
        <p>{t.about.p2}</p>
        <p>{t.about.p3}</p>
      </div>
    </section>
  );
}
