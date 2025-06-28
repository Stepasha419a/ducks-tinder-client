import type { FC } from 'react';
import {
  faBolt,
  faHeart,
  faRotateLeft,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { MotionValue } from 'motion/react';
import { motion } from 'motion/react';

import { useAppSelector } from '@ducks-tinder-client/common';
import { Button } from '@ducks-tinder-client/ui';

import * as styles from './RateButtons.module.scss';
import { useRateButtons } from './lib';
import type { TinderActions, TinderAnimations } from '@entities/user';
import { DataRoles, useSwipeStyles } from '@entities/user';

interface RateButtonsProps {
  onAnimation: (animation: TinderAnimations) => void;
  isFullPreview: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onSubmit: () => void;
  onBeforeAction: (action: TinderActions) => void;
  disabledActions?: boolean;
}

export const RateButtons: FC<RateButtonsProps> = ({
  onAnimation,
  isFullPreview,
  x,
  y,
  onSubmit,
  onBeforeAction,
  disabledActions,
}) => {
  const isReturnUser = useAppSelector((state) => state.tinder.isReturnUser);
  const isReturnLoading = useAppSelector(
    (state) => state.tinder.isReturnLoading
  );
  const tinderUsersLength = useAppSelector(
    (state) => state.tinder.tinderUsers.length
  );

  const { handleReturn, handleDislike, handleSuperLike, handleLike } =
    useRateButtons({ onAnimation, onSubmit, onBeforeAction, disabledActions });

  const {
    rateButtonStyles: { dislikeStyle, likeStyle, superLikeStyle },
  } = useSwipeStyles(x, y);

  const disabledButtons = isReturnLoading || !tinderUsersLength;

  return (
    <div
      className={classNames(
        styles.buttons,
        isFullPreview && styles.minimized,
        disabledButtons && styles.disabled
      )}
    >
      {!isFullPreview && (
        <Button
          onClick={handleReturn}
          extraClassName={classNames(styles.btn, styles.small, styles.gold)}
          key="return"
          disabled={!isReturnUser || disabledButtons}
          type="button"
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
          disabled={disabledButtons}
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
        data-role={DataRoles.SuperLikeButton}
      >
        <Button
          onClick={handleSuperLike}
          extraClassName={classNames(
            styles.btn,
            styles.small,
            styles.blue,
            isFullPreview && styles.minimized
          )}
          disabled={disabledButtons}
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
          onClick={() => {
            handleLike();
          }}
          extraClassName={classNames(
            styles.btn,
            styles.large,
            styles.green,
            isFullPreview && styles.minimized
          )}
          disabled={disabledButtons}
        >
          <FontAwesomeIcon icon={faHeart} className={styles.icon} />
        </Button>
      </motion.div>
      {!isFullPreview && (
        <Button
          extraClassName={classNames(styles.btn, styles.small, styles.purple)}
          key="boost"
          disabled={disabledButtons}
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
