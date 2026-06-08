import { Link } from 'react-router-dom';

import { ROUTES } from '@ducks-tinder-client/common';

import * as styles from './MobileTitle.module.scss';
import { useTranslation } from 'react-i18next';

export const MobileTitle = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{t('profile.settingsMobile')}</div>
      <Link to={ROUTES.PROFILE} className={styles.submit}>
        {t('submit')}
      </Link>
    </div>
  );
};
