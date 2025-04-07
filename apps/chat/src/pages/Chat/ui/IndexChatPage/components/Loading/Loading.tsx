import { Skeleton } from '@ducks-tinder-client/ui';

import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.choose}>
      <Skeleton className={styles.inner} />
    </div>
  );
};
