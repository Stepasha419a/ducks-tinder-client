import classNames from 'classnames';
import type { AnimationControls } from 'framer-motion';
import { motion } from 'framer-motion';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import type Slider from 'react-slick';
import { getMatchUserThunk, selectTinderData } from '@entities/user';
import { Preview } from '@entities/user';
import {
  useAppDispatch,
  useAppSelector,
  useAdaptiveMediaQuery,
} from '@shared/lib/hooks';
import { useKeyboardEvents, useSwipeProps } from '../../lib';
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

  const sliderRef = useRef<Slider>(null);

  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const [isLockedSubmission, setIsLockedSubmission] = useState(false);

  const { isDragRef, ...motionProps } = useSwipeProps(
    controls,
    !isFullPreview,
    isLockedSubmission,
    setIsLockedSubmission
  );

  const setIsFullPreviewTest = (value: boolean) => {
    if (isDragRef.current && value) {
      setIsLockedSubmission(true);
    }
    setIsFullPreview(value);
  };
  useKeyboardEvents(controls, setIsFullPreviewTest, sliderRef);

  const { tinderUser } = useAppSelector(selectTinderData);
  const isLoading = useAppSelector((state) => state.tinder.isLoading);

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
