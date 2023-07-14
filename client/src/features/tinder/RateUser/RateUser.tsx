import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@hooks';
import { Preview } from '@entities/user/components';
import { getSortedUserThunk, selectTinderData } from '@entities/tinder/model';
import { RateButtons, Failed } from './components';
import { RateUserLazy } from './RateUser.lazy';
import { useSwipeProps } from '../lib';
import styles from './RateUser.module.scss';

export const RateUser: FC = () => {
  const dispatch = useAppDispatch();

  const { tinderUsers, currentTinderUsersIndex, isFailed } =
    useAppSelector(selectTinderData);
  const isLoading = useAppSelector((state) => state.tinder.isLoading);

  const [isFullPreview, setIsFullPreview] = useState(false);

  const motionProps = useSwipeProps(!isFullPreview);

  useEffect(() => {
    dispatch(getSortedUserThunk());
  }, [dispatch, currentTinderUsersIndex]);

  if (currentTinderUsersIndex === tinderUsers.length || isLoading) {
    return <RateUserLazy />;
  }

  if (isFailed) {
    return <Failed />;
  }

  return (
    <motion.div {...motionProps}>
      <Preview
        user={tinderUsers[currentTinderUsersIndex]}
        setIsFullPreview={setIsFullPreview}
        extraClassName={isFullPreview ? styles.padding : styles.grabbing}
        isFull={isFullPreview}
        isShadow={!isFullPreview}
      />
      <RateButtons isFullPreview={isFullPreview} />
    </motion.div>
  );
};
