import type { FC, ReactElement } from 'react';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { variants } from './LoadingPage.variants';
import styles from './LoadingPage.module.scss';

export interface LoadingPageProps {
  visible?: boolean;
  duration?: number;
}

export const LoadingPage: FC<LoadingPageProps> = ({
  visible,
  duration = 0.5,
}): ReactElement => {
  return (
    <motion.div
      initial={'visible'}
      variants={variants}
      transition={{ duration }}
      animate={visible ? 'visible' : 'hidden'}
      className={styles.loadingPage}
    >
      <div className={classNames(styles.background, styles.animate)}></div>
      <FontAwesomeIcon icon={faFeather} className={styles.icon} />
    </motion.div>
  );
};
