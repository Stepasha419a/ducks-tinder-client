import type { FC } from 'react';
import { useState } from 'react';
import { useAnimationControls } from 'framer-motion';
import classNames from 'classnames';
import { useAppSelector, useMediaQuery } from '@/shared/lib/hooks';
import { RateButtons, SwipeUser } from '@/features/user/ui';
import { Failed } from './components';
import styles from './TinderUser.module.scss';
import { Explore } from '@/entities/user/ui';

interface TinderUserProps {
  explore?: boolean;
}

export const TinderUser: FC<TinderUserProps> = ({ explore }) => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const isFailed = useAppSelector((state: RootState) => state.tinder.isFailed);

  const [isFullPreview, setIsFullPreview] = useState(false);

  const controls = useAnimationControls();

  const cn = classNames(
    styles.wrapper,
    isMobile && styles.mobile,
    explore && styles.explore
  );
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
      {explore && <Explore />}
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
