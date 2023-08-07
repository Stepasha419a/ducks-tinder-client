import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import styles from './Choose.module.scss';

export const Choose = () => {
  const cn = classNames(styles.choose);

  return (
    <div className={cn}>
      <div className={styles.inner}>
        <FontAwesomeIcon icon={faComment} className={styles.icon} />
        <div className={styles.text}>Choose the chat</div>
      </div>
    </div>
  );
};
