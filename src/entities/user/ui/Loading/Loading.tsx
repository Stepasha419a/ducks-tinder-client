import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import type { ReactElement } from 'react';
import { useAppSelector } from '@shared/lib/hooks';
import styles from './Loading.module.scss';
import { variants } from './Loading.variants';

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
