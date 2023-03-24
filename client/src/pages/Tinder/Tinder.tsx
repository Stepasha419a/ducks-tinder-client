import { useEffect, useState } from 'react';
import Buttons from './components/Buttons/Buttons';
import TinderUserLoading from './components/UserLoading/Loading/Loading';
import TinderUserFailed from './components/UserLoading/Failed/Failed';
import styles from './Tinder.module.scss';
import Instructions from './components/Instructions/Instructions';
import { Button } from '../../shared/ui';
import { updateUserThunk } from '../../redux/users/users.thunks';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Preview } from '../../components/Preview/Preview';
import { getSortedUserThunk } from '../../redux/tinder/tinder.thunks';
import { setRequestedUsers } from '../../redux/tinder/tinder.slice';

export const Tinder: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const tinderUsers = useAppSelector((state) => state.tinderPage.tinderUsers);
  const currentTinderUsersIndex = useAppSelector(
    (state) => state.tinderPage.currentTinderUsersIndex
  );
  const requestedUsers = useAppSelector(
    (state) => state.tinderPage.requestedUsers
  );
  const isFailed = useAppSelector((state) => state.tinderPage.isFailed);

  const [isFullPreview, setIsFullPreview] = useState(false);

  useEffect(() => {
    if (!requestedUsers.length) {
      dispatch(getSortedUserThunk({ user: currentUser }));
    } else if (currentTinderUsersIndex + 1 > tinderUsers.length) {
      dispatch(getSortedUserThunk({ user: currentUser, requestedUsers }));
    } // eslint-disable-next-line
  }, [currentTinderUsersIndex]);

  useEffect(() => {
    if (tinderUsers.length) {
      const ids = [];
      for (const user of tinderUsers) {
        ids.push(user._id);
      }
      dispatch(setRequestedUsers([...currentUser.checkedUsers, ...ids]));
    }
  }, [tinderUsers, currentUser.checkedUsers, dispatch]);

  const resetHandler = () => {
    dispatch(
      updateUserThunk({
        inputName: 'checkedUsers',
        changedData: [],
      })
    );
  };

  if (isFailed) {
    return (
      <div className={styles.wrapper}>
        <Button onClick={() => resetHandler()} extraClassName={styles.reset}>
          reset
        </Button>
        <TinderUserFailed />
      </div>
    );
  }

  if (currentTinderUsersIndex === tinderUsers.length) {
    return (
      <div className={styles.wrapper}>
        <Button onClick={() => resetHandler()} extraClassName={styles.reset}>
          reset
        </Button>
        <TinderUserLoading />
      </div>
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Button onClick={() => resetHandler()} extraClassName={styles.reset}>
          reset
        </Button>
        <div className={styles.users}>
          {isFullPreview ? (
            <>
              <Preview
                user={tinderUsers[currentTinderUsersIndex]}
                setIsFullPreview={setIsFullPreview}
                extraClassName={styles.padding}
                isFull
              />
              <Buttons
                currentTinderUsersIndex={currentTinderUsersIndex}
                isMinimum
              />
            </>
          ) : (
            <>
              <Preview
                user={tinderUsers[currentTinderUsersIndex]}
                setIsFullPreview={setIsFullPreview}
                isShadow
              />
              <Buttons currentTinderUsersIndex={currentTinderUsersIndex} />
            </>
          )}
        </div>
      </div>
      <Instructions />
    </>
  );
};
