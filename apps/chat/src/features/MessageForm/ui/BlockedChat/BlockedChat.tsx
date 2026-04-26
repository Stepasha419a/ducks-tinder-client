import type { FC } from 'react';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as styles from './BlockedChat.module.scss';
import { useTranslation } from 'react-i18next';

interface BlockedChatProps {
  blockedByName: string;
}

export const BlockedChat: FC<BlockedChatProps> = ({ blockedByName }) => {
  const { t } = useTranslation('chat');

  return (
    <div className={styles.wrapper}>
      <div className={styles.blocked}>
        <FontAwesomeIcon icon={faLock} className={styles.icon} />
        <div className={styles.descr}>
          <span className={styles.name}>{blockedByName}</span>
          <span className={styles.text}>{t('blockedThisChat')}</span>
        </div>
      </div>
    </div>
  );
};
