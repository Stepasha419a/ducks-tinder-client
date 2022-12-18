import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Preloader from '../../../Preloader/Preloader';
import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.pairs}>
      <Link className={styles.link} to="#">
        <div className={styles.content}>
          <Preloader />
          <FontAwesomeIcon
            icon={faHeartCircleExclamation}
            className={styles.icon}
          />
        </div>
      </Link>
    </div>
  );
};

export default Loading;
