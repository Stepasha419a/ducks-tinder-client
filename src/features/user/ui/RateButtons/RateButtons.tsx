import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { AnimationControls } from 'framer-motion';
import type { FC } from 'react';
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
  const buttons = useRateButtons(
    controls,
    isFullPreview,
    handleSubmitAction,
    styles
  );

  return (
    <div
      className={classNames(styles.buttons, isFullPreview && styles.minimized)}
    >
      {buttons.map((buttonData, index) => {
        return (
          <Button
            onClick={buttonData.onClick}
            extraClassName={classNames(styles.btn, buttonData.extraClassName)}
            key={index}
          >
            <div className={styles.background} />
            <FontAwesomeIcon
              icon={buttonData.icon}
              className={buttonData.cnIcon}
            />
          </Button>
        );
      })}
    </div>
  );
};
