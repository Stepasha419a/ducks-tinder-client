import { Link } from 'react-router-dom';
import { PlacesGeolocation } from '@features/user/ui';
import { Map } from '@entities/user/ui';
import { ROUTES } from '@shared/constants';
import { useMediaQuery } from '@shared/lib/hooks';
import styles from './PlaceSetting.module.scss';

export const PlaceSetting = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const url = isMobile ? ROUTES.SETTINGS : ROUTES.PROFILE;

  return (
    <div className={styles.setting}>
      <div className={styles.head}>
        <div className={styles.title}>Place</div>
        <Link to={url} className={styles.submit}>
          Submit
        </Link>
      </div>
      <Map />
      <PlacesGeolocation />
    </div>
  );
};
