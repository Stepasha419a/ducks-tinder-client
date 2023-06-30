import type { FC } from 'react';
import { YMaps, Map as YMap, Placemark } from '@pbe/react-yandex-maps';
import { MapLazy } from './Map.lazy';
import { useAppSelector } from '@/shared/hooks';

export const Map: FC = () => {
  const place = useAppSelector((state) => state.user.currentUser.place);

  if (!place) {
    return <MapLazy />;
  }

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
            center: [place.longitude, place.latitude],
            zoom: 8,
          }}
          width={375}
          height={300}
        >
          <Placemark geometry={[place.longitude, place.latitude]} />
        </YMap>
      </YMaps>
    </>
  );
};
