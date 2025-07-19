// TODO: assets alias to prevent deps-cycling
import { defaultDuck } from '@shared/ui/assets';
import { UI_LIB_SETTINGS } from '../constants';

export function makeImageUrl(avatarUrl?: string): string {
  return avatarUrl
    ? `${UI_LIB_SETTINGS.IMAGE_BASE_URL}/${avatarUrl}`
    : defaultDuck;
}
