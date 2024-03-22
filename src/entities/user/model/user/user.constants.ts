export const INTERESTS_FOR_LOOP = ['music', 'travelling', 'movies', 'sport'];

import type { SettingNameEnum } from '../../lib';

export interface Validation {
  min?: number;
  max?: number;
  email?: boolean;
}

export interface SettingProperties {
  formName?: string;
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
  preferSex: {
    formName: 'Interested in',
  },
  nickname: {
    validation: { min: 6, max: 16 },
  },
} as const;
