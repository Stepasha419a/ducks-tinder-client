import { Link } from 'react-router-dom';

import { ROUTES, useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import { PlacesGeolocation } from '@features/PlacesGeolocation';
import { Map } from '@entities/user';

import * as styles from './PlaceSetting.module.scss';
import { useTranslation } from 'react-i18next';

export const PlaceSetting = () => {
  const { t } = useTranslation();

  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const url = isMobile ? ROUTES.SETTINGS : ROUTES.PROFILE;

  return (
    <div className={styles.setting}>
      <div className={styles.head}>
        <div className={styles.title}>{t('profile.settings.place.title')}</div>
        <Link to={url} className={styles.submit}>
          {t('submit')}
        </Link>
      </div>
      <Map />
      <PlacesGeolocation />
    </div>
  );
};
