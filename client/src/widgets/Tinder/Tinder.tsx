import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Preview } from '@entities/user/components';
import { RateButtons } from '@features/tinder';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getSortedUserThunk, selectTinderData } from '@entities/tinder/model';
import { Failed } from './components';
import styles from './Tinder.module.scss';
import { TinderLazy } from './Tinder.lazy';

export const Tinder: FC = () => {
  const dispatch = useAppDispatch();

  const { tinderUsers, currentTinderUsersIndex, isFailed } =
    useAppSelector(selectTinderData);
  const isLoading = useAppSelector((state) => state.tinder.isLoading);
  const errorFieldsLength = useAppSelector(
    (state) => state.setting.errorFields.length
  );

  const [isFullPreview, setIsFullPreview] = useState(false);

  useEffect(() => {
    if (!errorFieldsLength) {
      dispatch(getSortedUserThunk());
    }
  }, [errorFieldsLength, currentTinderUsersIndex, dispatch]);

  if (isFailed) {
    return (
      <div className={styles.wrapper}>
        <Failed />
      </div>
    );
  }

  if (currentTinderUsersIndex === tinderUsers.length || isLoading) {
    return <TinderLazy />;
  }

  return (
    <div className={styles.wrapper}>
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
