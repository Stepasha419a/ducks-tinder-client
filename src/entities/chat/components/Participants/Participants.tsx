import { createEmptyArray } from '@/shared/lib/helpers';
import type { FC } from 'react';
import styles from './Participants.module.scss';
import { Avatar } from '@/shared/ui';

export const Participants: FC = () => {
  return (
    <div className={styles.list}>
      {createEmptyArray(20).map((_, index) => (
        <div key={index} className={styles.participant}>
          <Avatar /> <div className={styles.name}>user-{index}</div>
        </div>
      ))}
    </div>
  );
};
