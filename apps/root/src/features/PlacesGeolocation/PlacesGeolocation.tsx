import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';

import { Places , updateUserPlaceThunk } from '@entities/user';
import { useAppDispatch, useAppSelector } from '@shared/lib';

import { getAreDifferentPlaces } from './lib';
import styles from './PlacesGeolocation.module.scss';

export const PlacesGeolocation = () => {
  const dispatch = useAppDispatch();

  const place = useAppSelector((state) => state.user.currentUser!.place);

  const [loading, setLoading] = useState(false);

  const handleGetCurrentPosition = useCallback(
    (pos: GeolocationPosition) => {
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
    },
    [dispatch, place]
  );

  const handlePlace = useCallback(() => {
    if (loading) {
      toast('Refreshing is already in progress');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      handleGetCurrentPosition,
      () => {
        toast(
          'Enable your geolocation, otherwise we wont be able to set your location'
        );
      },
      { enableHighAccuracy: true }
    );
    setLoading(false);
  }, [handleGetCurrentPosition, loading]);

  useEffect(() => {
    handlePlace();
  }, [handlePlace]);

  return (
    <Places
      refreshFeature={
        <div
          onClick={handlePlace}
          className={classNames(styles.refresh, loading && styles.disabled)}
        >
          Refresh
        </div>
      }
    />
  );
};
