import type { FC } from 'react';
import type { ShortUser } from '@shared/api/interfaces';
import { makeImageUrl } from '@shared/helpers';
import styles from './Pair.module.scss';

interface PairPropsInterface {
  user: ShortUser;
  setCurrentPair: () => void;
}

const Pair: FC<PairPropsInterface> = ({ user, setCurrentPair }) => {
  if (!user.name) {
    return <div>loading...</div>;
  }

  const imageUrl = makeImageUrl(user.id, user.pictures[0]?.name);

  return (
    <div onClick={setCurrentPair} className={styles.pair}>
      <img className={styles.image} src={imageUrl} alt="pair img" />
      <div className={styles.info}>
        <div className={styles.descr}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.years}>{user.age}</div>
        </div>
        <div className={styles.distance}>
          {user.distance}
          <span className={styles.text}>miles from you</span>
        </div>
      </div>
    </div>
  );
};

export default Pair;
