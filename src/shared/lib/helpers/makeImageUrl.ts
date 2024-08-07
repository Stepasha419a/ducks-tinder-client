import { defaultDuck } from '@shared/ui';

export function makeImageUrl(avatarUrl?: string): string {
  return avatarUrl
    ? `${import.meta.env.VITE_FILE_SERVICE_URL}/${avatarUrl}`
    : defaultDuck;
}
