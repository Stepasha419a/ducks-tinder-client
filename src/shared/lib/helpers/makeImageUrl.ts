import defaultPhoto from '@shared/assets/images/default-duck.png';

export function makeImageUrl(avatarUrl?: string): string {
  return avatarUrl
    ? `${import.meta.env.VITE_USER_SERVICE_URL}/${avatarUrl}`
    : defaultPhoto;
}
