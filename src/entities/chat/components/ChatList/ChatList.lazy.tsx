import { Skeleton } from '@shared/ui';
import styles from './ChatList.module.scss';

export const ChatListLazy = () => {
  return (
    <div className={styles.chats}>
      {Array(2)
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
                <Skeleton
                  className={styles.lazy_message}
                  width={160}
                  height={20}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};
