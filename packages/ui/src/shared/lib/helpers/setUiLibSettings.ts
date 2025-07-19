import type { UILibSettings } from '../constants/uiLibSettings';
import { UI_LIB_SETTINGS } from '../constants/uiLibSettings';

export const setUiLibSettings = (settings: UILibSettings) => {
  Object.assign(UI_LIB_SETTINGS, settings);
};
