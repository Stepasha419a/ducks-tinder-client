import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as styles from './NotFoundSetting.module.scss';
import { useTranslation } from 'react-i18next';

interface NotFoundSettingProps {
  url: string;
}

export const NotFoundSetting: FC<NotFoundSettingProps> = ({ url }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.notFound}>
        <Link to={url} className={styles.link}>
          <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
          <span className={styles.text}>{t('profile.settings.notFound')}</span>
        </Link>
      </div>
    </div>
  );
};
