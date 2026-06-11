import { useState } from "react";
import { useLang } from "../../contexts/LangContext";
import useInView from "../../hooks/useInView";
import SectionLabel from "../ui/SectionLabel";
import styles from "./Contact.module.css";

const CONTACT_LINKS = [
  {
    icon: "✉",
    val: "danielcoronelburgos1993@gmail.com",
    href: "mailto:danielcoronelburgos1993@gmail.com",
  },
  {
    icon: "in",
    val: "linkedin.com/in/damian-coronel-burgos",
    href: "https://www.linkedin.com/in/damian-coronel-burgos",
  },
  { icon: "☎", val: "+54 381-448-1920", href: "https://wa.me/5438144481920" },
];

const FORMSPREE_ID = "xaqzpyon";

export default function Contact() {
  const { lang, t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <SectionLabel title={t.nav.contact}>{t.contact.label}</SectionLabel>

      <div
        ref={ref}
        className={`${styles.grid} ${inView ? styles.visible : ""}`}
      >
        {/* Info */}
        <div className={styles.info}>
          <p className={styles.sub}>{t.contact.sub}</p>
          <div className={styles.links}>
            {CONTACT_LINKS.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
                style={{ transitionDelay: inView ? `${i * 60}ms` : "0ms" }}
              >
                <span className={styles.linkIcon}>{c.icon}</span>
                {c.val}
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSend} className={styles.form}>
          {[
            { key: "name",  label: t.contact.name,  type: "text"  },
            { key: "email", label: t.contact.email, type: "email" },
          ].map(({ key, label, type }) => (
            <div key={key} className={styles.field}>
              <label className={styles.label}>{label}</label>
              <input
                type={type}
                required
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className={styles.input}
              />
            </div>
          ))}
          <div className={styles.field}>
            <label className={styles.label}>{t.contact.message}</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            className={`${styles.submitBtn} ${sent ? styles.sent : ""} ${error ? styles.error : ""}`}
            disabled={loading}
          >
            {loading
              ? lang === "es" ? "Enviando..." : "Sending..."
              : sent
              ? lang === "es" ? "¡Enviado! ✓" : "Sent! ✓"
              : error
              ? lang === "es" ? "Error al enviar" : "Error sending"
              : t.contact.send}
          </button>
        </form>
      </div>
    </section>
  );
}
