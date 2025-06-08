import { Skeleton } from '@ducks-tinder-client/ui';

import * as styles from './ChatList.module.scss';

export const ChatListLazy = () => {
  return (
    <div>
      {Array(4)
        .fill(null)
        .map((_, i) => {
          return (
            <div className={styles.lazy_wrapper} key={i}>
              <Skeleton circle width={50} height={50} />
              <div className={styles.lazy_descr}>
                <Skeleton
                  className={styles.lazy_name}
                  width={100}
                  height={20}
                />
                <Skeleton width={160} height={20} />
              </div>
            </div>
          );
        })}
    </div>
  );
};
