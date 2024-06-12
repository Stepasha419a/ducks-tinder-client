import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC, ReactElement } from 'react';
import { useAppSelector } from '@shared/lib/hooks';
import { Skeleton } from '@shared/ui';
import styles from './LikesCount.module.scss';

export const LikesCount: FC = (): ReactElement => {
  const likes = useAppSelector((state) => state.pair.pairsInfo?.count);
  const isPairsInfoLoading = useAppSelector(
    (state) => state.pair.isPairsInfoLoading
  );

  if (isPairsInfoLoading) {
    return (
      <div className={styles.likes}>
        <FontAwesomeIcon
          icon={faHeartCircleExclamation}
          className={styles.icon}
        />
        <Skeleton className={styles.loading} height={25} width={20} />
        likes
      </div>
    );
  }

  return (
    <div className={styles.likes}>
      <FontAwesomeIcon
        icon={faHeartCircleExclamation}
        className={styles.icon}
      />
      {likes} likes
    </div>
  );
};
