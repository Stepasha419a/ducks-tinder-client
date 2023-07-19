import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { Preview } from '@entities/user/components';
import { getSortedUserThunk, selectTinderData } from '@entities/tinder/model';
import { RateButtons, Failed } from './components';
import { RateUserLazy } from './RateUser.lazy';
import { useSwipeProps } from '../lib';
import styles from './RateUser.module.scss';

export const RateUser: FC = () => {
  const dispatch = useAppDispatch();

  const { tinderUser, isFailed } = useAppSelector(selectTinderData);
  const isLoading = useAppSelector((state) => state.tinder.isLoading);

  const [isFullPreview, setIsFullPreview] = useState(false);

  const controls = useAnimationControls();
  const motionProps = useSwipeProps(controls, !isFullPreview);

  useEffect(() => {
    dispatch(getSortedUserThunk());
  }, [dispatch]);

  if (isFailed) {
    return <Failed />;
  }

  if (!tinderUser || isLoading) {
    return <RateUserLazy />;
  }

  return (
    <motion.div {...motionProps}>
      <Preview
        user={tinderUser}
        setIsFullPreview={setIsFullPreview}
        extraClassName={isFullPreview ? styles.padding : styles.grabbing}
        isFull={isFullPreview}
        isShadow={!isFullPreview}
      />
      <RateButtons controls={controls} isFullPreview={isFullPreview} />
    </motion.div>
  );
};
