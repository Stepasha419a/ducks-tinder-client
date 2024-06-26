import classNames from 'classnames';
import { motion, useAnimationControls } from 'framer-motion';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
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
import { RateButtons, Status } from './ui';

export const SwipeUser: FC = () => {
  const dispatch = useAppDispatch();

  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const { tinderUser } = useAppSelector(selectTinderData);
  const isLoading = useAppSelector((state) => state.tinder.isLoading);

  const [isFullPreview, setIsFullPreview] = useState(false);

  const controls = useAnimationControls();

  const { x, y, sliderRef, isDragRef, motionProps } = useSwipe(
    controls,
    isFullPreview,
    setIsFullPreview
  );

  useEffect(() => {
    dispatch(getMatchUserThunk());
  }, [dispatch]);

  if (!tinderUser || isLoading) {
    return <SwipeUserLazy />;
  }

  const handleOpenFullPreview = (value: boolean) => {
    if (isDragRef.current && !isFullPreview) {
      return;
    }
    setIsFullPreview(value);
  };

  const handleSubmitAction = () => {
    setIsFullPreview(false);
  };

  return (
    <motion.div {...motionProps}>
      <Status x={x} y={y} />
      <Preview
        user={tinderUser}
        setIsFullPreview={handleOpenFullPreview}
        extraClassName={classNames(
          isFullPreview ? styles.padding : styles.grabbing,
          isMobile && styles.mobile
        )}
        isFull={isFullPreview}
        isShadow={!isFullPreview}
        sliderRef={sliderRef}
      />
      <RateButtons
        isFullPreview={isFullPreview}
        handleSubmitAction={handleSubmitAction}
        controls={controls}
        x={x}
        y={y}
      />
    </motion.div>
  );
};
