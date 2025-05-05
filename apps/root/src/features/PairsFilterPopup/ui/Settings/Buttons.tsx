import type { FC } from 'react';

import { Button } from '@ducks-tinder-client/ui';

import styles from '../../PairsFilterPopup.module.scss';

interface ButtonsProps {
  handleReset: () => void;
}

export const Buttons: FC<ButtonsProps> = ({ handleReset }) => {
  return (
    <div className={styles.btns}>
      <Button
        onClick={handleReset}
        extraClassName={`${styles.btn} ${styles.leftBorder}`}
      >
        Clear
      </Button>
      <Button
        type="submit"
        extraClassName={`${styles.btn} ${styles.rightBorder}`}
      >
        Confirm
      </Button>
    </div>
  );
};
