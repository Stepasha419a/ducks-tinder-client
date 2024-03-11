import type { AnimationControls } from 'framer-motion';
import {
  dislikeUserThunk,
  likeUserThunk,
  returnUserThunk,
} from '@entities/user/model/tinder';
import {
  faBolt,
  faHeart,
  faRotateLeft,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';

export function useRateButtons(
  controls: AnimationControls,
  isMinimum: boolean,
  styles: Record<string, string>
) {
  const dispatch = useAppDispatch();

  const isReturnUser = useAppSelector((state) => state.tinder.isReturnUser);

  function startCenter() {
    setTimeout(() => {
      controls.start('center');
    }, 400);
  }

  function handleLike() {
    setTimeout(() => {
      dispatch(likeUserThunk());
    }, 300);
  }

  function handleDislike() {
    setTimeout(() => {
      dispatch(dislikeUserThunk());
    }, 300);
  }

  const buttons = [
    {
      onClick: () => {
        if (isReturnUser) {
          dispatch(returnUserThunk());
        }
      },
      extraClassName: [
        styles.btn,
        styles.small,
        isReturnUser ? styles.gold : styles.blocked,
      ],
      icon: faRotateLeft,
      cnIcon: `${styles.icon} ${isReturnUser ? styles.gold : styles.blocked}`,
    },
    {
      onClick: () => {
        controls.start('dislike');
        startCenter();
        handleDislike();
      },
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
      onClick: () => {
        controls.start('superLike');
        startCenter();
        handleLike();
      },
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
      onClick: () => {
        controls.start('like');
        startCenter();
        handleLike();
      },
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
