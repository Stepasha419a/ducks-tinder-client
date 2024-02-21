import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { makeImageUrl } from '@shared/helpers';
import FailedPair from './Failed/FailedPair';
import styles from './PairLink.module.scss';
import { useAppSelector } from '@shared/lib/hooks';

export const PairLink = () => {
  const pairs = useAppSelector((state) => state.user.pairs);

  if (!pairs.length) {
    return <FailedPair />;
  }

  const firstPair = pairs[0];

  const imageUrl = makeImageUrl(firstPair.id, firstPair.pictures[0].name);

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
          <div className={styles.likes}>{pairs.length}</div>
          <div className={styles.text}>{pairs.length} likes</div>
          <FontAwesomeIcon
            icon={faHeartCircleExclamation}
            className={styles.icon}
          />
        </div>
      </Link>
    </div>
  );
};
