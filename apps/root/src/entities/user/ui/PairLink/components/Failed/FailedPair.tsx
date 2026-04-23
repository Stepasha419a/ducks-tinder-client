import type { FC } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as styles from './FailedPair.module.scss';
import { useTranslation } from 'react-i18next';

export const FailedPair: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.noPairs}>
      <FontAwesomeIcon icon={faHeart} className={styles.icon} />
      <div>{t('pairs.list.noLikes')}</div>
    </div>
  );
};
