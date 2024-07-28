import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import styles from './BlockedChat.module.scss';

interface BlockedChatProps {
  blockedByName: string;
}

export const BlockedChat: FC<BlockedChatProps> = ({ blockedByName }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.blocked}>
        <FontAwesomeIcon icon={faLock} className={styles.icon} />
        <div className={styles.descr}>
          <span className={styles.name}>{blockedByName}</span>
          <span className={styles.text}>blocked this chat</span>
        </div>
      </div>
    </div>
  );
};
