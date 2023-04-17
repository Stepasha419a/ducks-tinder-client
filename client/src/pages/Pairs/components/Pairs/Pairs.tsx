import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@hooks';
import type { PairSorts, User } from '@shared/api/interfaces';
import Pair from './Pair/Pair';
import { sortItemBySettings } from '../../helpers';
import styles from './Pairs.module.scss';
import { getUserPairsThunk } from '@entities/user/model';

interface PairsProps {
  sorts: PairSorts;
}

export const Pairs: FC<PairsProps> = ({ sorts }) => {
  const dispatch = useAppDispatch();

  const pairs = useAppSelector((state) => state.user.currentUser.pairs);
  const pairsState = useAppSelector((state) => state.user.pairs);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [currentPair, setCurrentPair] = useState<User>({} as User);

  useEffect(() => {
    dispatch(getUserPairsThunk(pairs));
  }, [dispatch, pairs]);

  if (!currentUser.pairs.length) {
    return (
      <div className={styles.noPairs}>
        <FontAwesomeIcon icon={faHeart} className={styles.icon} />
        <div>You don't have likes. Like someone to have a like too</div>
      </div>
    );
  }

  return (
    <div className={styles.users}>
      {pairsState
        .filter((user: User) => sortItemBySettings(user, sorts))
        .map((user: User) => {
          const isCurrent = currentPair._id === user._id;
          return (
            <Pair
              key={user._id}
              user={user}
              setCurrentPair={setCurrentPair}
              isCurrent={isCurrent}
            />
          );
        })}
    </div>
  );
};
