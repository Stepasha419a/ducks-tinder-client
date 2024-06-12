import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { useEffect, useRef } from 'react';
import type { AnimationControls } from 'framer-motion';
import { motion } from 'framer-motion';
import type Slider from 'react-slick';
import classNames from 'classnames';
import {
  useAppDispatch,
  useAppSelector,
  useMediaQuery,
} from '@shared/lib/hooks';
import { Preview } from '@entities/user/ui';
import {
  getMatchUserThunk,
  selectTinderData,
} from '@entities/user/model/tinder';
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

  const isMobile = useMediaQuery('(max-width: 900px)');

  const { tinderUser } = useAppSelector(selectTinderData);
  const isLoading = useAppSelector((state) => state.tinder.isLoading);

  useKeyboardEvents(controls, setIsFullPreview, sliderRef);
  const motionProps = useSwipeProps(controls, !isFullPreview);

  useEffect(() => {
    dispatch(getMatchUserThunk());
  }, [dispatch]);

  if (!tinderUser || isLoading) {
    return <SwipeUserLazy />;
  }

  return (
    <motion.div {...motionProps}>
      <Preview
        user={tinderUser}
        setIsFullPreview={setIsFullPreview}
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
