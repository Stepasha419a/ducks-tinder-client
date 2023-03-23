import { useAppSelector } from '../../../../hooks';
import { FC, useState } from 'react';
import styles from './Pairs.module.scss';
import { PairSorts, User } from '../../../../models/User/User';
import Pair from './Pair/Pair';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { sortItemBySettings } from '../../helpers';

interface PairsProps {
  sorts: PairSorts;
}

export const Pairs: FC<PairsProps> = ({ sorts }) => {
  const pairsState = useAppSelector((state) => state.usersPage.pairs);
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const [currentPair, setCurrentPair] = useState<User>({} as User);

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
