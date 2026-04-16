import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useLang } from "../../contexts/LangContext";
import SectionLabel from "../ui/SectionLabel";
import styles from "./Education.module.css";

export default function Education() {
  const { t } = useLang();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section id="education" className={styles.section}>
      <SectionLabel title={t.nav.education}>{t.education.label}</SectionLabel>

      <div className={styles.carouselWrap}>
        {/* Custom navigation buttons */}
        <button ref={prevRef} className={`${styles.navBtn} ${styles.navPrev}`} aria-label="Anterior">
          ←
        </button>
        <button ref={nextRef} className={`${styles.navBtn} ${styles.navNext}`} aria-label="Siguiente">
          →
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{ clickable: true, el: `.${styles.pagination}` }}
          autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          spaceBetween={20}
          slidesPerView={3}
          loop
          grabCursor
          breakpoints={{
            0:   { slidesPerView: 1, spaceBetween: 16 },
            580: { slidesPerView: 2, spaceBetween: 18 },
            900: { slidesPerView: 3, spaceBetween: 20 },
          }}
          className={styles.swiper}
        >
          {t.eduList.map((edu, i) => (
            <SwiperSlide key={i}>
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.cardYear}>{edu.year}</span>
                  <span className={styles.cardIndex}>0{i + 1}</span>
                </div>
                <p className={styles.cardName}>{edu.name}</p>
                <div className={styles.cardBottom}>
                  <span className={styles.cardInst}>{edu.inst}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots */}
        <div className={styles.pagination} />
      </div>
    </section>
  );
}
