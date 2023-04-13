import {
  faBolt,
  faHeart,
  faRotateLeft,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  dislikeUserThunk,
  likeUserThunk,
  returnUserThunk,
} from '@entities/tinder/model';
import { Button } from '@shared/ui';
import styles from './Buttons.module.scss';

interface ButtonsProps {
  currentTinderUsersIndex: number;
  isMinimum?: boolean;
}

const Buttons: FC<ButtonsProps> = ({
  currentTinderUsersIndex,
  isMinimum = false,
}) => {
  const dispatch = useAppDispatch();

  const isReturnUser = useAppSelector((state) => state.tinder.isReturnUser);

  const newButtonsData = [
    {
      onClick: async () => isReturnUser && dispatch(returnUserThunk()),
      extraClassName: [
        styles.btn,
        styles.small,
        currentTinderUsersIndex && isReturnUser ? styles.gold : styles.blocked,
      ],
      icon: faRotateLeft,
      cnIcon: `${styles.icon} ${
        currentTinderUsersIndex && isReturnUser ? styles.gold : styles.blocked
      }`,
    },
    {
      onClick: async () => dispatch(dislikeUserThunk()),
      extraClassName: [
        styles.btn,
        styles.large,
        styles.red,
        isMinimum ? styles.minimized : '',
      ],
      icon: faXmark,
      cnIcon: `${styles.icon} ${styles.red} ${styles.large}`,
    },
    {
      onClick: async () => dispatch(likeUserThunk()),
      extraClassName: [
        styles.btn,
        styles.small,
        styles.blue,
        isMinimum ? styles.minimized : '',
      ],
      icon: faStar,
      cnIcon: `${styles.icon} ${styles.blue}`,
    },
    {
      onClick: async () => dispatch(likeUserThunk()),
      extraClassName: [
        styles.btn,
        styles.large,
        styles.green,
        isMinimum ? styles.minimized : '',
      ],
      icon: faHeart,
      cnIcon: `${styles.icon} ${styles.green}`,
    },
    {
      extraClassName: [styles.btn, styles.small, styles.purple],
      icon: faBolt,
      cnIcon: `${styles.icon} ${styles.purple}`,
    },
  ];

  return (
    <>
      <div className={`${styles.buttons} ${isMinimum ? styles.minimized : ''}`}>
        {(isMinimum ? newButtonsData.slice(1, 4) : newButtonsData).map(
          (buttonData, index) => {
            return (
              <Button
                variant="tinder"
                onClick={buttonData.onClick}
                extraClassName={buttonData.extraClassName}
                key={index}
              >
                <div className={styles.background} />
                <FontAwesomeIcon
                  icon={buttonData.icon}
                  className={buttonData.cnIcon}
                />
              </Button>
            );
          }
        )}
      </div>
    </>
  );
};

export default Buttons;
