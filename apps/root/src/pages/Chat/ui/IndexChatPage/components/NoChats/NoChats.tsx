import type { ReactElement } from 'react';
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './NoChats.module.scss';

export const NoChats = (): ReactElement => {
  return (
    <div className={styles.noChats}>
      <div className={styles.inner}>
        <FontAwesomeIcon icon={faCommentSlash} className={styles.icon} />
        <div className={styles.text}>You don't have chats yet</div>
      </div>
    </div>
  );
};
