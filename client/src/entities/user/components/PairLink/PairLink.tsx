import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@hooks';
import { makeImageUrl } from '@shared/helpers';
import { useEffect } from 'react';
import { getUserFirstPairThunk } from '../../model';
import FailedPair from './Failed/FailedPair';
import Loading from './Loading/Loading';
import styles from './PairLink.module.scss';

export const PairLink = () => {
  const dispatch = useAppDispatch();

  const firstPairId = useAppSelector(
    (state) => state.user.currentUser.pairs[0]
  );
  const firstPair = useAppSelector((state) => state.user.pairs[0]);
  const pairsLength = useAppSelector(
    (state) => state.user.currentUser.pairs
  ).length;

  useEffect(() => {
    dispatch(getUserFirstPairThunk(firstPairId));
  }, [dispatch, firstPairId]);

  if (!pairsLength) {
    return <FailedPair />;
  }

  // throws errors because firstPair on refresh it's just an empty {}
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!firstPair?.name) {
    return <Loading />;
  }

  const imageUrl = makeImageUrl(firstPair._id, firstPair.pictures.avatar);

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
          <div className={styles.likes}>{pairsLength}</div>
          <div className={styles.text}>{pairsLength} likes</div>
          <FontAwesomeIcon
            icon={faHeartCircleExclamation}
            className={styles.icon}
          />
        </div>
      </Link>
    </div>
  );
};
