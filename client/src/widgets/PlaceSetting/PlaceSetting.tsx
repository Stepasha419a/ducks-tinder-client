import styles from './PlaceSetting.module.scss';
import { useAppDispatch } from '@/shared/hooks';
import { nullInput } from '@/entities/setting/model';
import { Map } from '@entities/user/components';
import { PlacesGeolocation } from '@/features/user/PlacesGeolocation/PlacesGeolocation';
import { useSettingUrl } from '@/entities/setting/hooks';

export const PlaceSetting = () => {
  const dispatch = useAppDispatch();

  useSettingUrl();
  const handleSubmit = () => {
    dispatch(nullInput());
  };

  return (
    <div className={styles.setting}>
      <div className={styles.head}>
        <div className={styles.title}>Place</div>
        <div onClick={handleSubmit} className={styles.submit}>
          Submit
        </div>
      </div>
      <Map />
      <PlacesGeolocation />
    </div>
  );
};
