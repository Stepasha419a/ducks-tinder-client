import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactElement } from 'react';
import styles from './FailedChats.module.scss';

const FailedChats = (): ReactElement => (
  <div className={styles.noPairs}>
    <FontAwesomeIcon icon={faHeart} className={styles.icon} />
    <div>
      You don't have chats. Accept some pairs to have personal chats with them
    </div>
  </div>
);

export default FailedChats;
