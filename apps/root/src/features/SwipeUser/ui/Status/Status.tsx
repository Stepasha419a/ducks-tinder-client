import type { FC } from 'react';
import classNames from 'classnames';
import type { MotionValue } from 'motion/react';
import { motion } from 'motion/react';

import * as styles from './Status.module.scss';
import { useSwipeStyles } from '@entities/user';

interface StatusProps {
  isFullPreview: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export const Status: FC<StatusProps> = ({ isFullPreview, x, y }) => {
  const { statusStyles } = useSwipeStyles(x, y);

  return (
    <div className={classNames(styles.wrapper, !isFullPreview && styles.grab)}>
      <motion.div
        style={statusStyles.dislikeStyle}
        className={classNames(styles.status, styles.red)}
      >
        DISLIKE
      </motion.div>
      <motion.div
        style={statusStyles.likeStyle}
        className={classNames(styles.status, styles.green)}
      >
        LIKE
      </motion.div>
      <motion.div
        style={statusStyles.superLikeStyle}
        className={classNames(styles.status, styles.blue)}
      >
        SUPER LIKE
      </motion.div>
    </div>
  );
};
