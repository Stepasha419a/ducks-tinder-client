import { useState } from 'react';
import { useAnimationControls } from 'framer-motion';
import classNames from 'classnames';
import { useAppSelector, useMediaQuery } from '@/shared/lib/hooks';
import { RateButtons, SwipeUser } from '@/features/tinder';
import { Failed } from './components';
import styles from './TinderUser.module.scss';

export const TinderUser = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const isFailed = useAppSelector((state: RootState) => state.tinder.isFailed);

  const [isFullPreview, setIsFullPreview] = useState(false);

  const controls = useAnimationControls();

  if (isFailed) {
    return <Failed />;
  }

  return (
    <div className={classNames(styles.wrapper, isMobile && styles.mobile)}>
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
