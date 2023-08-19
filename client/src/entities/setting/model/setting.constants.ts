import type { SettingProperties } from './setting.interfaces';

export const SETTING_LIST: Record<string, SettingProperties | null> = {
  email: {
    validation: { min: 0, max: 40, email: true },
  },
  name: {
    validation: { min: 2, max: 14 },
  },
  description: {
    validation: { min: 50, max: 400 },
  },
  sex: null,
  preferSex: {
    formName: 'Interested in',
  },
  nickname: {
    validation: { min: 6, max: 16 },
  },
};

// profile/edit
export const BUSY_ROUTES = ['edit', 'place'];
