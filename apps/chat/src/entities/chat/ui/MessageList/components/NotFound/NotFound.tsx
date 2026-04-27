import type { ReactElement } from 'react';
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as styles from './NotFound.module.scss';
import { useTranslation } from 'react-i18next';

export const NotFound = (): ReactElement => {
  const { t } = useTranslation('chat');

  return (
    <div className={styles.noChats}>
      <div className={styles.inner}>
        <FontAwesomeIcon icon={faCommentSlash} className={styles.icon} />
        <div className={styles.text}>{t('chatNotFound')}</div>
      </div>
    </div>
  );
};
