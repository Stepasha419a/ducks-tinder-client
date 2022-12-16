import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './FailedPair.module.scss';

const FailedPair = () => {
  return (
    <div className={styles.noPairs}>
      <FontAwesomeIcon icon={faHeart} className={styles.icon} />
      <div>You don't have likes. Like someone to have a like too</div>
    </div>
  );
};

export default FailedPair;