import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useLang } from "../../contexts/LangContext";
import useCountUp from "../../hooks/useCountUp";
import { fadeUp, stagger, ease } from "../../motion";
import styles from "./Hero.module.css";

/* Parse "+1000" → { prefix:"+", num:1000, suffix:"" } */
function parseStat(str) {
  const m = str.match(/^(\D*)(\d+)(\D*.*)$/);
  if (!m) return { prefix: "", num: 0, suffix: str };
  return { prefix: m[1], num: parseInt(m[2], 10), suffix: m[3] };
}

function StatItem({ stat, active }) {
  const { prefix, num, suffix } = parseStat(stat.num);
  const count = useCountUp(num, 1600, active);
  return (
    <motion.div className={styles.stat} variants={fadeUp}>
      <div className={styles.statNum}>
        {prefix}{count}{suffix}
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </motion.div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const statsRef = useRef(null);
  const statsVisible = useInView(statsRef, { once: true, amount: 0.3 });

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className={styles.hero}>
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.orb1}  aria-hidden="true" />
      <div className={styles.orb2}  aria-hidden="true" />

      {/* ── Main content — stagger in on mount ──────────────────────────── */}
      <motion.div
        variants={stagger(0.12, 0.1)}
        initial="hidden"
        animate="show"
        className={styles.content}
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className={styles.badge}>
          <span className={styles.badgeDot} />
          {t.hero.available}
        </motion.div>

        {/* Name */}
        <motion.h1 variants={fadeUp} className={styles.name}>Damian</motion.h1>
        <motion.h1 variants={fadeUp} className={styles.nameAccent}>Coronel</motion.h1>

        {/* Typewriter role */}
        <motion.div variants={fadeUp} className={styles.role}>
          <TypeAnimation
            sequence={t.hero.roles}
            speed={46}
            deletionSpeed={68}
            repeat={Infinity}
            cursor
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p variants={fadeUp} className={styles.sub}>{t.hero.sub}</motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className={styles.ctas}>
          <button className={styles.btnPrimary}  onClick={() => scrollTo("projects")}>
            {t.hero.cta1}
          </button>
          <button className={styles.btnSecondary} onClick={() => scrollTo("contact")}>
            {t.hero.cta2}
          </button>
        </motion.div>
      </motion.div>

      {/* ── Stats — count up when in view ───────────────────────────────── */}
      <motion.div
        ref={statsRef}
        className={styles.stats}
        variants={stagger(0.09)}
        initial="hidden"
        animate={statsVisible ? "show" : "hidden"}
      >
        {t.stats.map((s, i) => (
          <StatItem key={i} stat={s} active={statsVisible} />
        ))}
      </motion.div>
    </section>
  );
}
