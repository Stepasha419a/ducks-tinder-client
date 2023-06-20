import type { FC } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@hooks';
import type { ShortUser } from '@shared/api/interfaces';
import { getUserPairsThunk } from '@entities/user/model';
import { sortItemBySettings } from '../../model/helpers';
import Pair from './Pair/Pair';
import styles from './PairsList.module.scss';
import { PairsListLazy } from './PairsList.lazy';

interface PairsListProps {
  setCurrentPair: (user: ShortUser) => void;
}

export const PairsList: FC<PairsListProps> = ({ setCurrentPair }) => {
  const dispatch = useAppDispatch();

  const pairs = useAppSelector((state) => state.user.pairs);
  const pairSorts = useAppSelector((state) => state.user.pairSorts);
  const isPairsLoading = useAppSelector((state) => state.user.isPairsLoading);

  useEffect(() => {
    dispatch(getUserPairsThunk());
  }, [dispatch]);

  if (isPairsLoading) {
    return <PairsListLazy />;
  }

  if (!pairs.length) {
    return (
      <div className={styles.noPairs}>
        <FontAwesomeIcon icon={faHeart} className={styles.icon} />
        <div>You don't have likes. Like someone to have a like too</div>
      </div>
    );
  }

  return (
    <div className={styles.pairs}>
      {pairs
        .filter((user: ShortUser) => sortItemBySettings(user, pairSorts))
        .map((user: ShortUser) => {
          return (
            <Pair
              key={user.id}
              user={user}
              setCurrentPair={() => setCurrentPair(user)}
            />
          );
        })}
    </div>
  );
};
