import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '@shared/lib/hooks';
import { variants } from './Loading.variants';
import styles from './Loading.module.scss';

export const Loading = (): ReactElement => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <motion.div
      initial={'visible'}
      variants={variants}
      animate={isAuth === null ? 'visible' : 'hidden'}
      className={styles.loadingPage}
    >
      <FontAwesomeIcon icon={faFireFlameCurved} className={styles.icon} />
    </motion.div>
  );
};
