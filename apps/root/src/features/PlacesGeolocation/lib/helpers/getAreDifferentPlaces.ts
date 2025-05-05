export function getAreDifferentPlaces(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): boolean {
  const latDiff = Math.abs(lat1 - lat2);
  const lonDiff = Math.abs(lon1 - lon2);

  const totalDiff = latDiff + lonDiff;
  return totalDiff > 0.15;
}
