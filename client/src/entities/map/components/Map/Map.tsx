import { useEffect, useState } from 'react';
import { YMaps, Map as YMap, Placemark } from '@pbe/react-yandex-maps';
import { MapLazy } from './Map.lazy';

export const Map = () => {
  const [coords, setCoords] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    navigator.geolocation.watchPosition((pos) => {
      setCoords(pos);
    });
  }, []);

  if (!coords) {
    return <MapLazy />;
  }

  return (
    <>
      <YMaps>
        <YMap
          defaultOptions={{
            yandexMapDisablePoiInteractivity: true,
            restrictMapArea: true,
            maxZoom: 10,
            minZoom: 10,
          }}
          defaultState={{
            center: [coords.coords.latitude, coords.coords.longitude],
            zoom: 10,
          }}
          width={375}
          height={300}
        >
          <Placemark
            geometry={[coords.coords.latitude, coords.coords.longitude]}
          />
        </YMap>
      </YMaps>
    </>
  );
};
