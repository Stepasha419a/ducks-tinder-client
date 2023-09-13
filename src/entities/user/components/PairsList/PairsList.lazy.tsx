import { Skeleton } from '@shared/ui';
import styles from './PairsList.module.scss';

export const PairsListLazy = () => {
  return (
    <div className={styles.pairs}>
      {Array(10)
        .fill(null)
        .map((_, i) => {
          return (
            <Skeleton key={i} count={1} width={244} height={305} duration={1} />
          );
        })}
    </div>
  );
};
