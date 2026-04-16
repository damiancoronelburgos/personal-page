import { useLang } from "../../contexts/LangContext";
import useInView from "../../hooks/useInView";
import SectionLabel from "../ui/SectionLabel";
import styles from "./Projects.module.css";

function ProjectItem({ project, index, inView }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      className={`${styles.item} ${inView ? styles.visible : ""}`}
      style={{ transitionDelay: `${index * 90}ms` }}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight glow */}
      <div className={styles.spotlight} aria-hidden="true" />

      <div className={styles.index}>0{index + 1}</div>

      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.name}>{project.name}</h3>
          <span
            className={styles.status}
            style={{ color: project.statusColor }}
          >
            {project.status}
          </span>
        </div>
        <p className={styles.desc}>{project.desc}</p>
        <div className={styles.tech}>
          {project.tags.map((tag, j) => (
            <span key={tag} className={styles.techWrap}>
              <span className={styles.techItem}>{tag}</span>
              {j < project.tags.length - 1 && (
                <span className={styles.sep} aria-hidden="true">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLang();
  const [ref, inView] = useInView();

  return (
    <section id="projects" className={styles.section}>
      <SectionLabel title={t.nav.projects}>{t.projects.label}</SectionLabel>
      <div ref={ref} className={styles.list}>
        {t.projectList.map((project, i) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={i}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
}
