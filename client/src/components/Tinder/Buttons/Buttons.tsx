import {
  faBolt,
  faHeart,
  faRotateLeft,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FocusEvent, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxStore';
import {
  likeUserThunk,
  setCurrentTinderUsersIndex,
  setIsReturnUser,
  updateUserThunk,
} from '../../../redux/usersSlice';
import styles from './Buttons.module.scss';

interface ButtonsProps {
  currentTinderUsersIndex: number;
  isMinimum?: boolean;
}

const Buttons: React.FC<ButtonsProps> = ({
  currentTinderUsersIndex,
  isMinimum = false,
}) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const tinderUsers = useAppSelector((state) => state.usersPage.tinderUsers);
  const isReturnUser = useAppSelector((state) => state.usersPage.isReturnUser);

  const returnUser = () => {
    if (currentTinderUsersIndex && isReturnUser) {
      const newCheckedUsers = [...currentUser.checkedUsers];
      const index = currentUser.checkedUsers.findIndex(
        (item) => item === tinderUsers[currentTinderUsersIndex - 1]._id
      );

      newCheckedUsers.splice(index, 1);
      dispatch(
        updateUserThunk({
          currentUser,
          inputName: 'checkedUsers',
          changedData: newCheckedUsers,
        })
      );
      dispatch(setCurrentTinderUsersIndex(currentTinderUsersIndex - 1));
      dispatch(setIsReturnUser(false));
    }
  };

  const dislikeUser = () => {
    dispatch(
      updateUserThunk({
        currentUser,
        inputName: 'checkedUsers',
        changedData: [
          ...currentUser.checkedUsers,
          tinderUsers[currentTinderUsersIndex]._id,
        ],
      })
    );
    dispatch(setCurrentTinderUsersIndex(currentTinderUsersIndex + 1));
    dispatch(setIsReturnUser(true));
  };

  const likeUser = () => {
    dispatch(
      likeUserThunk({
        currentUser,
        tinderUser: tinderUsers[currentTinderUsersIndex],
      })
    );
    dispatch(setCurrentTinderUsersIndex(currentTinderUsersIndex + 1));
  };

  const btnFocus = (e: FocusEvent<HTMLButtonElement, any>, color: string) => {
    if (currentTinderUsersIndex && isReturnUser && color === 'gold') {
      const target = e.target as Element;
      target.classList.add(styles.btn_active_gold);
    } else if (color !== 'gold') {
      const target = e.target as Element;
      target.classList.add(styles[`btn_active_${color}`]);
    }
  };

  const btnMouseOut = (
    e: MouseEvent<HTMLButtonElement, any>,
    color: string
  ) => {
    const target = e.target as HTMLElement;
    target.classList.remove(styles[`btn_active_${color}`]);
    target.blur();
  };

  return (
    <>
      {isMinimum ? (
        <div className={`${styles.buttons} ${styles.buttons_minimized}`}>
          <button
            onClick={() => dislikeUser()}
            onFocus={(e) => btnFocus(e, 'red')}
            onMouseOut={(e) => btnMouseOut(e, 'red')}
            className={`${styles.btn} ${styles.btn_large} ${styles.btn_red} ${styles.btn_minimized}`}
          >
            <div className={`${styles.wrapper} ${styles.wrapper_large}`}>
              <FontAwesomeIcon
                icon={faXmark}
                className={`${styles.icon} ${styles.icon_red} ${styles.icon_large}`}
              />
            </div>
          </button>
          <button
            onClick={() => likeUser()}
            onFocus={(e) => btnFocus(e, 'blue')}
            onMouseOut={(e) => btnMouseOut(e, 'blue')}
            className={`${styles.btn} ${styles.btn_small} ${styles.btn_blue} ${styles.btn_minimized}`}
          >
            <div className={`${styles.wrapper}`}>
              <FontAwesomeIcon
                icon={faStar}
                className={`${styles.icon} ${styles.icon_blue}`}
              />
            </div>
          </button>
          <button
            onClick={() => likeUser()}
            onFocus={(e) => btnFocus(e, 'green')}
            onMouseOut={(e) => btnMouseOut(e, 'green')}
            className={`${styles.btn} ${styles.btn_large} ${styles.btn_green} ${styles.btn_minimized}`}
          >
            <div className={`${styles.wrapper} ${styles.wrapper_large}`}>
              <FontAwesomeIcon
                icon={faHeart}
                className={`${styles.icon} ${styles.icon_green}`}
              />
            </div>
          </button>
        </div>
      ) : (
        <div className={styles.buttons}>
          <button
            onClick={() => returnUser()}
            onFocus={(e) => btnFocus(e, 'gold')}
            onMouseOut={(e) => btnMouseOut(e, 'gold')}
            className={`${styles.btn} ${styles.btn_small} ${
              currentTinderUsersIndex && isReturnUser
                ? styles.btn_gold
                : styles.btn_blocked
            }`}
          >
            <div className={styles.wrapper}>
              <FontAwesomeIcon
                icon={faRotateLeft}
                className={`${styles.icon} ${
                  currentTinderUsersIndex && isReturnUser
                    ? styles.icon_gold
                    : styles.icon_blocked
                }`}
              />
            </div>
          </button>
          <button
            onClick={() => dislikeUser()}
            onFocus={(e) => btnFocus(e, 'red')}
            onMouseOut={(e) => btnMouseOut(e, 'red')}
            className={`${styles.btn} ${styles.btn_large} ${styles.btn_red}`}
          >
            <div className={`${styles.wrapper} ${styles.wrapper_large}`}>
              <FontAwesomeIcon
                icon={faXmark}
                className={`${styles.icon} ${styles.icon_red} ${styles.icon_large}`}
              />
            </div>
          </button>
          <button
            onClick={() => likeUser()}
            onFocus={(e) => btnFocus(e, 'blue')}
            onMouseOut={(e) => btnMouseOut(e, 'blue')}
            className={`${styles.btn} ${styles.btn_small} ${styles.btn_blue}`}
          >
            <div className={styles.wrapper}>
              <FontAwesomeIcon
                icon={faStar}
                className={`${styles.icon} ${styles.icon_blue}`}
              />
            </div>
          </button>
          <button
            onClick={() => likeUser()}
            onFocus={(e) => btnFocus(e, 'green')}
            onMouseOut={(e) => btnMouseOut(e, 'green')}
            className={`${styles.btn} ${styles.btn_large} ${styles.btn_green}`}
          >
            <div className={`${styles.wrapper} ${styles.wrapper_large}`}>
              <FontAwesomeIcon
                icon={faHeart}
                className={`${styles.icon} ${styles.icon_green}`}
              />
            </div>
          </button>
          <button
            onFocus={(e) => btnFocus(e, 'purple')}
            onMouseOut={(e) => btnMouseOut(e, 'purple')}
            className={`${styles.btn} ${styles.btn_small} ${styles.btn_purple}`}
          >
            <div className={styles.wrapper}>
              <FontAwesomeIcon
                icon={faBolt}
                className={`${styles.icon} ${styles.icon_purple}`}
              />
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default Buttons;
