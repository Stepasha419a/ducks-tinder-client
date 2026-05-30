import type { FC, ReactElement } from 'react';
import {
  faLocationDot,
  faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as styles from './Places.module.scss';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@ducks-tinder-client/auth';

interface PlacesProps {
  refreshFeature: ReactElement;
}

export const Places: FC<PlacesProps> = ({ refreshFeature }) => {
  const { t } = useTranslation();

  const place = useUserStore((state) => state.currentUser?.place);

  return (
    <div className={styles.places}>
      <div className={styles.subhead}>
        <div className={styles.subtitle}>
          {t('profile.settings.place.currentPositions')}
        </div>
        {refreshFeature}
      </div>
      {place && (
        <div className={styles.item}>
          <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
          <div className={styles.position}>
            <div>{t('profile.settings.place.myCurrentPosition')}</div>
            <div className={styles.name}>
              {place.name} {place.address}
            </div>
          </div>
          <FontAwesomeIcon className={styles.mark} icon={faSquareCheck} />
        </div>
      )}
    </div>
  );
};
