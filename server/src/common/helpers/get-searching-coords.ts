interface SearchingCoords {
  maxLatitude: number;
  minLatitude: number;
  maxLongitude: number;
  minLongitude: number;
}

// 1 lat deg = km
const km = 0.009009;

export function getSearchingCoords(
  latitude: number,
  longitude: number,
  distance: number,
): SearchingCoords {
  const maxLatitude = latitude + (km * distance) / 2;
  const minLatitude = latitude - (km * distance) / 2;
  const maxLongitude = longitude + (km * distance) / 2;
  const minLongitude = longitude - (km * distance) / 2;

  return { maxLatitude, minLatitude, maxLongitude, minLongitude };
}
