import { faCircleDown, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
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
    <div onClick={() => setIsFullPreview(true)} className={styles.descr}>
      <Button
        variant="mark"
        onClick={() => setIsFullPreview(true)}
        extraClassName={styles.openFullPreview}
      >
        <FontAwesomeIcon icon={faCircleInfo} />
      </Button>
    </div>
  );
};
