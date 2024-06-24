import classNames from 'classnames';
import type { AnimationControls } from 'framer-motion';
import { motion } from 'framer-motion';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
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

interface SwipeUserProps {
  controls: AnimationControls;
  isFullPreview: boolean;
  setIsFullPreview: Dispatch<SetStateAction<boolean>>;
}

export const SwipeUser: FC<PropsWithChildren<SwipeUserProps>> = ({
  children,
  controls,
  isFullPreview,
  setIsFullPreview,
}) => {
  const dispatch = useAppDispatch();

  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const { tinderUser } = useAppSelector(selectTinderData);
  const isLoading = useAppSelector((state) => state.tinder.isLoading);

  const { isDragRef, motionProps, sliderRef } = useSwipe(
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

  return (
    <motion.div {...motionProps}>
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
      {children}
    </motion.div>
  );
};
