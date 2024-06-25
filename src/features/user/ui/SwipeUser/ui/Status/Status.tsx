import classNames from 'classnames';
import type { MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';
import type { FC } from 'react';
import styles from './Status.module.scss';

interface StatusProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export const Status: FC<StatusProps> = ({ x, y }) => {
  const dislikeStatusOpacity = useTransform(x, [-100, -40], [1, 0]);
  const likeStatusOpacity = useTransform(x, [40, 100], [0, 1]);
  const superLikeStatusOpacity = useTransform(y, (yValue) => {
    const xValue = x.get();
    if (xValue <= 35 && xValue >= -35) {
      return yValue / -60;
    }
    return 0;
  });

  return (
    <>
      <motion.div
        style={{ opacity: dislikeStatusOpacity }}
        className={classNames(styles.status, styles.red)}
      >
        DISLIKE
      </motion.div>
      <motion.div
        style={{ opacity: likeStatusOpacity }}
        className={classNames(styles.status, styles.green)}
      >
        LIKE
      </motion.div>
      <motion.div
        style={{ opacity: superLikeStatusOpacity }}
        className={classNames(styles.status, styles.blue)}
      >
        SUPER LIKE
      </motion.div>
    </>
  );
};
