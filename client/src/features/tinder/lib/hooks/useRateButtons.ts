import {
  dislikeUserThunk,
  likeUserThunk,
  returnUserThunk,
} from '@/entities/tinder/model';
import {
  faBolt,
  faHeart,
  faRotateLeft,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@shared/hooks';

export function useRateButtons(
  isMinimum: boolean,
  styles: Record<string, string>
) {
  const dispatch = useAppDispatch();

  const isReturnUser = useAppSelector((state) => state.tinder.isReturnUser);
  const currentTinderUsersIndex = useAppSelector(
    (state) => state.tinder.currentTinderUsersIndex
  );

  const buttons = [
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

  // there are only 3 buttons in minimum version
  return isMinimum ? buttons.slice(1, 4) : buttons;
}
