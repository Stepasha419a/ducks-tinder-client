import type { FC } from 'react';
import classNames from 'classnames';
import type { MotionValue } from 'motion/react';
import { motion } from 'motion/react';

import * as styles from './Status.module.scss';
import { useSwipeStyles } from '@entities/user';
import { useTranslation } from 'react-i18next';

interface StatusProps {
  isFullPreview: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export const Status: FC<StatusProps> = ({ isFullPreview, x, y }) => {
  const { t } = useTranslation();

  const { statusStyles } = useSwipeStyles(x, y);

  return (
    <div className={classNames(styles.wrapper, !isFullPreview && styles.grab)}>
      <motion.div
        style={statusStyles.dislikeStyle}
        className={classNames(styles.status, styles.red)}
      >
        {t('tinder.dislike')}
      </motion.div>
      <motion.div
        style={statusStyles.likeStyle}
        className={classNames(styles.status, styles.green)}
      >
        {t('tinder.like')}
      </motion.div>
      <motion.div
        style={statusStyles.superLikeStyle}
        className={classNames(styles.status, styles.blue)}
      >
        {t('tinder.superLike')}
      </motion.div>
    </div>
  );
};
