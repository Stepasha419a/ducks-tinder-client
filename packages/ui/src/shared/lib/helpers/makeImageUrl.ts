// TODO: assets alias to prevent deps-cycling
import { defaultDuck } from '@shared/ui/assets';

export function makeImageUrl(avatarUrl?: string): string {
  return avatarUrl
    ? `${process.env.VITE_FILE_SERVICE_URL}/${avatarUrl}`
    : defaultDuck;
}
