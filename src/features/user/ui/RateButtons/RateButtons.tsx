import {
  faBolt,
  faHeart,
  faRotateLeft,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {
  motion,
  useTransform,
  type AnimationControls,
  type MotionValue,
} from 'framer-motion';
import type { FC } from 'react';
import { useAppSelector } from '@hooks';
import { useRateButtons } from '@features/user';
import { Button } from '@shared/ui';
import styles from './RateButtons.module.scss';

interface RateButtonsProps {
  controls: AnimationControls;
  isFullPreview: boolean;
  handleSubmitAction: () => void;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export const RateButtons: FC<RateButtonsProps> = ({
  controls,
  isFullPreview,
  handleSubmitAction,
  x,
  y,
}) => {
  const isReturnUser = useAppSelector((state) => state.tinder.isReturnUser);

  const dislikeBackground = useTransform(
    x,
    [-100, -40],
    ['#ff6574ff', '#ff657400']
  );
  const likeBackground = useTransform(x, [40, 100], ['#31ca8f00', '#31ca8fff']);
  const superLikeBackground = useTransform(y, (yValue) => {
    const xValue = x.get();
    if (xValue <= 35 && xValue >= -35 && yValue < -40) {
      return (
        '#429dff' + Math.min(255, Math.floor((yValue + 40) * -4)).toString(16)
      );
    }
    return '#429dff00';
  });

  const { handleReturn, handleDislike, handleSuperLike, handleLike } =
    useRateButtons(controls, handleSubmitAction);

  return (
    <div
      className={classNames(styles.buttons, isFullPreview && styles.minimized)}
    >
      {!isFullPreview && (
        <Button
          onClick={handleReturn}
          extraClassName={classNames(
            styles.btn,
            styles.small,
            isReturnUser ? styles.gold : styles.blocked
          )}
          key="return"
        >
          <FontAwesomeIcon
            icon={faRotateLeft}
            className={classNames(
              styles.icon,
              isReturnUser ? styles.gold : styles.blocked
            )}
          />
        </Button>
      )}
      <motion.div
        className={classNames(styles.wrapper)}
        style={{ backgroundColor: dislikeBackground }}
        key="dislike"
      >
        <Button
          onClick={handleDislike}
          extraClassName={classNames(
            styles.btn,
            styles.large,
            styles.red,
            isFullPreview && styles.minimized
          )}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className={classNames(styles.icon, styles.red, styles.large)}
          />
        </Button>
      </motion.div>
      <motion.div
        className={classNames(styles.wrapper)}
        style={{ backgroundColor: superLikeBackground }}
        key="superLike"
      >
        <Button
          onClick={handleSuperLike}
          extraClassName={classNames(
            styles.btn,
            styles.small,
            styles.blue,
            isFullPreview && styles.minimized
          )}
        >
          <FontAwesomeIcon
            icon={faStar}
            className={classNames(styles.icon, styles.blue)}
          />
        </Button>
      </motion.div>
      <motion.div
        className={classNames(styles.wrapper)}
        style={{ backgroundColor: likeBackground }}
        key="like"
      >
        <Button
          onClick={handleLike}
          extraClassName={classNames(
            styles.btn,
            styles.large,
            styles.green,
            isFullPreview && styles.minimized
          )}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={classNames(styles.icon, styles.green)}
          />
        </Button>
      </motion.div>
      {!isFullPreview && (
        <Button
          extraClassName={classNames(styles.btn, styles.small, styles.purple)}
          key="boost"
        >
          <FontAwesomeIcon
            icon={faBolt}
            className={classNames(styles.icon, styles.purple)}
          />
        </Button>
      )}
    </div>
  );
};
