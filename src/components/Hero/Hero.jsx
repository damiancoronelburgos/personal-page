import { useLang } from "../../contexts/LangContext";
import useInView from "../../hooks/useInView";
import useCountUp from "../../hooks/useCountUp";
import styles from "./Hero.module.css";

/** Parse "+1000" → { prefix: "+", num: 1000, suffix: "" } */
function parseStat(str) {
  const match = str.match(/^(\D*)(\d+)(\D*.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: str };
  return { prefix: match[1], num: parseInt(match[2], 10), suffix: match[3] };
}

function StatItem({ stat, active }) {
  const { prefix, num, suffix } = parseStat(stat.num);
  const count = useCountUp(num, 1600, active);
  return (
    <div className={styles.stat}>
      <div className={styles.statNum}>
        {prefix}{count}{suffix}
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const [statsRef, statsVisible] = useInView({ threshold: 0.3 });

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className={styles.hero}>
      {/* Background elements */}
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.orb1}   aria-hidden="true" />
      <div className={styles.orb2}   aria-hidden="true" />

      {/* Badge */}
      <div className={`${styles.badge} fade-up`}>
        <div className={styles.badgeDot} />
        {t.hero.available}
      </div>

      {/* Name */}
      <h1 className={`${styles.name}       fade-up delay-1`}>Damian</h1>
      <h1 className={`${styles.nameAccent} fade-up delay-2`}>Coronel</h1>

      {/* Role */}
      <div className={`${styles.role} fade-up delay-2`}>{t.hero.role}</div>

      {/* Sub */}
      <p className={`${styles.sub} fade-up delay-3`}>{t.hero.sub}</p>

      {/* CTAs */}
      <div className={`${styles.ctas} fade-up delay-4`}>
        <button className={styles.btnPrimary}   onClick={() => scrollTo("projects")}>
          {t.hero.cta1}
        </button>
        <button className={styles.btnSecondary} onClick={() => scrollTo("contact")}>
          {t.hero.cta2}
        </button>
      </div>

      {/* Animated stats */}
      <div ref={statsRef} className={styles.stats}>
        {t.stats.map((s, i) => (
          <StatItem key={i} stat={s} active={statsVisible} />
        ))}
      </div>
    </section>
  );
}
