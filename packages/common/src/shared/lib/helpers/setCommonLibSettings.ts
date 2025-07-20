import { COMMON_LIB_SETTINGS, CommonLibSettings } from '../constants';

export function setCommonLibSettings(settings: CommonLibSettings): void {
  Object.assign(COMMON_LIB_SETTINGS, settings);
}
