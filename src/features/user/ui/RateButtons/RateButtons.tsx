import {
  faBolt,
  faHeart,
  faRotateLeft,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useAppSelector } from '@hooks';
import { useRateButtons } from '@features/user';
import { Button } from '@shared/ui';
import styles from './RateButtons.module.scss';

interface RateButtonsProps {
  controls: AnimationControls;
  isFullPreview: boolean;
  handleSubmitAction: () => void;
}

export const RateButtons: FC<RateButtonsProps> = ({
  controls,
  isFullPreview,
  handleSubmitAction,
}) => {
  const isReturnUser = useAppSelector((state) => state.tinder.isReturnUser);
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
      <Button
        onClick={handleDislike}
        extraClassName={classNames(
          styles.btn,
          styles.large,
          styles.red,
          isFullPreview && styles.minimized
        )}
        key="dislike"
      >
        <FontAwesomeIcon
          icon={faXmark}
          className={classNames(styles.icon, styles.red, styles.large)}
        />
      </Button>
      <Button
        onClick={handleSuperLike}
        extraClassName={classNames(
          styles.btn,
          styles.small,
          styles.blue,
          isFullPreview && styles.minimized
        )}
        key="superLike"
      >
        <FontAwesomeIcon
          icon={faStar}
          className={classNames(styles.icon, styles.blue)}
        />
      </Button>
      <Button
        onClick={handleLike}
        extraClassName={classNames(
          styles.btn,
          styles.large,
          styles.green,
          isFullPreview && styles.minimized
        )}
        key="like"
      >
        <FontAwesomeIcon
          icon={faHeart}
          className={classNames(styles.icon, styles.green)}
        />
      </Button>
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
