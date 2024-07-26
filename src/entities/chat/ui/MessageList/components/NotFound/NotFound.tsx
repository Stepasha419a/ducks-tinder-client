import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactElement } from 'react';
import styles from './NotFound.module.scss';

export const NotFound = (): ReactElement => {
  return (
    <div className={styles.noChats}>
      <div className={styles.inner}>
        <FontAwesomeIcon icon={faCommentSlash} className={styles.icon} />
        <div className={styles.text}>Such chat was not found</div>
      </div>
    </div>
  );
};
