import classNames from 'classnames';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useSwipe } from '@features/user';
import { getMatchUserThunk, selectTinderData } from '@entities/user';
import { Preview } from '@entities/user';
import {
  useAppDispatch,
  useAppSelector,
  useAdaptiveMediaQuery,
} from '@shared/lib/hooks';
import { SwipeUserLazy } from './SwipeUser.lazy';
import styles from './SwipeUser.module.scss';
import { Failed, RateButtons, Status } from './ui';

export const SwipeUser: FC = () => {
  const dispatch = useAppDispatch();

  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const { tinderUser, isFailed } = useAppSelector(selectTinderData);
  const isLoading = useAppSelector((state) => state.tinder.isLoading);

  const { motionProps, statusProps, previewProps, rateButtonsProps } =
    useSwipe();

  useEffect(() => {
    dispatch(getMatchUserThunk());
  }, [dispatch]);

  if (isFailed) {
    return <Failed />;
  }

  if (!tinderUser || isLoading) {
    return <SwipeUserLazy />;
  }

  return (
    <motion.div {...motionProps}>
      <Status {...statusProps} />
      <Preview
        user={tinderUser}
        extraClassName={classNames(
          previewProps.isFull ? styles.padding : styles.grabbing,
          isMobile && styles.mobile
        )}
        {...previewProps}
      />
      <RateButtons {...rateButtonsProps} />
    </motion.div>
  );
};
