import type { Variants } from 'framer-motion';

export const variants: Variants = {
  initial: { scale: 0.9 },
  animate: { scale: 1 },
};

export const mobileVariants: Variants = {
  initial: { y: '100%' },
  animate: { y: 0 },
};
