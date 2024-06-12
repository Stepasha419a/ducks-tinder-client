import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Places } from '@/entities/user/ui';
import { updateUserPlaceThunk } from '@/entities/user/model/user';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import styles from './PlacesGeolocation.module.scss';
import { getAreDifferentPlaces } from '../../lib';

export const PlacesGeolocation = () => {
  const dispatch = useAppDispatch();

  const place = useAppSelector((state) => state.user.currentUser!.place);

  const handleGetCurrentPosition = (pos: GeolocationPosition) => {
    if (
      !place ||
      getAreDifferentPlaces(
        place.latitude,
        place.longitude,
        pos.coords.latitude,
        pos.coords.longitude
      )
    ) {
      dispatch(
        updateUserPlaceThunk({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
      );
    } else {
      toast('Your position is remained unchanged');
    }
  };

  const handlePlace = () => {
    navigator.geolocation.getCurrentPosition(
      handleGetCurrentPosition,
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
