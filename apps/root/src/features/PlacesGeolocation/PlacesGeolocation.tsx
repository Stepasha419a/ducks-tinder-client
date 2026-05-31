import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';

import {
  updateUserPlaceThunk,
  useAppDispatch,
} from '@ducks-tinder-client/common';

import { Places } from '@entities/user';

import { getAreDifferentPlaces } from './lib';
import * as styles from './PlacesGeolocation.module.scss';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@ducks-tinder-client/auth';

export const PlacesGeolocation = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const place = useUserStore((state) => state.currentUser?.place);

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
        toast(t('profile.settings.place.unchanged'));
      }
    },
    [dispatch, place, t]
  );

  const handlePlace = useCallback(() => {
    if (loading) {
      toast(t('profile.settings.place.refreshing'));
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      handleGetCurrentPosition,
      () => {
        toast(t('profile.settings.place.enableGeolocation'));
      },
      { enableHighAccuracy: true }
    );
    setLoading(false);
  }, [handleGetCurrentPosition, loading, t]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handlePlace();
  }, [handlePlace]);

  return (
    <Places
      refreshFeature={
        <div
          onClick={handlePlace}
          className={classNames(styles.refresh, loading && styles.disabled)}
        >
          {t('profile.settings.place.refresh')}
        </div>
      }
    />
  );
};
