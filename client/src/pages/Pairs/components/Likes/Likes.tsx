import type { FC, ReactElement } from 'react';
import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Likes.module.scss';

interface LikesProps {
  value: number;
}

export const Likes: FC<LikesProps> = ({value}): ReactElement => {
  return (
    <div className={styles.likes}>
      <FontAwesomeIcon
        icon={faHeartCircleExclamation}
        className={styles.icon}
      />
      {value} likes
    </div>
  );
};
