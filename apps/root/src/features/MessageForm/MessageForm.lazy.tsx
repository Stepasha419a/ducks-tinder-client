import { Skeleton } from '@ducks-tinder-client/ui';

import styles from './MessageForm.module.scss';

export const MessageFormLazy = () => {
  return (
    <div className={styles.lazy}>
      <Skeleton
        containerClassName={styles.input_wrapper}
        className={styles.input}
      />
      <Skeleton className={styles.button} />
    </div>
  );
};
