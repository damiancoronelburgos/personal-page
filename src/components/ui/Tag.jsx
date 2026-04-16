import styles from "./Tag.module.css";

export default function Tag({ children, accent }) {
  return (
    <span className={`${styles.tag} ${accent ? styles.accent : ""}`}>
      {children}
    </span>
  );
}
