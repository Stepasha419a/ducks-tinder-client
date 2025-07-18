// TODO: assets alias to prevent deps-cycling
import { defaultDuck } from '@shared/ui/assets';

export function getImageUrlOrDefault(avatarUrl?: string): string {
  return avatarUrl || defaultDuck;
}
