import type { ReactElement } from 'react';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '@hooks';
import styles from './Loading.module.scss';

const variants: Variants = {
  visible: { opacity: 1, visibility: 'visible' },
  hidden: { opacity: 0, visibility: 'hidden', transition: { duration: 0.5 } },
};

export const Loading = (): ReactElement => {
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  return (
    <motion.div
      initial={'visible'}
      variants={variants}
      animate={isLoading ? 'visible' : 'hidden'}
      className={styles.loadingPage}
    >
      <FontAwesomeIcon icon={faFireFlameCurved} className={styles.icon} />
    </motion.div>
  );
};
