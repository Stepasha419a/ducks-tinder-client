import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './Choose.module.scss';

interface ChooseProps{
  isConnected: boolean;
}

const Choose: FC<ChooseProps> = ({isConnected}) => {
  const cn = classNames(styles.choose, !isConnected && styles.visible)

  return (
    <div className={cn}>
      <div className={styles.inner}>
        <FontAwesomeIcon icon={faComment} className={styles.icon} />
        <div className={styles.text}>Choose the chat</div>
      </div>
    </div>
  );
};

export default Choose;
