import type { FC } from 'react';
import { Map as YMap, Placemark, YMaps } from '@pbe/react-yandex-maps';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import { MapLazy } from './Map.lazy';
import { useUserStore } from '@ducks-tinder-client/auth';

export const Map: FC = () => {
  const place = useUserStore((state) => state.currentUser?.place);

  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  if (!place) {
    return <MapLazy isMobile={isMobile} />;
  }

  const width = isMobile ? '100%' : 375;

  return (
    <>
      <YMaps>
        <YMap
          defaultOptions={{
            maxZoom: 8,
            minZoom: 8,
          }}
          state={{
            center: [place.latitude, place.longitude],
            zoom: 8,
          }}
          width={width}
          height={300}
        >
          <Placemark geometry={[place.latitude, place.longitude]} />
        </YMap>
      </YMaps>
    </>
  );
};
