import { useState } from 'react';
import { useAnimationControls } from 'framer-motion';
import classNames from 'classnames';
import { useAppSelector, useMediaQuery } from '@/shared/lib/hooks';
import { RateButtons, SwipeUser } from '@/features/user';
import { Failed } from './components';
import styles from './TinderUser.module.scss';

export const TinderUser = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const isFailed = useAppSelector((state: RootState) => state.tinder.isFailed);

  const [isFullPreview, setIsFullPreview] = useState(false);

  const controls = useAnimationControls();

  const cn = classNames(styles.wrapper, isMobile && styles.mobile);
  if (isFailed) {
    return (
      <div className={cn}>
        <div className={styles.users}>
          <Failed />
        </div>
      </div>
    );
  }

  return (
    <div className={cn}>
      <div className={styles.users}>
        <SwipeUser
          isFullPreview={isFullPreview}
          setIsFullPreview={setIsFullPreview}
          controls={controls}
        >
          <RateButtons isFullPreview={isFullPreview} controls={controls} />
        </SwipeUser>
      </div>
    </div>
  );
};
