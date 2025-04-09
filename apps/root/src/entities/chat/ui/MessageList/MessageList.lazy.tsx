import type { FC } from 'react';

import { Skeleton } from '@ducks-tinder-client/ui';

import styles from './MessageList.module.scss';

const heights = [35, 55, 75];
const widths = [150, 200, 250, 300, 350];

interface MessagesLazyProps {
  count?: number;
}

export const MessagesLazy: FC<MessagesLazyProps> = ({ count = 12 }) => {
  return (
    <div>
      {Array(count)
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
