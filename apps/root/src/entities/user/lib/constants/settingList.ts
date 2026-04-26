import type { SettingNameEnum } from './settingName';

export interface Validation {
  min?: number;
  max?: number;
  email?: boolean;
}

export interface SettingProperties {
  validation?: Validation;
}

export const SETTING_LIST: Record<SettingNameEnum, SettingProperties | null> = {
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
  language: null,
  preferSex: null,
  nickname: {
    validation: { min: 6, max: 16 },
  },
} as const;
