import { User } from '../../../../../models/User/User';
import styles from './Pair.module.scss';
import { makeImageUrl } from '../../../../../components/ui/helpers';
import PairPopup from '../../../popups/Pair/PairPopup';

interface PairPropsInterface {
  user: User;
  setCurrentPair: (pair: User) => void;
  isCurrent: boolean;
}

const Pair: React.FC<PairPropsInterface> = ({
  user,
  setCurrentPair,
  isCurrent,
}) => {
  if (!user.name) {
    return <div>loading...</div>;
  }

  const imageUrl = makeImageUrl(user._id, user.pictures.avatar);

  return (
    <>
      <div onClick={() => setCurrentPair(user)} className={styles.pair}>
        <img className={styles.image} src={imageUrl} alt="pair img" />
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
      {isCurrent && (
        <PairPopup currentPair={user} setCurrentPair={setCurrentPair} />
      )}
    </>
  );
};

export default Pair;