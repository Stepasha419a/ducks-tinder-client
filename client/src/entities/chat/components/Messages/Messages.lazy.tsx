import { Skeleton } from '@shared/ui';
import styles from './Messages.module.scss';

const heights = [35, 55, 75];
const widths = [150, 200, 250, 300, 350];

export const MessagesLazy = () => {
  return (
    <div className={styles.messages}>
      {Array(12)
        .fill(null)
        .map((_, i) => {
          return (
            <div className={styles.lazy_wrapper} key={i}>
              <Skeleton circle width={36} height={36} />
              <Skeleton
                className={styles.lazy_message}
                width={widths[i % 5]}
                height={heights[i % 3]}
              />
            </div>
          );
        })}
    </div>
  );
};
