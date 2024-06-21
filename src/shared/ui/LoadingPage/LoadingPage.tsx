import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import type { FC, ReactElement } from 'react';
import styles from './LoadingPage.module.scss';
import { variants } from './LoadingPage.variants';

interface LoadingPageProps {
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
      <FontAwesomeIcon icon={faFireFlameCurved} className={styles.icon} />
    </motion.div>
  );
};
