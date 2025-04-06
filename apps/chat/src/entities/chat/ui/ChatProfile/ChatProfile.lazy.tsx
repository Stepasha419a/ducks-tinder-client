import Skeleton from 'react-loading-skeleton';
import classNames from 'classnames';

import styles from './ChatProfile.module.scss';

export const ChatProfileLazy = () => {
  return (
    <div className={styles.profile}>
      <div className={classNames(styles.user, styles.lazy)}>
        <Skeleton circle height={40} width={40} />
        <Skeleton className={styles.name} height={22} width={80} />
      </div>
    </div>
  );
};
