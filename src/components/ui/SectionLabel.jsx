import useInView from "../../hooks/useInView";
import styles from "./SectionLabel.module.css";

/**
 * @param {string} children  – small mono descriptor  (e.g. "STACK & HABILIDADES")
 * @param {string} title     – large display heading   (e.g. "Habilidades")
 */
export default function SectionLabel({ children, title }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`${styles.wrapper} ${inView ? styles.visible : ""}`}>
      <div className={styles.label}>
        {children}
        <div className={styles.line} />
      </div>
      {title && <h2 className={styles.title}>{title}</h2>}
    </div>
  );
}
