import classNames from 'classnames';
import type { FC } from 'react';
import { SwipeUser } from '@features/user';
import { Explore } from '@entities/user';
import { useAdaptiveMediaQuery } from '@shared/lib';
import styles from './TinderUser.module.scss';

interface TinderUserProps {
  explore?: boolean;
}

export const TinderUser: FC<TinderUserProps> = ({ explore }) => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  return (
    <div
      className={classNames(
        styles.wrapper,
        isMobile && styles.mobile,
        explore && styles.explore
      )}
    >
      {explore && <Explore />}
      <div className={styles.users}>
        <SwipeUser />
      </div>
    </div>
  );
};
