import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import type { ShortUser } from '@shared/api/interfaces';
import { getUserPairsThunk } from '@/entities/user/model/pair';
import Pair from './Pair/Pair';
import styles from './PairsList.module.scss';
import { PairsListLazy } from './PairsList.lazy';

interface PairsListProps {
  setCurrentPair: Dispatch<SetStateAction<ShortUser | null>>;
}

export const PairsList: FC<PairsListProps> = ({ setCurrentPair }) => {
  const dispatch = useAppDispatch();

  const pairs = useAppSelector((state) => state.pair.pairs);
  const isPairsLoading = useAppSelector((state) => state.pair.isPairsLoading);

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
      {pairs.map((user: ShortUser) => {
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
