import { defaultDuck } from '@shared/assets/images';

export function makeImageUrl(avatarUrl?: string): string {
  return avatarUrl
    ? `${import.meta.env.VITE_USER_SERVICE_URL}/${avatarUrl}`
    : defaultDuck;
}
