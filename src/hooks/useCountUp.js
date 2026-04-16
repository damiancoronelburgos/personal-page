import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `end` over `duration` ms.
 * Only starts when `active` turns true.
 */
export default function useCountUp(end, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active || end <= 0) return;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, end, duration]);

  return count;
}
