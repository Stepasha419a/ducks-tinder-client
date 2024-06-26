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
  type AnimationControls,
  type MotionValue,
} from 'framer-motion';
import type { FC } from 'react';
import { useAppSelector } from '@hooks';
import { useRateButtons, useRateButtonsStyle } from '@features/user';
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

  const { dislikeStyle, superLikeStyle, likeStyle } = useRateButtonsStyle(x, y);

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
        style={dislikeStyle}
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
            className={classNames(styles.icon, styles.large)}
          />
        </Button>
      </motion.div>
      <motion.div
        className={classNames(styles.wrapper)}
        style={superLikeStyle}
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
          <FontAwesomeIcon icon={faStar} className={classNames(styles.icon)} />
        </Button>
      </motion.div>
      <motion.div
        className={classNames(styles.wrapper)}
        style={likeStyle}
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
          <FontAwesomeIcon icon={faHeart} className={styles.icon} />
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
