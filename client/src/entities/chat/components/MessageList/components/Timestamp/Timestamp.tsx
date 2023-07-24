import type { FC } from 'react';
import styles from './Timestamp.module.scss';

interface TimestampProps {
  createdAt: string;
}

export const Timestamp: FC<TimestampProps> = ({ createdAt }) => {
  return (
    <div className={styles.date}>
      {new Date(createdAt).toLocaleDateString()}
      <div className={styles.border}></div>
    </div>
  );
};
