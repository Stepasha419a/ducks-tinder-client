import { defaultDuck } from '@ducks-tinder-client/ui';

export function makeImageUrl(avatarUrl?: string): string {
  return avatarUrl
    ? `${process.env.VITE_FILE_SERVICE_URL}/${avatarUrl}`
    : defaultDuck;
}
