import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../../../hooks';
import styles from './Likes.module.scss';

export const Likes = () => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

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
