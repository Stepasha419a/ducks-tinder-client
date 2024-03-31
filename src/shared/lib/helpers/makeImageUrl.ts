import defaultPhoto from '@shared/assets/images/default-duck.png';

export function makeImageUrl(
  userId?: string,
  avatarUrl?: string,
  fullUrl?: string
): string {
  const url = fullUrl || (avatarUrl && userId && `${userId}/${avatarUrl}`);
  return url ? `${import.meta.env.VITE_USER_SERVICE_URL}/${url}` : defaultPhoto;
}
