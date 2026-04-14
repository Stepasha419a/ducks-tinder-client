import type { RegisterOptions } from 'react-hook-form';

import { EMAIL_REGEXP } from '@ducks-tinder-client/common';

import { useSettingUrl } from '@entities/user';
import { useTranslation } from 'react-i18next';

export interface SettingFieldValues {
  input: string;
}

export function useCurrentValidation():
  | RegisterOptions<SettingFieldValues, 'input'>
  | undefined {
  const { t } = useTranslation();

  const setting = useSettingUrl();

  if (!setting) {
    return undefined;
  }

  const { validation } = setting;

  return {
    required: t('validation.required'),
    minLength: validation?.min
      ? {
          value: validation.min,
          message: t('validation.lengthMin', { count: validation.min }),
        }
      : undefined,
    maxLength: validation?.max
      ? {
          value: validation.max,
          message: t('validation.lengthMax', { count: validation.max }),
        }
      : undefined,
    pattern: validation?.email
      ? {
          value: EMAIL_REGEXP,
          message: t('validation.email'),
        }
      : undefined,
  };
}
