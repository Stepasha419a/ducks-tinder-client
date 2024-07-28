import { Skeleton } from '@shared/ui';
import styles from './PairsList.module.scss';

export const PairsListLazy = () => {
  return (
    <>
      {Array(5)
        .fill(null)
        .map((_, i) => {
          return (
            <Skeleton
              containerClassName={styles.lazy}
              key={i}
              count={1}
              width={244}
              height={305}
              duration={1}
            />
          );
        })}
    </>
  );
};
