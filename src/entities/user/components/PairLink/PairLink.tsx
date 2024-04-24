import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { makeImageUrl } from '@shared/helpers';
import styles from './PairLink.module.scss';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { FailedPair, Loading } from './components';
import { getPairsInfoThunk } from '@/entities/user/model/pair';
import { useEffect } from 'react';

export const PairLink = () => {
  const dispatch = useAppDispatch();

  const pairsInfo = useAppSelector((state) => state.pair.pairsInfo);
  const isPairsInfoLoading = useAppSelector(
    (state) => state.pair.isPairsInfoLoading
  );

  useEffect(() => {
    if (!pairsInfo) {
      dispatch(getPairsInfoThunk());
    }
  }, [dispatch, pairsInfo]);

  if (isPairsInfoLoading) {
    return <Loading />;
  }

  if (!pairsInfo) {
    return <FailedPair />;
  }

  const picture = pairsInfo.picture;

  const imageUrl = makeImageUrl(picture?.userId, picture?.name);

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
          <div className={styles.likes}>{pairsInfo.count}</div>
          <div className={styles.text}>{pairsInfo.count} likes</div>
          <FontAwesomeIcon
            icon={faHeartCircleExclamation}
            className={styles.icon}
          />
        </div>
      </Link>
    </div>
  );
};
