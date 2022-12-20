import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Choose.module.scss';

const Choose = () => {
  return (
    <div className={styles.choose}>
      <div className={styles.inner}>
        <FontAwesomeIcon icon={faComment} className={styles.icon} />
        <div className={styles.text}>Choose the chat</div>
      </div>
    </div>
  );
};

export default Choose;
