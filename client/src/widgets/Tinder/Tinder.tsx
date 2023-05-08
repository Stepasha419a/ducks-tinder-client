import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Preview } from '@entities/user/components';
import { RateButtons, ResetCheckedUsers } from '@features/tinder';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getSortedUserThunk, selectTinderData } from '@entities/tinder/model';
import { Failed, Loading } from './components';
import styles from './Tinder.module.scss';

export const Tinder: FC = () => {
  const dispatch = useAppDispatch();

  const { tinderUsers, currentTinderUsersIndex, isFailed } =
    useAppSelector(selectTinderData);

  const [isFullPreview, setIsFullPreview] = useState(false);

  useEffect(() => {
    dispatch(getSortedUserThunk());
  }, [currentTinderUsersIndex, dispatch]);

  if (isFailed) {
    return (
      <div className={styles.wrapper}>
        <ResetCheckedUsers />
        <Failed />
      </div>
    );
  }

  if (currentTinderUsersIndex === tinderUsers.length) {
    return (
      <div className={styles.wrapper}>
        <ResetCheckedUsers />
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ResetCheckedUsers />
      <div className={styles.users}>
        {isFullPreview ? (
          <>
            <Preview
              user={tinderUsers[currentTinderUsersIndex]}
              setIsFullPreview={setIsFullPreview}
              extraClassName={styles.padding}
              isFull
            />
            <RateButtons isMinimum />
          </>
        ) : (
          <>
            <Preview
              user={tinderUsers[currentTinderUsersIndex]}
              setIsFullPreview={setIsFullPreview}
              isShadow
            />
            <RateButtons />
          </>
        )}
      </div>
    </div>
  );
};
