import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as styles from './Choose.module.scss';
import { useTranslation } from 'react-i18next';

export const Choose = () => {
  const { t } = useTranslation('chat');

  return (
    <div className={styles.choose}>
      <div className={styles.inner}>
        <FontAwesomeIcon icon={faComment} className={styles.icon} />
        <div className={styles.text}>{t('chooseChat')}</div>
      </div>
    </div>
  );
};
