import type { FC, ReactElement } from 'react';
import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '@shared/lib/hooks';
import styles from './LikesCount.module.scss';
import { Skeleton } from '@/shared/ui';

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
        <Skeleton height={25} width={20} />
        &nbsp;likes
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
