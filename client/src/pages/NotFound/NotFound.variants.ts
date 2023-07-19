export const contentVariants = {
  hover: {
    scale: 1.1,
  },
  initial: {
    scale: 1,
  },
};

export const imgVariants = {
  hover: {
    rotate: 360,
  },
  initial: {
    rotate: 0,
  },
};

export const lineVariants = {
  hover: {
    width: '4px',
    height: '64px',
    background:
      'linear-gradient( 5deg, var(--color--pink-100), var(--color--orange-90))',
    transition: { duration: 0.1 },
  },
  initial: {
    width: '2px',
    height: '58px',
    backgroundColor: '#ccc',
    transition: { duration: 0.1 },
  },
};
