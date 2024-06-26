import classNames from 'classnames';
import type { FC } from 'react';
import { SwipeUser } from '@features/user';
import { Explore } from '@entities/user';
import { useAppSelector, useAdaptiveMediaQuery } from '@shared/lib/hooks';
import styles from './TinderUser.module.scss';
import { Failed } from './ui';

interface TinderUserProps {
  explore?: boolean;
}

export const TinderUser: FC<TinderUserProps> = ({ explore }) => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const isFailed = useAppSelector((state: RootState) => state.tinder.isFailed);

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
        <SwipeUser />
      </div>
    </div>
  );
};
