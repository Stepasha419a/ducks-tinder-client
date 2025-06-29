import type { FC } from 'react';
import { faCircleDown, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '@shared/ui';

import styles from './TogglePreview.module.scss';

interface TogglePreviewProps {
  isFull?: boolean;
  setIsFullPreview: (value: boolean) => void;
}

export const TogglePreview: FC<TogglePreviewProps> = ({
  isFull,
  setIsFullPreview,
}) => {
  if (isFull) {
    return (
      <Button
        variant="mark"
        onClick={() => setIsFullPreview(false)}
        extraClassName={styles.closeFullPreview}
      >
        <FontAwesomeIcon icon={faCircleDown} className={styles.icon} />
      </Button>
    );
  }

  return (
    <button
      aria-label="open user full preview"
      onClick={() => setIsFullPreview(true)}
      className={styles.descr}
    >
      <FontAwesomeIcon icon={faCircleInfo} className={styles.openFullPreview} />
    </button>
  );
};
