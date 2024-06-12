import type { FC } from 'react';
import { Skeleton } from '@shared/ui';
import styles from './Loading.module.scss';

export const Loading: FC = () => {
  return (
    <Skeleton
      className={styles.loading}
      width={104}
      height={120}
      borderRadius={4}
    />
  );
};
