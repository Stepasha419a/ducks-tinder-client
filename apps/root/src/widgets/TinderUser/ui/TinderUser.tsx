import type { FC } from 'react';
import classNames from 'classnames';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import { SwipeUser } from '@features/SwipeUser';
import { Explore } from '@entities/user';

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
