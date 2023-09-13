import type { FC } from 'react';
import { YMaps, Map as YMap, Placemark } from '@pbe/react-yandex-maps';
import { MapLazy } from './Map.lazy';
import { useAppSelector, useMediaQuery } from '@shared/lib/hooks';

export const Map: FC = () => {
  const place = useAppSelector((state) => state.user.currentUser.place);

  const isMobile = useMediaQuery('(max-width: 900px)');

  if (!place) {
    return <MapLazy isMobile />;
  }

  const width = isMobile ? '100%' : 375;

  return (
    <>
      <YMaps>
        <YMap
          defaultOptions={{
            restrictMapArea: true,
            maxZoom: 8,
            minZoom: 8,
          }}
          defaultState={{
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
