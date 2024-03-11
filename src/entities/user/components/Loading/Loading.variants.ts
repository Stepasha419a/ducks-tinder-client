import type { Variants } from 'framer-motion';

export const variants: Variants = {
  visible: { opacity: 1, visibility: 'visible' },
  hidden: { opacity: 0, visibility: 'hidden', transition: { duration: 0.5 } },
};
