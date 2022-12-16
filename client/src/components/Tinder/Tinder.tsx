import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';
import {
  getSortedUserThunk,
  setRequestedUsers,
  updateUserThunk,
} from '../../redux/usersReducer';
import Buttons from './Buttons/Buttons';
import FullPreview from './UserPreview/FullPreview/FullPreview';
import Preview from './UserPreview/Preview/Preview';
import TinderUserLoading from './UserLoading/Loading/Loading';
import TinderUserFailed from './UserLoading/Failed/Failed';
import styles from './Tinder.module.scss';
import Instructions from './Instructions/Instructions';

export const Tinder: React.FC = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: AppStateType) => state.usersPage.currentUser
  );
  const tinderUsers = useSelector(
    (state: AppStateType) => state.usersPage.tinderUsers
  );
  const currentTinderUsersIndex = useSelector(
    (state: AppStateType) => state.usersPage.currentTinderUsersIndex
  );
  const requestedUsers = useSelector(
    (state: AppStateType) => state.usersPage.requestedUsers
  );
  const isFailed = useSelector(
    (state: AppStateType) => state.usersPage.isFailed
  );

  const [isFullPreview, setIsFullPreview] = useState(false);

  useEffect(() => {
    if (!requestedUsers.length) {
      dispatch(getSortedUserThunk({ user: currentUser }) as any);
    } else if (currentTinderUsersIndex + 1 > tinderUsers.length) {
      dispatch(
        getSortedUserThunk({ user: currentUser, requestedUsers }) as any
      );
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
        currentUser,
        inputName: 'checkedUsers',
        changedData: [],
      }) as any
    );
  };

  if (isFailed) {
    return (
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <button onClick={() => resetHandler()} className={styles.reset}>
            reset
          </button>
          <TinderUserFailed />
        </div>
      </div>
    );
  }

  if (currentTinderUsersIndex === tinderUsers.length) {
    return (
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <button onClick={() => resetHandler()} className={styles.reset}>
            reset
          </button>
          <TinderUserLoading />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <button onClick={() => resetHandler()} className={styles.reset}>
          reset
        </button>
        <div className={styles.users}>
          {isFullPreview ? (
            <>
              <FullPreview
                currentUser={tinderUsers[currentTinderUsersIndex]}
                setIsFullPreview={setIsFullPreview}
              />
              <Buttons
                currentTinderUsersIndex={currentTinderUsersIndex}
                isMinimum
              />
            </>
          ) : (
            <>
              <Preview
                currentUser={tinderUsers[currentTinderUsersIndex]}
                setIsFullPreview={setIsFullPreview}
              />
              <Buttons currentTinderUsersIndex={currentTinderUsersIndex} />
            </>
          )}
        </div>
      </div>
      <Instructions />
    </div>
  );
};
