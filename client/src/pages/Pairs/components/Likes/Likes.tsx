import type { ReactElement } from 'react';
import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '@hooks';
import styles from './Likes.module.scss';

export const Likes = (): ReactElement => {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <div className={styles.likes}>
      <FontAwesomeIcon
        icon={faHeartCircleExclamation}
        className={styles.icon}
      />
      {currentUser.pairs.length} likes
    </div>
  );
};
