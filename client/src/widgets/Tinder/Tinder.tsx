import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Preview } from '@entities/user/components';
import { RateButtons, ResetCheckedUsers } from '@features/tinder';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getSortedUserThunk, setRequestedUsers } from '@entities/tinder/model';
import { Failed, Loading } from './components';
import styles from './Tinder.module.scss';

export const Tinder: FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const tinderUsers = useAppSelector((state) => state.tinder.tinderUsers);
  const currentTinderUsersIndex = useAppSelector(
    (state) => state.tinder.currentTinderUsersIndex
  );
  const requestedUsers = useAppSelector((state) => state.tinder.requestedUsers);
  const isFailed = useAppSelector((state) => state.tinder.isFailed);

  const [isFullPreview, setIsFullPreview] = useState(false);

  useEffect(() => {
    if (!requestedUsers.length) {
      dispatch(getSortedUserThunk({ user: currentUser }));
    } else if (currentTinderUsersIndex + 1 > tinderUsers.length) {
      dispatch(getSortedUserThunk({ user: currentUser, requestedUsers }));
    } // eslint-disable-next-line
  }, [currentTinderUsersIndex]);

  // TODO: move this logic to the thunk
  useEffect(() => {
    if (tinderUsers.length) {
      const ids = [];
      for (const user of tinderUsers) {
        ids.push(user._id);
      }
      dispatch(setRequestedUsers([...currentUser.checkedUsers, ...ids]));
    }
  }, [tinderUsers, currentUser.checkedUsers, dispatch]);

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
