import {
  faBolt,
  faHeart,
  faRotateLeft,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FocusEvent, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { dislikeUserThunk, likeUserThunk, returnUserThunk } from '../../../redux/users/users.thunks';
import { Button } from '../../ui';
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

  const isReturnUser = useAppSelector((state) => state.usersPage.isReturnUser);

  const btnFocus = (e: FocusEvent<HTMLButtonElement, any>) => {
    const target = e.target as Element;
    target.classList.add(styles.active);
  };

  const btnMouseOut = (e: MouseEvent<HTMLButtonElement, any>) => {
    const target = e.target as HTMLElement;
    target.classList.remove(styles.active);
    target.blur();
  };

  const newButtonsData = [
    {
      onClick: () => dispatch(returnUserThunk()),
      extraClassName: [
        styles.btn,
        styles.small,
        currentTinderUsersIndex && isReturnUser ? styles.gold : styles.blocked,
      ],
      cnWrapper: styles.wrapper,
      icon: faRotateLeft,
      cnIcon: `${styles.icon} ${
        currentTinderUsersIndex && isReturnUser ? styles.gold : styles.blocked
      }`,
    },
    {
      onClick: () => dispatch(dislikeUserThunk()),
      extraClassName: [
        styles.btn,
        styles.large,
        styles.red,
        isMinimum ? styles.minimized : '',
      ],
      cnWrapper: `${styles.wrapper} ${styles.large}`,
      icon: faXmark,
      cnIcon: `${styles.icon} ${styles.red} ${styles.large}`,
    },
    {
      onClick: () => dispatch(likeUserThunk()),
      extraClassName: [
        styles.btn,
        styles.small,
        styles.blue,
        isMinimum ? styles.minimized : '',
      ],
      cnWrapper: styles.wrapper,
      icon: faStar,
      cnIcon: `${styles.icon} ${styles.blue}`,
    },
    {
      onClick: () => dispatch(likeUserThunk()),
      extraClassName: [
        styles.btn,
        styles.large,
        styles.green,
        isMinimum ? styles.minimized : '',
      ],
      cnWrapper: `${styles.wrapper} ${styles.large}`,
      icon: faHeart,
      cnIcon: `${styles.icon} ${styles.green}`,
    },
    {
      onClick: () => {},
      extraClassName: [styles.btn, styles.small, styles.purple],
      cnWrapper: styles.wrapper,
      icon: faBolt,
      cnIcon: `${styles.icon} ${styles.purple}`,
    },
  ];

  return (
    <>
      <div className={`${styles.buttons} ${isMinimum ? styles.minimized : ''}`}>
        {(isMinimum ? newButtonsData.slice(1, 4) : newButtonsData).map(
          (buttonData) => {
            return (
              <Button
                variant="tinder"
                onClick={buttonData.onClick}
                onFocus={(e) => btnFocus(e)}
                onMouseOut={(e) => btnMouseOut(e)}
                extraClassName={buttonData.extraClassName}
              >
                <div className={buttonData.cnWrapper}>
                  <FontAwesomeIcon
                    icon={buttonData.icon}
                    className={buttonData.cnIcon}
                  />
                </div>
              </Button>
            );
          }
        )}
      </div>
    </>
  );
};

export default Buttons;
