import { IUser } from '../../../models/IUser';
import defaultPhoto from '../../../assets/images/photos/1.jpg';
import styles from './Pair.module.scss';

interface PairPropsInterface {
  user: IUser;
  setCurrentPair: (pair: IUser) => void;
}

const Pair: React.FC<PairPropsInterface> = ({ user, setCurrentPair }) => {
  if (!user.name) {
    return <div>loading...</div>;
  }

  return (
    <div
      onClick={() => setCurrentPair(user)}
      style={{
        backgroundImage: `url(${
          user.pictures.avatar
            ? `http://localhost:5000/${user._id}/avatar/` + user.pictures.avatar
            : defaultPhoto
        })`,
      }}
      className={styles.pair}
    >
      <div className={styles.info}>
        <div className={styles.descr}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.years}>{user.age}</div>
        </div>
        <div className={styles.distance}>
          {user.partnerSettings?.distance || 'unknown'}
          <span className={styles.text}>miles from you</span>
        </div>
      </div>
    </div>
  );
};

export default Pair;
