import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Places } from '@entities/user/components';
import { updateUserPlaceThunk } from '@/entities/user/model/user';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import styles from './PlacesGeolocation.module.scss';

export const PlacesGeolocation = () => {
  const dispatch = useAppDispatch();

  const place = useAppSelector((state) => state.user.currentUser!.place);

  const handlePlaceUpdate = (pos: GeolocationPosition) => {
    if (
      pos.coords.longitude === place?.longitude &&
      pos.coords.latitude === place.latitude
    ) {
      toast('Your position is remained unchanged');
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
        toast(
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
