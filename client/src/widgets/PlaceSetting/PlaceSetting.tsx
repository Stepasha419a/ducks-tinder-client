import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/constants';
import { useAppDispatch } from '@shared/lib/hooks';
import { nullInput } from '@entities/setting/model';
import { Map } from '@entities/user/components';
import { PlacesGeolocation } from '@features/user/PlacesGeolocation/PlacesGeolocation';
import styles from './PlaceSetting.module.scss';

export const PlaceSetting = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(nullInput());
  };

  return (
    <div className={styles.setting}>
      <div className={styles.head}>
        <div className={styles.title}>Place</div>
        <Link
          to={ROUTES.profile}
          onClick={handleSubmit}
          className={styles.submit}
        >
          Submit
        </Link>
      </div>
      <Map />
      <PlacesGeolocation />
    </div>
  );
};
