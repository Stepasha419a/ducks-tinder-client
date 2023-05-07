import type { FC } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@hooks';
import type { User } from '@shared/api/interfaces';
import { getUserPairsThunk, selectUserPairs } from '@entities/user/model';
import { sortItemBySettings } from '../../model/helpers';
import Pair from './Pair/Pair';
import styles from './PairsList.module.scss';

interface PairsListProps {
  setCurrentPair: (user: User) => void;
}

export const PairsList: FC<PairsListProps> = ({ setCurrentPair }) => {
  const dispatch = useAppDispatch();

  const { pairIds, pairs, pairSorts } = useAppSelector(selectUserPairs);

  useEffect(() => {
    dispatch(getUserPairsThunk());
  }, [dispatch, pairIds]);

  if (!pairIds.length) {
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
        .filter((user: User) => sortItemBySettings(user, pairSorts))
        .map((user: User) => {
          const handleCurrentPair = () => {
            setCurrentPair(user);
          };
          return (
            <Pair
              key={user._id}
              user={user}
              setCurrentPair={handleCurrentPair}
            />
          );
        })}
    </div>
  );
};
