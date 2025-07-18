import type { LibSettings } from '../constants/libSettings';
import { LIB_SETTINGS } from '../constants/libSettings';

export const setLibSettings = (settings: LibSettings) => {
  Object.assign(LIB_SETTINGS, settings);
};
