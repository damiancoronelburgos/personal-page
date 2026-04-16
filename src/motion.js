// Shared Framer Motion variants used across the portfolio

export const ease = [0.16, 1, 0.3, 1]; // expo-out

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease },
  },
};

export const stagger = (delay = 0.07, children = 0.1) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: delay,
      delayChildren: children,
    },
  },
});
