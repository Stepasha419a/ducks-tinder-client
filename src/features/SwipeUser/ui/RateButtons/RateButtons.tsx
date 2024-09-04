import {
  faBolt,
  faHeart,
  faRotateLeft,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { MotionStyle } from 'framer-motion';
import { motion, type AnimationControls } from 'framer-motion';
import type { FC } from 'react';
import { useRateButtons } from '@features/SwipeUser';
import { useAppSelector } from '@shared/lib';
import { Button } from '@shared/ui';
import styles from './RateButtons.module.scss';

interface RateButtonsProps {
  controls: AnimationControls;
  isFullPreview: boolean;
  handleSubmitAction: () => void;
  dislikeStyle: MotionStyle;
  superLikeStyle: MotionStyle;
  likeStyle: MotionStyle;
}

export const RateButtons: FC<RateButtonsProps> = ({
  controls,
  isFullPreview,
  handleSubmitAction,
  dislikeStyle,
  superLikeStyle,
  likeStyle,
}) => {
  const isReturnUser = useAppSelector((state) => state.tinder.isReturnUser);
  const isReturnLoading = useAppSelector(
    (state) => state.tinder.isReturnLoading
  );
  const tinderUsersLength = useAppSelector(
    (state) => state.tinder.tinderUsers.length
  );

  const { handleReturn, handleDislike, handleSuperLike, handleLike } =
    useRateButtons(controls, handleSubmitAction);

  const disabled = isReturnLoading || !tinderUsersLength;

  return (
    <div
      className={classNames(
        styles.buttons,
        isFullPreview && styles.minimized,
        disabled && styles.disabled
      )}
    >
      {!isFullPreview && (
        <Button
          onClick={handleReturn}
          extraClassName={classNames(styles.btn, styles.small, styles.gold)}
          key="return"
          disabled={!isReturnUser || disabled}
        >
          <FontAwesomeIcon
            icon={faRotateLeft}
            className={classNames(styles.icon, styles.gold)}
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
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
        >
          <FontAwesomeIcon icon={faHeart} className={styles.icon} />
        </Button>
      </motion.div>
      {!isFullPreview && (
        <Button
          extraClassName={classNames(styles.btn, styles.small, styles.purple)}
          key="boost"
          disabled={disabled}
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
