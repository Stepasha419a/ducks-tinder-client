import classNames from 'classnames';
import type { MotionValue } from 'framer-motion';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useSwipeStatusStyle } from '@features/user';
import styles from './Status.module.scss';

interface StatusProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export const Status: FC<StatusProps> = ({ x, y }) => {
  const { dislikeStyle, superLikeStyle, likeStyle } = useSwipeStatusStyle(x, y);

  return (
    <>
      <motion.div
        style={dislikeStyle}
        className={classNames(styles.status, styles.red)}
      >
        DISLIKE
      </motion.div>
      <motion.div
        style={superLikeStyle}
        className={classNames(styles.status, styles.green)}
      >
        LIKE
      </motion.div>
      <motion.div
        style={likeStyle}
        className={classNames(styles.status, styles.blue)}
      >
        SUPER LIKE
      </motion.div>
    </>
  );
};
