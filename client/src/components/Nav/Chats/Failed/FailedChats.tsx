import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './FailedChats.module.scss'

const FailedChats = () => {
  return (
    <div className={styles.noPairs}>
      <FontAwesomeIcon icon={faHeart} className={styles.icon} />
      <div>You don't have chats. Accept some pairs to have a personal chats with them</div>
    </div>
  );
};

export default FailedChats;
