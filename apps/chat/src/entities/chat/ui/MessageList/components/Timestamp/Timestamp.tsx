import { type FC, memo } from 'react';

import styles from './Timestamp.module.scss';

interface TimestampProps {
  createdAt: string;
}

export const Timestamp: FC<TimestampProps> = memo(({ createdAt }) => {
  return (
    <div className={styles.date}>
      <div className={styles.border}></div>
      <span>{new Date(createdAt).toLocaleDateString()}</span>
      <div className={styles.border}></div>
    </div>
  );
});
