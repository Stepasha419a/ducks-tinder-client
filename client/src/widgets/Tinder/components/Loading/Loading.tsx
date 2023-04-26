import type { ReactElement } from 'react';
import { Preloader } from '@shared/ui';
import styles from './Loading.module.scss';

export const Loading = (): ReactElement => {
  return (
    <div className={styles.loading}>
      <div className={`${styles.text} ${styles.text_left}`}>loading...</div>
      <Preloader />
      <div className={`${styles.text} ${styles.text_right}`}>loading...</div>
    </div>
  );
};
