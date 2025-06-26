import type { FC } from 'react';
import classNames from 'classnames';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import { Explore } from '@entities/user';

import * as styles from './TinderUser.module.scss';
import { SwipeUser } from '@features/SwipeUser';
import { RateButtons } from '@features/RateButtons';
import { useAnimationActions } from '../lib';

interface TinderUserProps {
  explore?: boolean;
}

export const TinderUser: FC<TinderUserProps> = ({ explore }) => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const {
    isFullPreview,
    onAnimation,
    onChangeX,
    onChangeY,
    onSubmit,
    overriddenAnimation,
    setIsFullPreview,
    tinderUsers,
    x,
    y,
  } = useAnimationActions();

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
        {tinderUsers.toReversed().map((user, index) => {
          const isActive = index === tinderUsers.length - 1;

          return (
            <SwipeUser
              overriddenAnimation={overriddenAnimation}
              key={user.id}
              user={user}
              disabled={!isActive}
              isFullPreview={isFullPreview}
              setIsFullPreview={setIsFullPreview}
              onChangeX={isActive ? onChangeX : undefined}
              onChangeY={isActive ? onChangeY : undefined}
              onSubmit={onSubmit}
            />
          );
        })}
      </div>
    </div>
  );
};
