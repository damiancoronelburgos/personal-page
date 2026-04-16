import { useLang } from "../../contexts/LangContext";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © 2026 Damian Coronel Burgos{" "}
        <span className={styles.dot}>·</span> Buenos Aires
      </p>
      <p className={styles.text}>{t.footer}</p>
    </footer>
  );
}
