import type { Variants } from 'framer-motion';

export const pairLinkVariants: Variants = {
  slideOut: { x: '-340px' },
  slideIn: { x: 0 },
};

export const chatListVariants: Variants = {
  slideOut: { x: '340px' },
  slideExit: { x: '-340px' },
  slideIn: { x: 0 },
};
