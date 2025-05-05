import type { FC } from 'react';
import classNames from 'classnames';
import type { MotionStyle } from 'framer-motion';
import { motion } from 'framer-motion';

import styles from './Status.module.scss';

interface StatusProps {
  dislikeStyle: MotionStyle;
  superLikeStyle: MotionStyle;
  likeStyle: MotionStyle;
  isFullPreview: boolean;
}

export const Status: FC<StatusProps> = ({
  dislikeStyle,
  superLikeStyle,
  likeStyle,
  isFullPreview,
}) => {
  return (
    <div className={classNames(styles.wrapper, !isFullPreview && styles.grab)}>
      <motion.div
        style={dislikeStyle}
        className={classNames(styles.status, styles.red)}
      >
        DISLIKE
      </motion.div>
      <motion.div
        style={likeStyle}
        className={classNames(styles.status, styles.green)}
      >
        LIKE
      </motion.div>
      <motion.div
        style={superLikeStyle}
        className={classNames(styles.status, styles.blue)}
      >
        SUPER LIKE
      </motion.div>
    </div>
  );
};
