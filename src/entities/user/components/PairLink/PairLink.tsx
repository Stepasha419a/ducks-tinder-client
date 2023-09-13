import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { makeImageUrl } from '@shared/helpers';
import FailedPair from './Failed/FailedPair';
import styles from './PairLink.module.scss';
import { useAppSelector } from '@shared/lib/hooks';

export const PairLink = () => {
  const firstPair = useAppSelector((state) => state.user.currentUser.firstPair);
  const pairsCount = useAppSelector(
    (state) => state.user.currentUser.pairsCount
  );

  if (!pairsCount) {
    return <FailedPair />;
  }

  const imageUrl = makeImageUrl(firstPair?.id, firstPair?.pictures[0].name);

  return (
    <div className={styles.pairs}>
      <Link className={styles.link} to="/pairs">
        <div className={styles.content}>
          <img
            className={styles.image}
            src={imageUrl}
            alt="Pair img"
            draggable="false"
          />
          <div className={styles.likes}>{pairsCount}</div>
          <div className={styles.text}>{pairsCount} likes</div>
          <FontAwesomeIcon
            icon={faHeartCircleExclamation}
            className={styles.icon}
          />
        </div>
      </Link>
    </div>
  );
};
