import type { FC, ReactElement } from 'react';
import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '@shared/lib/hooks';
import styles from './LikesCount.module.scss';

export const LikesCount: FC = (): ReactElement => {
  const likes = useAppSelector((state) => state.pair.pairs.length);

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
