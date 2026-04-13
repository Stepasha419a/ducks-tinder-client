import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@ducks-tinder-client/common';

import * as styles from './ProfileSubmit.mobile.module.scss';
import { useTranslation } from 'react-i18next';

interface ProfileSubmitMobileProps {
  handleSubmit: () => void;
}

export const ProfileSubmitMobile: FC<ProfileSubmitMobileProps> = ({
  handleSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.head}>
      <div className={styles.title}>{t('profile.editProfile')}</div>
      <Link
        onClick={handleSubmit}
        to={ROUTES.PROFILE}
        className={styles.submit}
      >
        {t('submit')}
      </Link>
    </div>
  );
};
