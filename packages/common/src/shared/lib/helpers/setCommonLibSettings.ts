import type { CommonLibSettings } from '../constants';
import { COMMON_LIB_SETTINGS } from '../constants';

export function setCommonLibSettings(settings: CommonLibSettings): void {
  Object.assign(COMMON_LIB_SETTINGS, settings);
}
