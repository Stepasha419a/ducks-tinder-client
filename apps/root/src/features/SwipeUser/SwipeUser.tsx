import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useEffect } from 'react';
import { getMatchUsersThunk, selectTinderData } from '@entities/user';
import { Preview } from '@entities/user';
import { useAppDispatch, useAppSelector } from '@shared/lib';
import { useSwipe } from './lib';
import { SwipeUserLazy } from './SwipeUser.lazy';
import styles from './SwipeUser.module.scss';
import { Failed, RateButtons, Status } from './ui';

export const SwipeUser: FC = () => {
  const dispatch = useAppDispatch();

  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const { tinderUsers, tinderUsersLength, isFailed, isReturnLoading } =
    useAppSelector(selectTinderData);

  const { motionProps, statusProps, previewProps, rateButtonsProps } =
    useSwipe();

  useEffect(() => {
    if (tinderUsersLength < 3) {
      dispatch(getMatchUsersThunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (isFailed) {
    return <Failed />;
  }

  return (
    <div>
      <SwipeUserLazy small />
      {tinderUsers[1] && (
        <Preview
          user={tinderUsers[1]}
          extraClassName={classNames(styles.pending, isMobile && styles.mobile)}
          isShadow
          disabled
        />
      )}
      {tinderUsers[0] && (
        <motion.div className={styles.swipeUser} {...motionProps}>
          {!previewProps.isFull && <Status {...statusProps} />}
          <Preview
            user={tinderUsers[0]}
            extraClassName={classNames(
              previewProps.isFull ? styles.padding : styles.grabbing,
              isMobile && styles.mobile
            )}
            {...previewProps}
          />
        </motion.div>
      )}
      {isReturnLoading && <SwipeUserLazy />}
      <RateButtons {...rateButtonsProps} />
    </div>
  );
};
