import type { FC } from 'react';
import { RateUser } from 'features/tinder';
import styles from './Tinder.module.scss';

export const Tinder: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.users}>
        <RateUser />
      </div>
    </div>
  );
};
