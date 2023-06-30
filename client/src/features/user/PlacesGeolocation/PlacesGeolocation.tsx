import { Places } from '@/entities/user/components';
import styles from './PlacesGeolocation.module.scss';
import { toastify } from '@/shared/lib';
import { useEffect } from 'react';
import { updateUserPlaceThunk } from '@/entities/user/model';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

export const PlacesGeolocation = () => {
  const dispatch = useAppDispatch();

  const place = useAppSelector((state) => state.user.currentUser.place);

  const handlePlaceUpdate = (pos: GeolocationPosition) => {
    if (
      pos.coords.longitude === place?.latitude &&
      pos.coords.latitude === place.longitude
    ) {
      toastify('Your position is remained unchanged');
    } else {
      if (!place) {
        dispatch(
          updateUserPlaceThunk({
            latitude: pos.coords.longitude,
            longitude: pos.coords.latitude,
          })
        );
      }
    }
  };

  const handlePlace = () => {
    navigator.geolocation.getCurrentPosition(
      handlePlaceUpdate,
      () => {
        toastify(
          'Enable your geolocation, otherwise we wont be able to set your location'
        );
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    handlePlace();
  });

  return (
    <Places
      refreshFeature={
        <div onClick={handlePlace} className={styles.refresh}>
          Refresh
        </div>
      }
    />
  );
};
