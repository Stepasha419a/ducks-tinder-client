import type { Variants } from 'framer-motion';

export const chatPairsVariants: Variants = {
  slideOut: {
    x: '-340px',
  },
  slideIn: { x: 0 },
};

export const profileVariants: Variants = {
  slideOut: {
    x: '-340px',
    borderRight: '1px solid var(--border-main)',
  },
  slideIn: { x: 0, borderRight: '0', width: '100%' },
};
