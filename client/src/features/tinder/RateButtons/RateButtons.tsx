import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import { Button } from '@shared/ui';
import styles from './RateButtons.module.scss';
import { useRateButtons } from '../lib';
import classNames from 'classnames';

interface RateButtonsProps {
  isMinimum?: boolean;
}

export const RateButtons: FC<RateButtonsProps> = ({ isMinimum = false }) => {
  const buttons = useRateButtons(isMinimum, styles);

  return (
    <div className={classNames(styles.buttons, isMinimum && styles.minimized)}>
      {buttons.map((buttonData, index) => {
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
      })}
    </div>
  );
};
