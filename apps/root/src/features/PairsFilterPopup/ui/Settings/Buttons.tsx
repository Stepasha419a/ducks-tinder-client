import type { FC } from 'react';

import { Button } from '@ducks-tinder-client/ui';

import * as styles from '../../PairsFilterPopup.module.scss';
import { useTranslation } from 'react-i18next';

interface ButtonsProps {
  handleReset: () => void;
}

export const Buttons: FC<ButtonsProps> = ({ handleReset }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.btns}>
      <Button
        onClick={handleReset}
        extraClassName={`${styles.btn} ${styles.leftBorder}`}
      >
        {t('pairs.filter.buttons.clear')}
      </Button>
      <Button
        type="submit"
        extraClassName={`${styles.btn} ${styles.rightBorder}`}
      >
        {t('pairs.filter.buttons.confirm')}
      </Button>
    </div>
  );
};
