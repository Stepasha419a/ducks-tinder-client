import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { FC, useEffect, useState } from 'react';
import { getUserPairsThunk } from '../../../../redux/users/users.thunks';
import styles from './Pairs.module.scss';
import { User } from '../../../../models/User/User';
import Pair from './Pair/Pair';
import { sortItemBySettings } from '../../utils/PairsUtils';
import { PairSorts } from '../../../../models/Sorts/Sorts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface PairsProps {
  sorts: PairSorts;
}

export const Pairs: FC<PairsProps> = ({ sorts }) => {
  const dispatch = useAppDispatch();

  const pairsState = useAppSelector((state) => state.usersPage.pairs);
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const [currentPair, setCurrentPair] = useState<User>({} as User);

  useEffect(() => {
    dispatch(getUserPairsThunk(currentUser.pairs.slice(1)));
  }, [dispatch, currentUser.pairs]);

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
