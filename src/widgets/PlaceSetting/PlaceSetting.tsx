import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/constants';
import { useMediaQuery } from '@shared/lib/hooks';
import { Map } from '@entities/user/components';
import { PlacesGeolocation } from '@features/user/components';
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
