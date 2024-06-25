import classNames from 'classnames';
import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import type {
  Dispatch,
  FC,
  PropsWithChildren,
  RefObject,
  SetStateAction,
} from 'react';
import { useEffect } from 'react';
import type Slider from 'react-slick';
import type { SwipeProps } from '@features/user';
import { getMatchUserThunk, selectTinderData } from '@entities/user';
import { Preview } from '@entities/user';
import {
  useAppDispatch,
  useAppSelector,
  useAdaptiveMediaQuery,
} from '@shared/lib/hooks';
import { SwipeUserLazy } from './SwipeUser.lazy';
import styles from './SwipeUser.module.scss';
import { Status } from './ui';

interface SwipeUserProps extends SwipeProps {
  isFullPreview: boolean;
  setIsFullPreview: Dispatch<SetStateAction<boolean>>;
  sliderRef: RefObject<Slider>;
  motionProps: MotionProps;
}

export const SwipeUser: FC<PropsWithChildren<SwipeUserProps>> = ({
  children,
  isFullPreview,
  setIsFullPreview,
  sliderRef,
  x,
  y,
  isDragRef,
  motionProps,
}) => {
  const dispatch = useAppDispatch();

  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

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
      {children}
    </motion.div>
  );
};
