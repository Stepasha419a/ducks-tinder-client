import type { FC } from 'react';
import styles from './PreviewContent.module.scss';

interface PreviewContentProps {
  name: string;
  age: number | null;
  distance: number | null;
}

export const PreviewContent: FC<PreviewContentProps> = ({
  age,
  distance,
  name,
}) => {
  return (
    <div className={styles.info}>
      <div className={styles.descr}>
        <div className={styles.name}>{name}</div>
        <div className={styles.years}>{age}</div>
      </div>
      {distance !== null && (
        <div className={styles.distance}>
          {distance}
          <span className={styles.text}>km from you</span>
        </div>
      )}
    </div>
  );
};
